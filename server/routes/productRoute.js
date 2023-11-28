import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  createMultiProductController,
  getAllProductController,
  getPaginatedProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  filterProductsController,
  productCountController,
  productListController,
  searchProductWithLimitController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
  getOrdersController,
  getAllOrderController,
  updateOrderStatusController,
  paymentLater,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//CREATE PRODUCT
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//CREATE MULTIPLE PRODUCT
router.post(
  "/create-multi-product",
  requireSignIn,
  isAdmin,
  createMultiProductController
);

//UPDATE PRODUCT
router.patch(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//GET ALL PRODUCT
router.get("/get-all-product", getAllProductController);

//GET PAGINATED PRODUCTS
router.post(
  "/get-paginated-products/:page/:limit",
  getPaginatedProductController
);

//GET SINGLE PRODUCT
router.get("/get-single-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//DELETE PRODUCT
router.delete("/delete-product/:pid", deleteProductController);

//FILTER PRODUCT
router.post("/product-filters", filterProductsController);

//PRODUCT COUNT
router.get("/product-count", productCountController);

//PRODUCT PER PAGE
router.get("/product-list/:page", productListController);

//SEARCH PRODUCT WITH LIMIT
router.get("/search-limit/:keyword", searchProductWithLimitController);

//SEARCH PRODUCT
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//CATEGORY WISE PRODUCT
router.get("/product-category/:slug", productCategoryController);

//PAYMENTS ROUTES
//token
router.get("/braintree/token", braintreeTokenController);

//payment later
router.post("/payment-later", requireSignIn, paymentLater);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

//GET ORDERS
router.get("/orders", requireSignIn, getOrdersController);

//GET ALL ORDER
router.get("/all-order", requireSignIn, isAdmin, getAllOrderController);

//UPADTE ORDER'S STATUS
router.put(
  "/update-order-status/:orderId",
  requireSignIn,
  isAdmin,
  updateOrderStatusController
);

export default router;
