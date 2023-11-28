import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faGoogle,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Footer() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + "api/v1/category/get-all-category"
      );
      setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Fetch categories failed");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <footer className="pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          <div className="col-md-6 col-lg-4 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase fw-bold mb-4">Watch store</h5>
            <p>
              Sen đá xinh cung cấp sen đá sỉ và lẻ tại khu vực TPHCM. Với kinh
              nghiệm hoạt động hơn 3 năm tại TPHCM, vườn có đầy đủ kinh nghiệm
              để chọn lựa các loại sen đá phù hợp nhất có thể sống được tại nơi
              có khí hậu nóng như Sài Gòn.
            </p>
          </div>
          <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Categories</h5>
            {categories.map((c) => (
              <p key={c._id}>
                <Link
                  to={`category/${c.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  {c.name}
                </Link>
              </p>
            ))}
          </div>
          <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Custom Services</h5>
            <p>
              <Link to="#" style={{ textDecoration: "none" }}>
                Về chúng tôi
              </Link>
            </p>
            <p>
              <Link to="#" style={{ textDecoration: "none" }}>
                Chứng chỉ
              </Link>
            </p>
            <p>
              <Link to="#" style={{ textDecoration: "none" }}>
                Quy định trả hàng
              </Link>
            </p>
            <p>
              <Link to="#" style={{ textDecoration: "none" }}>
                Hỏi và đáp
              </Link>
            </p>
            <p>
              <Link to="#" style={{ textDecoration: "none" }}>
                Cách nuôi trồng sen đá, xương rồng
              </Link>
            </p>
          </div>
          <div className="col-md-6 col-lg-12 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Contact</h5>
            <p>
              <FontAwesomeIcon icon={faHome} className="me-1" />
              Gò Vấp, Hồ Chí Minh
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              thunguyenthiminh192@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              +83 9568725
            </p>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="row align-items-center">
          <div className="col-md-6 col-lg-6">
            <p>
              All rights reserved by:
              <Link to="" style={{ textDecoration: "none" }}>
                <strong>Thu Nguyen</strong>
              </Link>
            </p>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="text-center">
              <ul className="list-unstyled d-inline-flex gap-4 social-icon-list">
                <li>
                  <Link
                    to="#"
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "36px", height: "36px" }}
                  >
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-light"
                      style={{ fontSize: "24px" }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "36px", height: "36px" }}
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-light"
                      style={{ fontSize: "24px" }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "36px", height: "36px" }}
                  >
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="text-light"
                      style={{ fontSize: "24px" }}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{ width: "36px", height: "36px" }}
                  >
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className="text-light"
                      style={{ fontSize: "24px" }}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
