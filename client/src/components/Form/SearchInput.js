import React, { useEffect, useRef, useState } from 'react'
import {useSearch} from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/SearchInput.css'
import format from '../../helpers/format.js'

export default function SearchInput() {
    const navigate = useNavigate();
    const [value, setValue] = useSearch();
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const valueSearch = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(process.env.REACT_APP_API + `api/v1/product/search/${valueSearch.current}`);
            setValue({...value, results: data, keyword: valueSearch.current});
            navigate(`/search/${value.keyword}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSearchAll = async () => {
        try {
            const {data} = await axios.get(process.env.REACT_APP_API + `api/v1/product/search/${valueSearch.current}`);
            setValue({...value, results: data, keyword: valueSearch.current});
            navigate(`/search/${value.keyword}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSearch =async (keyword) => {
        try{
            valueSearch.current = keyword;
            if(keyword) {
                const {data} = await axios.get(process.env.REACT_APP_API + `api/v1/product/search-limit/${keyword}`);
                setProducts(data.result);
                setTotal(data.total);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='search-container'>
        <form className="d-flex search-form" onSubmit={handleSubmit}>
            <input className="form-control me-2" 
                type="search" 
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
        <div className="search-result">
            <ul>
                {products.map(item => (
                    <li className="result-item" key={item._id}>
                        <a onClick={() => navigate(`/product/${item.slug}`)} className="result-item-link">
                            <div>
                                <span className="name">{item.name}</span>
                                <span className="price">{format.formatPrice(item.price)}</span>
                            </div>
                            <img src={process.env.REACT_APP_API + `api/v1/product/product-photo/${item._id}`}
                                alt={item.name} 
                                className="img" 
                            />
                        </a>
                    </li>
                ))}
            </ul>
            {total - 2 > 0 ? <button onClick={() => handleSearchAll()}>Xem tất cả {total} sản phẩm</button> : null}
        </div>
    </div>

  )
}