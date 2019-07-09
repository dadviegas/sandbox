import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <header className="b bg-dark-gray white flex items-baseline justify-between fixed top-0 left-0 right-0 z-9999">
    <Link
      to={{
        pathname: '/',
        state: { prev: false },
      }}
      className="pa3 white no-underline ttu tracked"
    >
      DADV
    </Link>
    <nav>
      <Link
        to={{
          pathname: '/home',
          state: { prev: true },
        }}
        className="white no-underline pv3 pr3 normal"
      >
        Home
      </Link>
      <Link
        to={{
          pathname: '/about',
          state: { prev: true },
        }}
        className="white no-underline pv3 pr3 normal"
      >
        About
      </Link>
    </nav>
  </header>
)

export default Header
