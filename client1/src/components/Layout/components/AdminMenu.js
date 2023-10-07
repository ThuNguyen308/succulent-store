import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminMenu() {
  return (
    <ul className="list-group">
        <h2>Admin Panel</h2>
        <NavLink to="/admin/categories" className="list-group-item list-group-item-action">Category</NavLink>
        <NavLink to="/admin/products" className="list-group-item list-group-item-action">Product</NavLink>
        <NavLink to="/admin/orders" className="list-group-item list-group-item-action">Order</NavLink>
    </ul>

  )
}
