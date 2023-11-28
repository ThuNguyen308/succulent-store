import * as dotenv from "dotenv";

import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import morgan from "morgan";
import braintree from "braintree";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANR_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      // case !description:
      //     return res.status(500).send({error: "Desciption is required"})
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case !photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less than 1mb" });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Creating product",
    });
  }
};

export const createMultiProductController = async (req, res) => {
  try {
    const { arrayProduct } = req.body;
    console.log(arrayProduct);
    arrayProduct.map((p) => {
      p.slug = slugify(p.name);
    });
    productModel
      .insertMany(arrayProduct)
      .then(function (docs) {
        res.status(201).send({
          success: true,
          message: "Products created successfully",
        });
      })
      .catch(function (err) {
        res.status(500).send({
          success: false,
          err,
          message: "Products created failed",
        });
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Products created failed 1",
    });
  }
};

//get all product
export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      // .limit(12)
      .sort({ createAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      total: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting all product",
    });
  }
};

//get paginated Product
export const getPaginatedProductController = async (req, res) => {
  try {
    const page = req.params.page - 1;
    const limit = req.params.limit || 8;
    const search = req.body.search ?? "";
    const sortBy = req.body.sortBy === "asc" ? 1 : -1;
    const sortField = req.body.sortField ? req.body.sortField : "createdAt";
    let sort = {};
    sort[sortField] = sortBy;

    const total = await productModel.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    const products = await productModel
      .find({ name: { $regex: search, $options: "i" } })
      .populate("category")
      .select("-photo")
      .sort(sort)
      .skip(page * limit)
      .limit(limit);

    res.status(200).send({
      success: true,
      total: total,
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getiting paginated products",
      error,
    });
  }
};

//get single product
export const getSingleProductController = async (req, res) => {
  try {
    console.log(`slug: ${req.params.slug}`.bgGreen);
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

//get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Getting photo",
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting product",
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      // case !description:
      //     return res.status(500).send({error: "Desciption is required"})
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case !photo && photo?.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less than 1mb" });
    }
    // const exit = productModel.findById(req.params.pid, {new: true})
    // const product = new productModel({...req.fields, slug: slugify(name)})
    const product = await productModel.findByIdAndUpdate(
      req.params.pid.trim(),
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    // console.log(`${product}`.bgGreen)

    // console.log(`${photo.path}`.bgGreen)
    // console.log(`${photo.type}`.bgMagenta)
    // console.log(`${product.photo}`.bgGreen)
    if (photo) {
      product.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(`${error}`.bgGreen);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating product",
    });
  }
};

//filter product controller
export const filterProductsController = async (req, res) => {
  try {
    const { checkedCategories, radioPrice, page, limit } = req.body;
    let args = {};
    if (checkedCategories.length) args.category = checkedCategories;
    if (radioPrice.length) {
      args.price = { $gte: radioPrice[0] };
      if (radioPrice[1]) {
        args.price["$lte"] = radioPrice[1];
      }
    }

    const products = await productModel
      .find(args)
      .select("-photo")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await productModel.find(args).count();

    res.status(200).send({
      success: true,
      products,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Filtering product",
    });
  }
};

//count product
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Couting product",
    });
  }
};

//product list per page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page ctrl",
      error,
    });
  }
};

//search product with limit
export const searchProductWithLimitController = async (req, res) => {
  try {
    const { keyword } = req.params;
    // productModel.createIndexes({name: "text", description: "text"})
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          // {description: {$regex: keyword, $options: "i"}}
        ],
      })
      .select("-photo")
      .limit(2);
    const total = await productModel
      .find({ name: { $regex: keyword, $options: "i" } })
      .count();
    res.status(200).send({
      result: result,
      total: total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Searching product",
      error,
    });
  }
};

//search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          // {description: {$regex: keyword, $options: "i"}}
        ],
      })
      .select("-photo");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Searching product",
      error,
    });
  }
};

// similar products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

//get products by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while Geting products by category",
      error,
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const paymentLater = async (req, res) => {
  try {
    const { cart } = req.body;
    let total = cart.reduce((total, item) => {
      return total + item.price * item.buyQuantity;
    }, 0);
    let cart1 = cart.map((cartItem) => {
      return {
        product: cartItem._id,
        buyQuantity: cartItem.buyQuantity,
      };
    });
    const order = new orderModel({
      products: cart1,
      payment: "Unpaid",
      buyer: req.user._id,
    }).save();
    res.status(200).send({ success: true, message: "Đặt hàng thành công." });
  } catch (e) {
    res.status(500).send({ success: true, message: "Đặt hàng thất bại." });
  }
};

//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    // console.log(cart)
    let total = cart.reduce((total, item) => {
      return total + item.price * item.buyQuantity;
    }, 0);
    let cart1 = cart.map((cartItem) => {
      return {
        product: cartItem._id,
        buyQuantity: cartItem.buyQuantity,
      };
    });
    console.log(total);
    let newTransaction = gateway.transaction.sale(
      {
        amount: total / 23000, //Doi sang tien do la My
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart1,
            payment: result,
            buyer: req.user._id,
          }).save();
          res
            .status(200)
            .send({ success: true, message: "Thanh toán thành công." });
        } else {
          res
            .status(500)
            .send({ success: true, message: "Thanh toán thất bại." });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// get orders by user
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products.product", "-photo");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Geting orders",
      error,
    });
  }
};

//get all order
export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products.product", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Geting all order",
      error,
    });
  }
};

//update Order's status
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Update order's status successfully",
      updatedOrder: order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Updating order's status",
      error,
    });
  }
};
