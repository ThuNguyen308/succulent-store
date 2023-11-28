import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/pages/AuthValidate.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../redux/actions/user";

export default function ProfilePage() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState("");
  const [reviewedAvatar, setReviewedAvatar] = useState("");

  const reviewAvatar = (file) => {
    setReviewedAvatar(URL.createObjectURL(file));
  };

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
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
      phone: Yup.number().required("Required!"),
    }),
    onSubmit: async (values) => {
      console.log("login");
      try {
        const profileData = new FormData();
        profileData.append("name", values.name);
        profileData.append("email", values.email);
        profileData.append("address", values.address);
        profileData.append("phone", values.phone);
        profileData.append("photo", photo);
        const { data } = await axios.put(
          process.env.REACT_APP_API + "api/v1/auth/update-profile",
          profileData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data.success) {
          alert(data.message);
          const { _id, name, email, address, phone, role, photo } =
            data.updatedUser;
          dispatch(update({ _id, name, email, address, phone, role, photo }));
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Somethong wrong");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4 fw-bold">Your Profile</h1>
      <div className="row">
        <div className="col-md-4 mb-5 text-center">
          <div className="d-flex flex-column align-items-center">
            <img
              src={
                reviewedAvatar ||
                process.env.REACT_APP_API + `api/v1/auth/get-avatar/${user._id}`
              }
              className="rounded-circle border border-primary"
              width="100px"
              height="100px"
              alt=""
            />
            <label className="btn btn-outline-secondary">
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                  reviewAvatar(e.target.files[0]);
                }}
                hidden
              />
            </label>
          </div>
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
              <span className="message-error">{formik.errors.phone}</span>
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
