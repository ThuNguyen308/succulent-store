import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footer">
        <h1 className="text-center">
            All right reverved &copy; Thu Nguyen
        </h1>
        <p className="text-center mt-3">
            <Link to="/about">About</Link>|
            <Link to="/contact">Contact</Link>|
            <Link to="/policy">Policy</Link>|
        </p>
    </div>
  )
}
