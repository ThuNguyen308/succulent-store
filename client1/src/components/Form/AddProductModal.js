import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
const { Option } = Select;

export default function AddProductModal(props) {
  const { handleClose, open, handleUpdateProductList } = props;
  const [newProduct, setNewProduct] = useState({});
  const [categories, setCategories] = useState([]);

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

    getAllCategory();
  }, []);

  const handleSubmit = async () => {
    try {
      const productData = new FormData();
      productData.append("name", newProduct.name);
      productData.append("description", newProduct.description);
      productData.append("price", newProduct.price);
      productData.append("quantity", newProduct.quantity);
      productData.append("photo", newProduct.photo);
      productData.append("category", newProduct.categoryId);
      productData.append("shipping", newProduct.shipping);

      const { data } = await axios.post(
        process.env.REACT_APP_API + "api/v1/product/create-product",
        productData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        toast.success("Product created successfully");
        setNewProduct({});
        handleUpdateProductList();
        handleClose();
      } else {
        toast.error("Product created failed");
      }
    } catch (err) {
      console.log(err);
      alert("Something wrong");
    }
  };
  return (
    <Modal onCancel={handleClose} onOk={handleSubmit} open={open}>
      <form encType="multipart/form-data">
        <h1>Add Product</h1>
        <Select
          bordered={false}
          showSearch
          className="form-control mb-3"
          placeholder="Select a category"
          value={newProduct?.categoryId}
          required
          onChange={(value) => {
            setNewProduct({ ...newProduct, categoryId: value });
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
            {newProduct?.photo ? newProduct?.photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              value=""
              accept="image/*"
              onChange={(e) => {
                setNewProduct({ ...newProduct, photo: e.target.files[0] });
              }}
              hidden
            />
          </label>
        </div>
        {newProduct?.photo && (
          <div className="mb-3">
            <div className="text-center">
              <img
                src={URL.createObjectURL(newProduct?.photo)}
                alt="product_photo"
                height={"150px"}
                className="img img-responsive"
              />
            </div>
          </div>
        )}
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Name"
          value={newProduct?.name || null}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Description"
          value={newProduct?.description || null}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          className="form-control mb-3"
          type="number"
          placeholder="Quantity"
          value={newProduct?.quantity || null}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
        />
        <input
          className="form-control mb-3"
          type="number"
          placeholder="Price"
          value={newProduct?.price || null}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <Select
          bordered={false}
          placeholder="Select Shipping "
          showSearch
          className="form-select mb-3"
          value={newProduct?.shipping || null}
          onChange={(value) =>
            setNewProduct({ ...newProduct, shipping: value })
          }
        >
          <Option value={false}>No</Option>
          <Option value={true}>Yes</Option>
        </Select>
      </form>
    </Modal>
  );
}
