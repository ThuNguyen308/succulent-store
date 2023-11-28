import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faGoogle,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          <div className="col-md-6 col-lg-4 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase fw-bold mb-4">Watch store</h5>
            <p>
              You can see all the famous and best quality watches in our store,
              it is our pleasure to serve you.
            </p>
          </div>
          <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Categories</h5>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                Men
              </Link>
            </p>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                Women
              </Link>
            </p>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                Boys
              </Link>
            </p>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                Girls
              </Link>
            </p>
          </div>
          <div className="col-md-6 col-lg-4 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Custom Services</h5>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                Interventions and Prices
              </Link>
            </p>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                Preserve your watch
              </Link>
            </p>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                Certifcates and extracts
              </Link>
            </p>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                Order a Catalogue
              </Link>
            </p>
            <p>
              <Link to="/men" style={{ textDecoration: "none" }}>
                FAQ
              </Link>
            </p>
          </div>
          <div className="col-md-6 col-lg-12 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Contact</h5>
            <p>
              <FontAwesomeIcon icon={faHome} className="me-1" />
              Ho Chi Minh, Viet Namy
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
