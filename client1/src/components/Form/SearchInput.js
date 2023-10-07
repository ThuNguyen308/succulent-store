import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/components/SearchInput.scss";
import format from "../../helpers/format.js";

export default function SearchInput() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useSearch();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const valueSearch = useRef();

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const toggle = (e) => {
    setIsOpen(() => e && e.target === inputRef.current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = async (e) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API +
          `api/v1/product/search/${valueSearch.current}`
      );
      setValue({ ...value, results: data, keyword: valueSearch.current });
      document.querySelector(".search-input").classList.remove("active");
      navigate(`/search/${valueSearch.current}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = async (keyword) => {
    valueSearch.current = keyword;
    try {
      if (keyword) {
        const { data } = await axios.get(
          process.env.REACT_APP_API + `api/v1/product/search-limit/${keyword}`
        );
        setProducts(data.result);
        setTotal(data.total);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isOpen && products.length > 0 ? (
        <div className="search-result">
          <ul>
            {products.map((item) => (
              <li className="result-item" key={item._id}>
                <a
                  onClick={() => navigate(`/product/${item.slug}`)}
                  className="result-item-link"
                >
                  <div>
                    <span className="name">{item.name}</span>
                    <span className="price">
                      {format.formatPrice(item.price)}
                    </span>
                  </div>
                  <img
                    src={
                      process.env.REACT_APP_API +
                      `api/v1/product/product-photo/${item._id}`
                    }
                    alt={item.name}
                    className="img"
                  />
                </a>
              </li>
            ))}
          </ul>
          {total - 2 > 0 ? (
            <button className="see-all-btn" onClick={() => handleSearch()}>
              Xem tất cả {total} sản phẩm
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
