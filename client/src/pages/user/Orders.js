import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

export default function Orders() {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const {data} = await axios.get(process.env.REACT_APP_API + `api/v1/auth/orders`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={"Orders"}>
        <div className="container-fuild p-3 m-3">
            <div className="row">
            <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>All orders</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}
