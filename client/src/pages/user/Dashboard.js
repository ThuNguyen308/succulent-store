import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

export default function Dashboard() {
  const [auth] = useAuth()
  return (
    <Layout>
        <div className="container-fuild p-3 m-3">
            <div className="row">
            <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3">
                      <h1>{auth?.user?.name}</h1>
                      <h1>{auth?.user?.email}</h1>
                      <h1>{auth?.user?.address}</h1>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}
