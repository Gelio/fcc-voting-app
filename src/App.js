import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Polls from './containers/Polls';
import SinglePoll from './containers/SinglePoll';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation authenticated={this.props.auth.get('authenticated')} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/polls" component={Polls} />
          <Route path="/poll/:pollId" component={SinglePoll} />
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
  };
}

export default connect(mapStateToProps)(App);
