import React from 'react';

const Arrow = () => (
  <div style={{gridRow: 3, margin: 'auto'}}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="1.5"
      clipRule="evenodd"
      viewBox="0 0 50 27"
      width="50px"
    >
      <path
        fill="none"
        stroke="rgba(0,0,0,.2)"
        strokeWidth="2"
        d="M0 0l25 25L50 0"
        transform="matrix(.96 0 0 1 1 1)"
      />
    </svg>
  </div>
);

export default Arrow;
