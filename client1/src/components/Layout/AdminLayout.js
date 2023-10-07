import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminMenu from './components/AdminMenu'

export default function AdminLayout() {
  return (
    <>
      <Header />
        <main className='container main-container'>
           <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <Outlet />
                </div>
           </div>
        </main>
      <Footer />
    </>
  )
}
