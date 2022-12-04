import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  return (
    <div className='header'>
      {
        location.pathname === '/registration' ?
          <Link to='/'>Go Back</Link> :
          <Link to='/registration'>Login page</Link>
      }
    </div>
  )
}
