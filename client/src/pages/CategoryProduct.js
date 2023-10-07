import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/CategoryProductStyles.css";

export default function CategoryProduct() {
  const params = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [category, setcategory] = useState()

  const getProductsByCatgory = async () => {
    try {
      const {data} = await axios.get(process.env.REACT_APP_API + `api/v1/product/product-category/${params.slug}`)
      console.log(process.env.REACT_APP_API, 'api')
      setProducts(data?.products)
      setcategory(data?.category)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if(params?.slug) {
      getProductsByCatgory()
    }
  }, [params?.slug])

  return (
    <Layout>
        <div className="container">
            <h4 className="text-center">Category: {category?.name}</h4>
            <h6 className="text-center">{products?.length} result found</h6>
            <div className="row">
            <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2"
                  style={{width: '18rem'}}
                 key={p._id}
                >
                  <img
                    src={process.env.REACT_APP_API + `api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
            </div>
        </div>
    </Layout>
  )
}
