import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import "../styles/pages/AuthValidate.scss"
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

export default function Register() {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const prevLocation = useLocation();
    const isAuth = useSelector(state => state.user.isAuth)

    useEffect(() => {
      navigate(-1);
    }, [isAuth])

    const formik = useFormik({
        initialValues: {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: ""
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            last_name: Yup.string()
                .min(2, "Mininum 2 characters")
                .max(15, "Maximum 15 characters")
                .required("Required!"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Required!"),
            confirm_password: Yup.string()
                .oneOf([Yup.ref("password")], "Password's not match")
                .required("Required!")
        }),
        onSubmit: async(values) => {
            try {
              setIsLoading(true)
                const res = await axios.post(process.env.REACT_APP_API + 'api/v1/auth/register', {
                    name: values.first_name + " " + values.last_name,
                    email: values.email,
                    password: values.password
                })
                if(res.data.success) {
                    toast.success("Register Success!");
                    navigate(`/login?redirectTo=${prevLocation.pathname}`);
                }
                else  {
                  toast.error(res.data.message)
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
      });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
        <h1 className="text-center mb-4 fw-bold">Register</h1>
        <div className="field">
          <div className="input-group">
            <input id="first-name" 
                placeholder=" "
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
            />
            <label htmlFor="first-name">First Name</label>
          </div>
          {formik.errors.first_name && formik.touched.first_name && (
            <span className="message-error">{formik.errors.first_name}</span>
          )}
        </div>
        <div className="field">
          <div className="input-group">
            <input id="last-name" 
                placeholder=" " 
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
            />
            <label htmlFor="last-name">Last Name</label>
          </div>
          {formik.errors.last_name && formik.touched.last_name && (
            <span className="message-error">{formik.errors.last_name}</span>
          )}
        </div>
        <div className="field">
          <div className="input-group">
            <input id="email" placeholder=" "
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
            <input id="password" placeholder=" "
                name="password"
                type={isShowPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
            />
            <label htmlFor="password">Password</label>
            <FontAwesomeIcon 
              icon={isShowPassword ? faEye : faEyeSlash} 
              className="icon-eye" 
              onClick={() => setIsShowPassword(!isShowPassword)} 
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <span className="message-error">{formik.errors.password}</span>
          )}
        </div>
        <div className="field">
          <div className="input-group">
            <input id="confirm-password" placeholder=" " 
                type={isShowConfirmPassword ? "text" : "password"}
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <FontAwesomeIcon
              icon={isShowConfirmPassword ? faEye : faEyeSlash} 
              className="icon-eye" 
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)} 
            />
          </div>
          {formik.errors.confirm_password && formik.touched.confirm_password && (
            <span className="message-error">{formik.errors.confirm_password}</span>
          )}
        </div>
        <button type="submit" className='btn btn-primary' disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faCircleNotch} className="spinner" style={{marginRight: 4}} /> : null}
          Submit
        </button>
      </form>
  )
}
