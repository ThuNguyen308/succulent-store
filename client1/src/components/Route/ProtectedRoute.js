import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    // const [isAuthed, setAuthed] = useState(false)
    // useEffect(() => {
    //     const token = localStorage.getItem('token');

    //     const timeOut = setTimeout(() => {
    //         const checkAuth = async () => {
    //             const res = await axios.get(process.env.REACT_APP_API + 'api/v1/auth/user-auth',
    //                 {headers : {Authorization: `${token}`}}
    //             )
    //             if(res.data.ok) {
    //                 setAuthed(true)
    //             }
    //         }
    //         if(token) {
    //             checkAuth()
    //         }
    //     }, 3000)
    // }, [])
  return localStorage.getItem('token') ? <Outlet /> : <p>You have no permission to access this page :v</p>
}
