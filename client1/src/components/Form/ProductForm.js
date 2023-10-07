import React, { useState, useEffect, useRef } from "react";
import { Select } from "antd";
import axios from "axios";
const { Option } = Select;

export default function ({ title, product, setProduct }) {
  const isChangeImg = useRef();
  const [categories, setCategories] = useState([]);
  
  console.log('--form', product)

  useEffect(() => {
    if(product?._id) {
      setProduct({...product, categoryId: product?.category?._id});
    }
    isChangeImg.current = false;
    getAllCategory();
  }, [])

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

  return (
    <form encType="multipart/form-data">
      <h1>{title}</h1>
      <Select
        bordered={false}
        showSearch
        className="form-control mb-3"
        placeholder="Select a category"
        value={product?.categoryId || null}
        required
        onChange={(value) => {
          setProduct({ ...product, categoryId: value });
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
          {product?.photo ? product?.photo.name : "Upload Photo"}
          <input
            type="file"
            name="photo"
            value=""
            accept="image/*"
            onChange={(e) => {
              isChangeImg.current = true;
              setProduct({...product, photo: e.target.files[0]});
            }}
            hidden
          />
        </label>
      </div>
      <div className="mb-3">
        {product?._id
          ? <div className="text-center">
              <img
                src={!isChangeImg.current ? process.env.REACT_APP_API + `api/v1/product/product-photo/${product._id}` : URL.createObjectURL(product?.photo)}
                alt="product_photo"
                height={"150px"}
                className="img img-responsive"
              />
            </div>
          :  (product?.photo && <div className="text-center">
              <img
                src={URL.createObjectURL(product?.photo)}
                alt="product_photo"
                height={"150px"}
                className="img img-responsive"
              />
            </div>)
        }
      </div>
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Name"
        value={product?.name || null}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Description"
        value={product?.description || null}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        className="form-control mb-3"
        type="number"
        placeholder="Quantity"
        value={product?.quantity || null}
        onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
      />
      <input
        className="form-control mb-3"
        type="number"
        placeholder="Price"
        value={product?.price || null}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <Select
        bordered={false}
        placeholder="Select Shipping "
        showSearch
        className="form-select mb-3"
        value={product?.shipping || null}
        onChange={(value) => setProduct({ ...product, shipping: value })}
      >
        <Option value={false}>No</Option>
        <Option value={true}>Yes</Option>
      </Select>
    </form>
  );
}
