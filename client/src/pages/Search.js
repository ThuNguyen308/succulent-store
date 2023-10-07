import React from 'react'
import Layout from '../components/Layout/Layout'
import {useSearch} from "../context/search"
import format from '../helpers/format.js'

export default function Search() {
    const [value] = useSearch()
    console.log(value)
  return (
    <Layout title={"Search product - Watch store"}>
        <div className="container">
            <div className="text-center">
                <h1>Search results</h1>
                <h6>
                    {value?.results ? `${value?.results.length} products found for "${value.keyword}"` : "No Product found"}
                </h6>
            </div>
                <div className="d-flex flex-wrap mt-4">
            {value?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={process.env.REACT_APP_API + `api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p?.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {/* {p?.description.substring(0, 30)}... */}
                  </p>
                  <p className="card-text">{format.formatPrice(p?.price)}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
            </div>
        </div>
    </Layout>
  )
}
