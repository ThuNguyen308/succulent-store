import {useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate, useLocation} from 'react-router-dom'
import { useAuth } from "../../context/auth";

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_API + "api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login form</h4>
          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
          
          <button type="button" className="mb-3 btn d-block" onClick={() => navigate('/forgot-password')}>
              Forgot password
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
