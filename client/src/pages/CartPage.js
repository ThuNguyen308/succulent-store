import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyles.css";

export default function CartPage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price 
  const totalPrice = () => {
    const total = cart.reduce((total, p) => {
        return total + p.price
      }, 0)
    return total.toLocaleString("en-US", {
        style: 'currency',
        currency: "USD"
    })
  }

  //delete item
  const removeCartItem = (pid) => {
    try {
        let myCart = [...cart];
        let index = myCart.findIndex(item => item._id === pid)
        myCart.splice(index, 1)
        setCart(myCart)
        localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You have ${cart.length} items in your cart 
                            ${auth?.token ? "" : "Please login to checkout"}`
                : "Your cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                    <img
                        src={process.env.REACT_APP_API + `api/v1/product/product-photo/${p._id}`}
                        className="cart-img-top"
                        width="100px"
                        height="100px"
                    />
                </div>
                <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: {p.price}</p>
                    <button className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                    >
                        Remove
                    </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h4>Cart summary</h4>
            <p>Total | Check out | Payment</p>
            <p>{totalPrice()}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
