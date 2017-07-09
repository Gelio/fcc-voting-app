import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Polls from './containers/Polls';
import SinglePoll from './containers/SinglePoll';

function App(props) {
  return (
    <div>
      <Navigation authenticated={props.auth.get('authenticated')} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/polls" component={Polls} />
        <Route path="/poll/:pollId" component={SinglePoll} />
      </Switch>
      <Footer />
    </div>
  );
}

/* eslint-disable */
App.propTypes = {
  auth: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};
/* eslint-enable */

function mapStateToProps(state) {
  return {
    auth: state.auth,
    router: state.router,
  };
}

export default connect(mapStateToProps)(App);
