import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import format from "../helpers/format";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/images/empty_cart.png";

export default function Cart() {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);

  const total = items.reduce((total, item) => {
    return total + item.buyQuantity * item.price;
  }, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            <table className="table table-bordered mt-3 text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <h2>Cart Summary</h2>
            <h3>Total: {format.formatPrice(total)}</h3>
            <hr className="divider" />
            {user?._id ? (
              <button
                className="btn bg-primary text-white"
                onClick={() => navigate("/user/checkout")}
              >
                Checkout
              </button>
            ) : (
              <button
                className="btn bg-primary text-white"
                onClick={() => navigate("/login", require)}
              >
                Please Login to Checkout
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img src={emptyCart} alt="emptycart" />
        </div>
      )}
    </div>
  );
}
