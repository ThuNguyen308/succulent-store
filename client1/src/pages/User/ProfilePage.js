import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/pages/AuthValidate.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function ProfilePage() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [photo, setPhoto] = useState('')
  console.log(user)

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      address: user?.address || "",
      phone: user?.phone || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      address: Yup.string().required("Required!"),
      phone: Yup.number().required("Required!")
    }),
    onSubmit: async (values) => {
      try {
        const {data} = await axios.put(
          process.env.REACT_APP_API + "api/v1/auth/update-profile",
          {
            name: values.name,
            email: values.email,
            address: values.address,
            phone: values.phone,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        if (data.success) {
          alert(data.message);
          navigate("/login");
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Somethong wrong");
      }
    },
  });
  console.log(photo ?? URL.createObjectURL(photo), 'pho')

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4 fw-bold">Your Profile</h1>
      <div className="row">
        <div className="col-md-4 mb-5 text-center">
          <img src={photo ?? URL.createObjectURL(photo)} className="rounded-circle" width="100px" height="100px" alt=""/>
          <label className="btn btn-outline-secondary">
            Upload Avatar
            <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden/>
          </label>
        </div>
        <div className="col-md-8">
        <div className="field">
        <div className="input-group">
          <input
            id="name"
            placeholder=" "
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <label htmlFor="name">Name</label>
        </div>
        {formik.errors.name && formik.touched.name && (
          <span className="message-error">{formik.errors.name}</span>
        )}
      </div>
      <div className="field">
        <div className="input-group">
          <input
            id="email"
            placeholder=" "
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <label htmlFor="email">Email</label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <span className="message-error">{formik.errors.email}</span>
        )}
      </div>
      <div className="field">
        <div className="input-group">
          <input
            id="phone"
            placeholder=" "
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <label htmlFor="phone">Phone</label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <span className="message-error">{formik.errors.email}</span>
        )}
      </div>
      <div className="field">
        <div className="input-group">
          <input
            id="address"
            placeholder=" "
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          <label htmlFor="address">Address</label>
        </div>
        {formik.errors.address && formik.touched.address && (
          <span className="message-error">{formik.errors.address}</span>
        )}
      </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
}
