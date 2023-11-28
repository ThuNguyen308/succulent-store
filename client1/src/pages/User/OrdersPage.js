import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import format from "../../helpers/format";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + `api/v1/product/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      {orders?.map((order, index) => {
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
                  <th>{order?._id}</th>
                  <th>{order?.status}</th>
                  <th>{moment(order?.createAt).fromNow()}</th>
                  <th>{order?.payment.success ? "Success" : "Failed"}</th>
                </tr>
              </tbody>
            </table>
            <table
              className="table table-bordered mt-3 text-center"
              style={{ fontSize: "smaller" }}
            >
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.products.map((product, index) => (
                  <tr key={product?.product?._id}>
                    <td>{index + 1}</td>
                    <td>{product?.product?.name}</td>
                    <td>{format.formatPrice(product?.product?.price)}</td>
                    <td>{product?.buyQuantity}</td>
                    <td>
                      {format.formatPrice(
                        product?.product?.price * product?.buyQuantity
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {format.formatPrice(
                      order?.products.reduce(
                        (total, p) => total + p.buyQuantity * p.product?.price,
                        0
                      )
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        );
      })}
    </>
  );
}
