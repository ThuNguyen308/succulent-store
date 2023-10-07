import {useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import '../../styles/AuthStyles.css'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [answer, setAnswer] = useState("")

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post(process.env.REACT_APP_API + 'api/v1/auth/forgot-password', {
              email,
              newPassword,
              answer
          })
          if(res.data.success) {
              toast.success(res.data.message)
              navigate("/login")
          } else {
              toast.error(res.data.message)
          }
      } catch (err) {
          toast.error("Something is wrong")
          console.log('err', err)
      }
  }


  return (
      <Layout title="Register">
          <div className="form-container"
              style={
                  {minHeight: "90vh"}
          }>
              <form onSubmit={handleSubmit}>
                  <h4 className="title">Reset Password form</h4>
                  <div className="mb-3">
                      <input value={email}
                          onChange={
                              (e) => setEmail(e.target.value)
                          }
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"/>
                  </div>
                  <div className="mb-3">
                      <input value={answer}
                          onChange={
                              (e) => setAnswer(e.target.value)
                          }
                          type="text"
                          className="form-control"
                          placeholder="Your favorite watch brand"/>
                  </div>
                  <div className="mb-3">
                      <input value={newPassword}
                          onChange={
                              (e) => setNewPassword(e.target.value)
                          }
                          type="password"
                          className="form-control"
                          placeholder="Enter your new password"/>
                  </div>
                  <button type="submit" className="btn btn-primary">
                      Submit
                  </button>
              </form>
          </div>
      </Layout>
  );
}
