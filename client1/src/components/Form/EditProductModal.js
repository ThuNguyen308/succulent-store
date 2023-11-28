import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
const { Option } = Select;

export default function EditProductModal(props) {
  const {
    handleClose,
    open,
    editedProduct,
    handleUpdateProductListFromEditModal,
  } = props;
  const [updatedProduct, setUpdatedProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  // console.log('editedProduct', editedProduct)

  useEffect(() => {
    //get all category
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_API + "api/v1/category/get-all-category"
        );
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong in getting category");
      }
    };

    console.log("updatedProduct.photo", updatedProduct.photo);

    getAllCategory();
  }, []);

  useEffect(() => {
    if (open) {
      setUpdatedProduct({
        ...editedProduct,
        categoryId: editedProduct.category._id,
      });
    }
  }, [editedProduct]);

  const handleSubmit = async () => {
    try {
      const productData = new FormData();
      productData.append("name", updatedProduct.name);
      productData.append("description", updatedProduct.description);
      productData.append("price", updatedProduct.price);
      productData.append("quantity", updatedProduct.quantity);
      if (updatedProduct.photo) {
        productData.append("photo", updatedProduct.photo);
      }
      productData.append("category", updatedProduct.categoryId);
      productData.append("shipping", updatedProduct.shipping);

      const { data } = await axios.patch(
        process.env.REACT_APP_API +
          `api/v1/product/update-product/${updatedProduct._id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        toast.success("Product edited successfully");
        handleUpdateProductListFromEditModal(updatedProduct);
        handleClose();
      } else {
        toast.error("Product edited failed");
      }
    } catch (err) {
      console.log(err);
      alert("Something wrong");
    }
  };
  return (
    <Modal onCancel={handleClose} onOk={handleSubmit} open={open}>
      <form encType="multipart/form-data">
        <h1>Edit Product</h1>
        <Select
          bordered={false}
          showSearch
          className="form-control mb-3"
          placeholder="Select a category"
          value={updatedProduct?.categoryId}
          required
          onChange={(value) => {
            setUpdatedProduct({ ...updatedProduct, categoryId: value });
          }}
        >
          {categories?.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {updatedProduct?.photo
              ? updatedProduct?.photo.name
              : "Upload Photo"}
            <input
              type="file"
              name="photo"
              value=""
              accept="image/*"
              onChange={(e) => {
                setUpdatedProduct({
                  ...updatedProduct,
                  photo: e.target.files[0],
                });
              }}
              hidden
            />
          </label>
        </div>
        {/* {updatedProduct?.photo &&  */}
        <div className="mb-3">
          <div className="text-center">
            <img
              src={
                !updatedProduct?.photo
                  ? process.env.REACT_APP_API +
                    `api/v1/product/product-photo/${updatedProduct._id}`
                  : URL.createObjectURL(updatedProduct?.photo)
              }
              alt="product_photo"
              height={"150px"}
              className="img img-responsive"
            />
          </div>
        </div>
        {/* } */}
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Name"
          value={updatedProduct?.name || null}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, name: e.target.value })
          }
        />
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Description"
          value={updatedProduct?.description || null}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              description: e.target.value,
            })
          }
        />
        <input
          className="form-control mb-3"
          type="number"
          placeholder="Quantity"
          value={updatedProduct?.quantity || null}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, quantity: e.target.value })
          }
        />
        <input
          className="form-control mb-3"
          type="number"
          placeholder="Price"
          value={updatedProduct?.price || null}
          onChange={(e) =>
            setUpdatedProduct({ ...updatedProduct, price: e.target.value })
          }
        />
        <Select
          bordered={false}
          placeholder="Select Shipping "
          showSearch
          className="form-select mb-3"
          value={updatedProduct?.shipping || null}
          onChange={(value) =>
            setUpdatedProduct({ ...updatedProduct, shipping: value })
          }
        >
          <Option value={false}>No</Option>
          <Option value={true}>Yes</Option>
        </Select>
      </form>
    </Modal>
  );
}
