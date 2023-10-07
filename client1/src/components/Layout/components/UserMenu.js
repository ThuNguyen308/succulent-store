import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserMenu() {
  return (
    <ul className="list-group">
        <h2>User Panel</h2>
        <NavLink to="/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
        <NavLink to="/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
    </ul>
  )
}
