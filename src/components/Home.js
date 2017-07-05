import React from 'react';

import PageContainer from './PageContainer';

import CreatePoll from './CreatePoll';

const Home = () =>
  (<PageContainer>
    <h1>Voting App</h1>
    <p>
      This web app is an assignment from the{' '}
      <a href="https://www.freecodecamp.org/">freeCodeCamp</a> online course.
    </p>

    <p>
      It allows everyone to vote in polls created by authenticated users. Users
      can sign in using Google or an email with a password.
    </p>

    <CreatePoll />
  </PageContainer>);

export default Home;
