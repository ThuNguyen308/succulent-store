import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/components/ProductCard.scss'
import { addToCart } from '../redux/actions/cart'
import format from '../helpers/format'

export default function ProductCard({product}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {_id, slug, name, price} = product
  return (
    <Link to={`product/${slug}`} className="product-card">
        <div className="img-warpper">
            <img className="img" src={process.env.REACT_APP_API + `api/v1/product/product-photo/${_id}`}/>
        </div>
        <div className="body">
            <p className="name">{name}</p>
            <p className="quantity">{format.formatPrice(price)}</p>
            <button className="btn btn-primary"
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(addToCart(product))
                }}
            >
                Add to cart
            </button>
        </div>
    </Link>
  )
}
