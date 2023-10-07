import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import CartItem from "../../components/CartItem";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + `api/v1/product/orders`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <h1>All orders</h1>
      {/* <p>{JSON.stringify(orders, null, 4)}</p> */}
      {
        orders?.map((order, index) => {
          return (
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <td scope="col">No</td>
                    <td scope="col">Orders</td>
                    <td scope="col">Status</td>
                    <td scope="col">Date</td>
                    <td scope="col">Payment</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{index + 1}</th>
                    <th>{order?.status}</th>
                    <th>{order?._id}</th>
                    <th>{moment(order?.createAt).fromNow()}</th>
                    <th>{order?.payment.success ? "Success": "Failed"}</th>
                  </tr>
                </tbody>
              </table>
              <table className="table table-bordered mt-3 text-center">
              <thead>
                      <tr>
                        <td scope="col">No</td>
                        <td scope="col">Product</td>
                        <td scope="col">Price</td>
                        <td scope="col">Quantity</td>
                        <td scope="col">Total</td>
                      </tr>
                    </thead>
                    <tbody>
                  {order?.products.map((product, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <th>{product?.product?.name}</th>
                        <th>{product?.product?.price}</th>
                        <th>{product?.buyQuantity}</th>
                        <th>{product?.product?.price * product?.buyQuantity}</th>
                      </tr>
                  ))}
                  </tbody>
                </table>
            </div>
          )
        })
      }
    </>
  );
}
