import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import QuantityControl from "../components/QuantityControl";
import ProductCard from "../components/ProductCard";
import "../styles/pages/Product.scss";

export default function ProductPage() {
  let params = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_API +
        `api/v1/product/get-single-product/${params.slug}`
    );
    setProduct(data?.product);
    fetchRelatedProducts(data?.product._id, data?.product.category._id);
  };

  const handleIncrease = () => {};
  const handleDecrease = () => {};

  const fetchRelatedProducts = async (pid, cid) => {
    const { data } = await axios.get(
      process.env.REACT_APP_API + `api/v1/product/related-product/${pid}/${cid}`
    );
    setRelatedProducts(data?.products);
  };

  console.log(product);

  return (
    <div>
      ProductPage
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <img
            className="img"
            src={
              process.env.REACT_APP_API +
              `api/v1/product/product-photo/${product?._id}`
            }
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
            alt={product?.name}
          />
        </div>
        <div className="col-lg-6 col-sm-12" style={{ marginTop: "10px" }}>
          <div className="d-flex flex-column gap-3">
            <h3>{product?.name}</h3>
            <div className="detail-item">
              <span className="title">Loại: </span>
              <div className="content">
                <Link
                  to={`category/${product?.category?.slug}`}
                  style={{ textDecoration: "underline" }}
                >
                  {product?.category?.name}
                </Link>
              </div>
            </div>
            <div className="detail-item">
              <span className="title">Mô tả: </span>
              <div className="content">{product?.description}</div>
            </div>
            <div className="detail-item">
              <span className="title">Số lượng: </span>
              <div className="content">
                <QuantityControl
                  value={quantity}
                  setValue={setQuantity}
                  maxValue={product?.quantity}
                />
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: "200px" }}>
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ marginRight: "4px" }}
              />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Sản phẩm liên quan</h3>
        <div className="row g-1">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <div
                key={product._id}
                className="col-xl-2 col-lg-3 col-md-6 col-6"
              >
                <ProductCard key={product._id} product={product} />
              </div>
            ))
          ) : (
            <p>There are no related products</p>
          )}
        </div>
      </div>
    </div>
  );
}
