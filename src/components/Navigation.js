import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const AppNavLink = ({ exact, to, children }) =>
  (<NavLink exact={exact} to={to} className="nav-link" activeClassName="active">
    {children}
  </NavLink>);

AppNavLink.propTypes = {
  exact: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.children.isRequired,
};

AppNavLink.defaultProps = {
  exact: false,
};

class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      collapsed: true,
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { authenticated } = this.props;

    return (
      <nav className="navbar navbar-toggleable navbar-light bg-faded">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          onClick={this.toggleCollapse}
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <h1 className="navbar-brand mb-0">
          <Link to="/" className="navbar-brand">
            Voting App
          </Link>
        </h1>

        <div
          className={`navbar-collapse${this.state.collapsed
            ? ' collapse'
            : ''}`}
        >
          <ul className="navbar-nav ml-auto">
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

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default Navigation;
