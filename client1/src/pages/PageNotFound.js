import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="page-not-found">
        <div className="text-center wrapper">
            <h1 className="fw-bold">WE ARE SORRY, PAGE NOT FOUND</h1>
            <p>THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGED OR IS TEMPORARY</p>
            <Link className="btn btn-primary" to="/">
              <FontAwesomeIcon icon={faBackward} style={{marginRight: 4}}/>
              BACK TO HOME PAGE
            </Link>
        </div>
    </div>
  )
}
