import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faChevronDown,
  faCaretDown,
  faBars,
  faMagnifyingGlass,
  faClipboard,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Badge } from "antd";

import { logout } from "../../../redux/actions/user";
import SearchInput from "../../Form/SearchInput";
import "../../../styles/components/Header.scss";
import logo from "../../../assets/images/logo.png";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuth);
  const items = useSelector((state) => state.cart.items);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
    const searchIconElement = document.querySelector(".search-icon");
    const navIconElement = document.querySelector(".nav-icon");
    const overlayElement = document.querySelector(".overlay");

    const handleClickSearchIconElement = () => {
      document.querySelector(".search-input").classList.toggle("active");
      if (document.querySelector(".nav").classList.contains("is-active")) {
        document.querySelector(".nav").classList.remove("is-active");
        document.querySelector(".overlay").classList.remove("is-active");
      }
    };
    const handleClickNavIconElement = () => {
      document.querySelector(".nav").classList.toggle("is-active");
      document.querySelector(".overlay").classList.toggle("is-active");

      if (
        document.querySelector(".search-input").classList.contains("active")
      ) {
        document.querySelector(".search-input").classList.remove("active");
      }
    };

    searchIconElement.addEventListener("click", handleClickSearchIconElement);
    navIconElement.addEventListener("click", handleClickNavIconElement);
    overlayElement.addEventListener("click", handleClickNavIconElement);

    return () => {
      searchIconElement.removeEventListener(
        "click",
        handleClickSearchIconElement
      );
      navIconElement.removeEventListener("click", handleClickNavIconElement);
      overlayElement.removeEventListener("click", handleClickNavIconElement);
    };
  }, []);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + "api/v1/category/get-all-category"
      );
      setCategories(data.category);
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="header">
      <div className="overlay"></div>
      {/* main header */}
      <div className="main-header">
        <div className="container1 main-header-inner">
          <FontAwesomeIcon icon={faBars} className="nav-icon icon" />
          <Link to="/" className="brand-container">
            <img src={logo} className="logo" />
            Sen đá xinh
          </Link>
          <div className="search-input">
            <div className="search-input-inner">
              <SearchInput />
            </div>
          </div>
          <div className="group-items">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="search-icon icon"
            />
            <div role="button" className="dropdown1">
              {isAuth ? (
                <>
                  <img
                    src={
                      process.env.REACT_APP_API +
                      `api/v1/auth/get-avatar/${user._id}`
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <span className="user-name">{user?.name}</span>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ paddingLeft: "4px" }}
                    className="icon"
                  />
                </>
              ) : (
                <FontAwesomeIcon icon={faUser} className="icon" />
              )}
              <ul className="dropdown1-menu">
                {isAuth ? (
                  <>
                    <li>
                      <Link to="/user/profile" className="dropdown1-item-link">
                        Profile
                        <FontAwesomeIcon icon={faUser} />
                      </Link>
                    </li>
                    <li>
                      <Link to="/user/orders" className="dropdown1-item-link">
                        Orders
                        <FontAwesomeIcon icon={faClipboard} />
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown1-divider" />
                    </li>
                    <li>
                      <button
                        onClick={() => handleLogout()}
                        className="dropdown1-item-link"
                      >
                        Log out
                        <FontAwesomeIcon icon={faRightFromBracket} />
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/register" className="dropdown1-item-link">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="dropdown1-item-link">
                        Log in
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <NavLink to="/cart" className="nav-link">
              <Badge count={items.length} size="small" offset={[3, -4]}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: "#fff" }}
                />
              </Badge>
            </NavLink>
          </div>
        </div>
      </div>

      {/* navbar */}
      <nav className="nav">
        <ul className="nav-inner">
          {user?.role === 1 && (
            <li className="nav-item">
              <NavLink to="/admin" className="nav-item-link">
                Admin
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink to="/" className="nav-item-link">
              Trang chủ
            </NavLink>
          </li>
          <li className="nav-item">
            <label className="nav-item-link" htmlFor="drop-1">
              Sản phẩm
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ paddingLeft: "4px" }}
              />
            </label>
            <input type="checkbox" id="drop-1" />
            <ul className="sub-menu">
              {categories.map((c) => (
                <li key={c._id} className="sub-menu-item">
                  <Link
                    to={`category/${c.slug}`}
                    className="sub-menu-item-link"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="nav-item">
            <NavLink to="/about-us" className="nav-item-link">
              Về chúng tôi
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/help" className="nav-item-link">
              Trợ giúp
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
