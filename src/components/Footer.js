import React from 'react';

const footerStyle = {
  marginTop: '40px',
  fontSize: '0.8rem',
};

const Footer = () =>
  (<footer className="container text-center" style={footerStyle}>
    Created by{' '}
    <a href="mailto:grzegorz.rozdzialik@gmail.com">Grzegorz Rozdzialik</a> @
    2017
  </footer>);

export default Footer;
