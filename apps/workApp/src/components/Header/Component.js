import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

class Header extends PureComponent {
  render() {
    return (
      <header className="b bg-dark-gray white flex items-baseline justify-between fixed top-0 left-0 right-0 z-9999">
        <Link
          to={{
            pathname: '/',
            state: {
              prev: this.props.location.pathname === '/',
              location: this.props.location.pathname,
            },
          }}
          className="pa3 white no-underline ttu tracked"
        >
          DADV
        </Link>
        <nav>
          <Link
            to={{
              pathname: '/home',
              state: {
                prev: this.props.location.pathname === '/home',
                location: this.props.location.pathname,
              },
            }}
            className="white no-underline pv3 pr3 normal"
          >
            Home
          </Link>
          <Link
            to={{
              pathname: '/about',
              state: {
                prev: this.props.location.pathname === '/about',
                location: this.props.location.pathname,
              },
            }}
            className="white no-underline pv3 pr3 normal"
          >
            About
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
