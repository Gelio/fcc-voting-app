import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation authenticated={this.props.auth.get('authenticated')} />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    router: state.router
  }
}

export default connect(mapStateToProps)(App);
