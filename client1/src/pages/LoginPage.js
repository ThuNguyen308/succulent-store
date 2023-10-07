import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import "../styles/pages/AuthValidate.scss"
import axios from 'axios'
import {toast} from 'react-toastify'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'

import { login, loginSuccess, loginError } from '../redux/actions/user'

export default function Login() {
  
  console.log('login')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.user.isLoading)
    const isAuth = useSelector(state => state.user.isAuth)
    const [isShowPassword, setIsShowPassword] = useState(false)

    useEffect(() => {
      if(isAuth) {
        const redirectTo = searchParams.get('redirectTo')
        navigate(redirectTo === '/register' ? "/" : -1);
      }
    }, [isAuth])

    const formik = useFormik({
        initialValues: {
          email: "",
          password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .required("Required!")
        }),
        onSubmit: async(values) => {
            try {
              dispatch(login())
              const res = await axios.post(process.env.REACT_APP_API + 'api/v1/auth/login', {
                  email: values.email.trim(),
                  password: values.password
              })
              if(res?.data?.success) {
                const {name, email, address, phone, role} = res.data.user
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('token', res.data.token)
                dispatch(loginSuccess({name, email, address, phone, role}))
                toast.success("Login successful")
              }
              else {
                dispatch(loginError())
                toast.error(res.data.message)
              }
            } catch (error) {
                console.log(error)
            }
        }
      });

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
        <h1 className="text-center mb-4 fw-bold">Login</h1>
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
        <Link to="/forgot-password" className="d-block text-end" style={{fontSize: 'small'}}>Forgot password?</Link>
        <button type="submit" className='btn btn-primary' disabled={isLoading}>
          {isLoading ? <FontAwesomeIcon icon={faCircleNotch} className="spinner" style={{marginRight: 4}} /> : null}
          Submit
        </button>
      </form>
  )
}
