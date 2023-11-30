import { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Pagination, Radio } from "antd";

import ProductCard from "../components/ProductCard";
import { prices } from "../components/Price";
// import { fetchAllProduct } from "../services/ProductSevice";
import format from "../helpers/format";
import { toast } from "react-toastify";
import Banner from "../components/Banner";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [radioPrice, setRadioPrice] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;

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

  useEffect(() => {
    filterProduct();
  }, [page, checkedCategories, radioPrice]);

  const resetFilter = () => {
    setCheckedCategories([]);
    setRadioPrice([]);
  };

  const handleFilterByCategory = (value, id) => {
    setPage(1);
    let all = [...checkedCategories];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheckedCategories(() => all);
  };

  const filterProduct = async (req, res) => {
    try {
      // console.log(checkedCategories, radioPrice);
      const { data } = await axios.post(
        process.env.REACT_APP_API + "api/v1/product/product-filters",
        { checkedCategories, radioPrice, page, limit }
      );
      setProducts(data?.products);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Banner />
      <div className="row">
        <div className="col-md-3">
          <div className="d-flex flex-column mb-3">
            <h3>Category</h3>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) =>
                  handleFilterByCategory(e.target.checked, c._id)
                }
                checked={checkedCategories.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <div className="d-flex flex-column mb-3">
            <h3>Price</h3>
            <Radio.Group
              value={radioPrice}
              onChange={(e) => {
                setPage(1);
                setRadioPrice(e.target.value);
              }}
            >
              {prices?.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{`${format.formatPrice(
                    price.array[0]
                  )}  -  ${
                    format.formatPrice(price.array[1])
                      ? format.formatPrice(price.array[1])
                      : "more"
                  }`}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button className="btn btn-primary" onClick={resetFilter}>
            Reset
          </button>
        </div>
        <div className="col-md-9">
          <div className="row g-1">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="col-xl-3 col-lg-4 col-md-6 col-6"
                >
                  <ProductCard key={product._id} product={product} />
                </div>
              ))
            ) : (
              <div>No product found</div>
            )}
          </div>
          <Pagination
            defaultCurrent={1}
            current={page}
            pageSize={limit}
            total={total}
            onChange={(page) => {
              setPage(page);
            }}
            style={{ textAlign: "center" }}
          />
        </div>
      </div>
    </div>
  );
}
