import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

class Header extends PureComponent {
  render() {
    const { location } = this.props;
    return (
      <header className="b bg-dark-gray white flex items-baseline justify-between fixed top-0 left-0 right-0 z-9999">
        <Link
          to={{
            pathname: '/',
          }}
          className={cn({'pa3 white no-underline ttu tracked hover-light-purple': true, 'light-purple': location.pathname === '/'})}
          >
          DADV
        </Link>
        <nav>
          <Link
            to={{
              pathname: '/home',
            }}
            className={cn({'white no-underline pv3 pr3 normal hover-light-purple': true, 'light-purple': location.pathname === '/home'})}
          >
            Home
          </Link>
          <Link
            to={{
              pathname: '/about',
            }}
            className={cn({'white no-underline pv3 pr3 normal hover-light-purple': true, 'light-purple': location.pathname === '/about'})}
          >
            About
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
