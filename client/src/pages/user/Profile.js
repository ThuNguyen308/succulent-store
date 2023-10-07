import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

export default function Profile() {
  return (
    <Layout title={"Your profile"}>
        <div className="container-fuild p-3 m-3">
            <div className="row">
            <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    <h1>Your profile</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}
