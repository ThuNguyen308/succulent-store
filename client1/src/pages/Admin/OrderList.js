import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Select } from 'antd'
const {Option} = Select

export default function OrderList() {
    const [status, setStatus] = useState(["Not process", "Processing", "Shipped", "Delivered", "Cancel"])
    const [changeStatus, setChangeStatus] = useState("")
    const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API + `api/v1/product/all-order`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      setOrders(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleChange = async (orderId, value) => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API + `api/v1/product/update-order-status/${orderId}`,
        {status: value},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res)
      alert(res.data.message);
      if(res.data.success) {
        getOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <h1>All Orders</h1>
        <table className="table table-bordered mt-3 text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Status</th>
            <th>Buyer</th>
            <th>Date</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order?._id}>
              <td>{index + 1}</td>
              <td>
                <Select
                    bordered={false}
                    onChange={value => handleChange(order._id, value)}
                    defaultValue={order?.status}
                >
                    {status.map((status, index) => (
                        <Option key={index} value={status}>
                            {status}
                        </Option>
                    ))}
                </Select>
              </td>
              <td>{order?.buyer.name}</td>
              <td>{moment(order?.createAt).fromNow()}</td>
              <th>{order?.payment.success ? "Success": "Failed"}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
