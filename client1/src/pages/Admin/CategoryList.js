import React, { useState, useEffect } from "react";
import CategoryForm from "../../components/Form/CategoryForm";
import axios from "axios";
import { Modal } from "antd";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState();
  const [selected, setSelected] = useState();
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
      alert("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API + "api/v1/category/create-category",
        {
          name,
        },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      if (data?.success) {
        alert(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      alert("somthing went wrong in input form");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        process.env.REACT_APP_API +
          `api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      if (data?.success) {
        alert(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        process.env.REACT_APP_API + `api/v1/category/delete-category/${pId}`,
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      if (data.success) {
        alert(`Category is deleted`);
        getAllCategory();
        console.log("d success");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Somtihing went wrong");
    }
  };

  return (
    <>
      <h1>Mange Category</h1>
      <CategoryForm
        handleSubmit={handleSubmit}
        value={name}
        setValue={setName}
      />
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-success me-1"
                  onClick={() => {
                    setUpdatedName(category.name);
                    setSelected(category);
                    setVisible(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        title="Update Category"
        onCancel={() => setVisible(false)}
        footer={null}
        open={visible}
      >
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </>
  );
}
