import { useEffect, useState } from 'react';
import axios from 'axios';
import { Checkbox, Pagination, Radio} from 'antd';

import ProductCard from '../components/ProductCard';
import {prices} from '../components/Price';
import { fetchAllProduct } from '../services/ProductSevice';


export default function HomePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [checkedCategories, setCheckedCategories] = useState([])
  const [radioPrice, setRadioPrice] = useState([])

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState('')
  const [limit, setLimit] = useState(8)

  const getProductsPerPage = async () => {
    try {
      const res = await fetchAllProduct(page, limit);
      if(res) {
        setProducts(res.products)
        setTotal(res.total)
      }
    } catch (err) {
      console.log(err);
    }
  }

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

  useEffect(() => {
    getProductsPerPage();
    getAllCategories()
  }, []);

  useEffect(() => {
    getProductsPerPage();
  }, [page])

  useEffect(() => {
    filterProduct();
  }, [checkedCategories, radioPrice]);

  const handleFilterByCategory = (value, id) => {
    let all = [...checkedCategories];
    if(value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setCheckedCategories(() => all)
  }

  const filterProduct = async (req, res) => {
    try {
      console.log(checkedCategories, radioPrice)
      const {data} = await axios.post(process.env.REACT_APP_API + "api/v1/product/product-filters", 
      {checkedCategories, radioPrice})
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      "slide"
      <div className="row">
        <div className="col-md-3">
          <div className="d-flex flex-column mb-3">
            <h3>Category</h3>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilterByCategory(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <div className="d-flex flex-column mb-3">
            <h3>Price</h3>
            <Radio.Group onChange={(e) => setRadioPrice(e.target.value)}>
                {prices?.map((price) => (
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                ))}
            </Radio.Group>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => { window.location.reload()}}>
              Reset
          </button>
        </div>
        <div className="col-md-9">
          <div className="row g-1">
            {products.length > 0
              ? (products.map(product => 
                  <div key={product._id} className="col-lg-3 col-md-4 col-6">
                    <ProductCard key={product._id} product={product}/>
                  </div>
                )
              ) : (<div>No product found</div>)
            }
          </div>
          <Pagination 
            defaultCurrent={1}
            current={page}
            pageSize={limit}
            total={total} 
            onChange={(page)=> {setPage(page)}}
          />
        </div>
      </div>
    </>
  )
}
