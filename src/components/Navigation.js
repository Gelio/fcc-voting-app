import React, { Component } from 'react';
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

class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      collapsed: true
    };
  }

  toggleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { authenticated, username } = this.props;

    return (
      <nav className="navbar navbar-toggleable navbar-light bg-faded">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          onClick={this.toggleCollapse.bind(this)}
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <h1 className="navbar-brand mb-0">
          <Link to="/">Voting App</Link>
        </h1>

        <div className={'navbar-collapse' + (this.state.collapsed ? ' collapse' : '')}>
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
  }
}

export default Navigation;
