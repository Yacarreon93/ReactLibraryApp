import React from 'react'
import { Link } from 'react-router-dom'

function Navigator () {
  return (
    <nav>
      <ul className="nav nav-pills float-right">
        <li className="nav-item">
          <Link className="nav-link active" to="/book/new">Add Book</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigator