import React from "react";

import logo from '../assets/logo.png';

export function Logo(props) {
  const { logoStyle } = props;
  return (
    <figure className={logoStyle.logoContainer}>
      <img src={logo} alt="logo" className={logoStyle.logo} />
      <figcaption>RECEIPT TRACKER</figcaption>
    </figure>
  )
}