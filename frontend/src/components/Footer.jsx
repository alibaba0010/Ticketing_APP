import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div
      style={{
        padding: "12px 0px",
        backgroundColor: "rgb(232, 227, 227)",
        textAlign: 'center',
        position: 'fixed',
        width: '100%',
        height: '85px',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: '999',
      }}
    >
      <div className="text-center">
        <h5>
          Made with ❤️ by <a href="https:" style={{ textDecoration: "none", color: "red" }}>TeamWork</a>
        </h5>
      </div>

      <div className="text-center pt-1">
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          <i className="bi bi-linkedin mx-2" style={{ fontSize: "20px" }}></i>
        </a>

        <a href="https://david/" target="_blank" rel="noreferrer">
          <i className="bi bi-globe mx-2" style={{ fontSize: "20px" }}></i>
        </a>

        <a href="https://github.com" target="_blank" rel="noreferrer">
          <i className="bi bi-github mx-2" style={{ fontSize: "21px" }}></i>
        </a>

        <a href="mailto:laabkdaiv@gmail.com" target="_blank" rel="noreferrer">
          <i className="bi bi-envelope-fill mx-2" style={{ fontSize: "21px" }}></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
