import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const AppNavLink = ({ exact, to, children }) => {
  return (
    <NavLink
      exact={exact}
      to={to}
      className="nav-link"
      activeClassName="active"
    >
      {children}
    </NavLink>
  );
};

const Navigation = ({ authenticated, username }) => {
  return (
    <nav className="navbar navbar-light bg-faded">
      <h1 className="navbar-brand mb-0">
        <Link to="/">Voting App</Link>
      </h1>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <AppNavLink exact to="/">
              Home
            </AppNavLink>
          </li>
          <li className="nav-item">
            <AppNavLink to="/polls">Polls</AppNavLink>
          </li>
          {authenticated &&
            <li className="nav-item">
              <AppNavLink to="/profile">Profile</AppNavLink>
            </li>}
          {authenticated
            ? <li className="nav-item">Logout</li>
            : <li className="nav-item">Sign in</li>}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
