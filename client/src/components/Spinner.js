import {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Spinner({path = "login"}) {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setCount(prev => --prev)
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => clearTimeout(timeOut)
    }, [count, navigate, location, path])
  return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
        <h1 className='Text-center'>Redirecting to you in {count} sesond</h1>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

  )
}
