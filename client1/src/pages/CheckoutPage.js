import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import DropIn from "braintree-web-drop-in-react"

import * as paymentService from '../services/paymentService'
import format from "../helpers/format";
import axios from "axios";
import { removeAll } from "../redux/actions/cart";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const user = useSelector((state) => state.user.user);
  const items = useSelector((state) => state.cart.items);

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState(user?.address ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [payment, setPayment] = useState('later_money')
  const [sdkReady, setSdkReady] = useState(false);
  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState("")
  const [loading, setLoading] = useState(false)

  let total = items.reduce((total, item) => {
    return total + item.buyQuantity * item.price
  }, 0)

    const addPaypalScript = async () => {
        const {data} = await paymentService.getConfig()
        console.log(data)
        if(data.success) {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${data.data}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
              }
            document.body.appendChild(script)
        }
    }

    // useEffect(() => {
    //     if(!sdkReady) {
    //         addPaypalScript()
    //       }else {
    //         setSdkReady(true)
    //       }
    // }, [])
    

    const onSuccessPaypal = (details, data) => {
        console.log("details", "data", details, data)
    }

    // console.log(sdkReady, payment, window.paypal)

    //get payment gateway token
    const getToken = async () => {
        try {
            const {data} = await axios.get(process.env.REACT_APP_API + 'api/v1/product/braintree/token')
            setClientToken(data.clientToken)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken()
    }, [user])

    //handle Payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const {nonce} = await instance.requestPaymentMethod()
            const {data} = await axios.post(process.env.REACT_APP_API + 'api/v1/product/braintree/payment', {
                nonce, cart: items
            },
            {
                headers: {
                  Authorization: `${localStorage.getItem("token")}`,
                },
              })
            setLoading(false)
            dispatch(removeAll)
            navigate("/user/orders")
            alert("Payment complete successfully")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    console.log("loading", "instance", loading, instance)

  return (
    <div className="container">
      <h2 className="text-center">Checkout</h2>
      <div className="row">
        <div className="col-md-8">
            <div className="p-2 m-3">
                <h4 className="fw-bold">YOUR INFO</h4>
                <hr className="divider" />
                <div className="row mb-2 g-0">
                <label className="col-3" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    className="col-9 border p-1"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>
                <div className="row mb-2 g-0">
                <label className="col-3" htmlFor="phone">
                    Phone
                </label>
                <input
                    type="number"
                    className="col-9 border p-1"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                </div>
                <div className="row mb-2 g-0">
                <label className="col-3" htmlFor="email">
                    Email
                </label>
                <input
                    type="text"
                    className="col-9 border p-1"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="row mb-2 g-0">
                <label className="col-3" htmlFor="address">
                    Address
                </label>
                <input
                    type="text"
                    className="col-9 border p-1"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                </div>
            </div>
            <div className="p-2 m-3">
                <h4 className="fw-bold">PAYMENT METHOD</h4>
                <hr className="divider" />
                <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    id="later_money"
                    value="later_money"
                    defaultChecked
                    onClick={(e) => setPayment(e.target.value)}
                />
                <label className="form-check-label" htmlFor="later_money">
                    Cash on delivery
                </label>
                </div>
                <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    id="paypal_m"
                    value="paypal"
                    onClick={(e) => setPayment(e.target.value)}
                />
                <label className="form-check-label" htmlFor="paypal_m">
                    Cash in Advance by Paypal
                </label>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="d-flex justify-content-between">
                <p>Total</p>
                <b>{format.formatPrice(total)}</b>
            </div>
            {payment === "paypal"
                ? (
                    <>
                        <DropIn
                            options={{
                                authorization: clientToken,
                                paypal: {
                                    flow: "vault",
                                  },
                            }}
                            onInstance={(instance) => setInstance(instance)}
                        />
                        <button className="btn btn-primary" 
                            onClick={handlePayment}
                            // disabled={loading || !instance}
                        >
                            {loading ? "Processing ...." : "Make Payment"}
                        </button>
                    </>
                )
                : <button className="btn btn-primary w-100">
                    Order
                </button>
            }
        </div>
      </div>
    </div>
  );
}
