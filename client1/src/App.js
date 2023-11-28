import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";

import "./App.scss";

import ProtectedRoute from "./components/Route/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import RegisterPage from "./pages/RegisterPage";
import DefaultLayout from "./components/Layout/DefaultLayout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/User/ProfilePage";
import OrdersPage from "./pages/User/OrdersPage";

import { loginSuccess, logout } from "./redux/actions/user";
import AdminRoute from "./components/Route/AdminRoute";
import AdminLayout from "./components/Layout/AdminLayout";
import ProductList from "./pages/Admin/ProductList";
import OrderList from "./pages/Admin/OrderList";
import CategoryList from "./pages/Admin/CategoryList";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import UserLayout from "./components/Layout/UserLayout";
import SearchPage from "./pages/SearchPage";
import CategoryProductPage from "./pages/CategoryProductPage";
import ProductPage from "./pages/ProductPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token: " + token);
    try {
      const fetchUser = async () => {
        const res = await axios.get(
          process.env.REACT_APP_API + "api/v1/auth/user-auth",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.ok) {
          dispatch(loginSuccess(JSON.parse(localStorage.getItem("user"))));
        } else {
          dispatch(logout());
        }
      };
      if (token) {
        fetchUser();
      }
    } catch (e) {
      console.log("auth", e);
      dispatch(logout());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="" element={<HomePage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="category/:slug" element={<CategoryProductPage />} />
            <Route path="product/:slug" element={<ProductPage />} />
            <Route path="search/:keyword" element={<SearchPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="user" element={<UserLayout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<OrdersPage />} />
            </Route>
            <Route path="user" element={<DefaultLayout />}>
              <Route path="checkout" element={<CheckoutPage />} />
            </Route>
          </Route>

          <Route path="/" element={<AdminRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              {["", "categories"].map((path, index) => (
                <Route path={path} element={<CategoryList />} key={index} />
              ))}
              <Route path="products" element={<ProductList />} />
              <Route path="orders" element={<OrderList />} />
              {/* <Route path="product/update/:slug" element={<UpdateProductPage />} /> */}
            </Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
