import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";

import { prices } from "../components/Prices";
import "../styles/HomePage.css";
import { useCart } from "../context/cart";

export default function HomePage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [radioPrice, setRadioPrice] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + "api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_API + `api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + "api/v1/category/get-all-category"
      );
      setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
    getTotal();
    getAllCategories();
  }, []);

  useEffect(() => {
    if (page !== 1) {
      loadMore();
    }
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_API + `api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //handle filter by category
  const handleFilterByCategory = (value, id) => {
    let all = [...checkedCategories];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheckedCategories(all);
  };

  useEffect(() => {
    if (!checkedCategories.length && !radioPrice.length) getAllProducts();
    console.log("getall");
  }, [checkedCategories.length === 0, radioPrice.length === 0]);

  useEffect(() => {
    if (checkedCategories.length || radioPrice.length) filterProduct();
    console.log("get some");
  }, [checkedCategories, radioPrice]);

  //get filter product
  const filterProduct = async (req, res) => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API + "api/v1/product/product-filters",
        { checkedCategories, radioPrice }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best offers"}>
      {/* <pre>
          {JSON.stringify(auth, null, 4)}
        </pre> */}
      <div className="row mt-3">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) =>
                  handleFilterByCategory(e.target.checked, c._id)
                }
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadioPrice(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1>All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={
                    process.env.REACT_APP_API +
                    `api/v1/product/product-photo/${p._id}`
                  }
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">{p.price}</p>
                  <div className="card-name-price d-flex">
                    <button
                      className="btn btn-info ms-1 flex-fill"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1 flex-fill"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success(`${p.name} added to cart`);
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="m-2 p-3">
          {products && products.length < total && (
            <button className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page+1)
              }}
            >
              {loading ? "loading ..." : "Load more"}
            </button>
          )}
        </div> */}
      </div>
    </Layout>
  );
}
