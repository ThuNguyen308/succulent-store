import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
  const {role} = JSON.parse(localStorage.getItem('user'))
  return role === 1 ? <Outlet /> : <p>You have no permission to access this page :v</p>
}
