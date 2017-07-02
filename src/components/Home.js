import React from 'react';

const Home = props => {
  return (
    <div className="container mt-2">
      <h1>Voting App</h1>
      <p>
        This web app is an assignment from the{' '}
        <a href="https://www.freecodecamp.org/">freeCodeCamp</a>
        {' '}online course.
      </p>

      <p>
        It allows everyone to vote in polls created by authenticated users. Users can sign in using
        Google or an email with a password.
      </p>
    </div>
  );
};

export default Home;
