import React from "react";

import logo from '../assets/logo.png';

export function Logo(props) {
  const { logoStyle, title } = props;
  return (
    <figure className={logoStyle && logoStyle.logoContainer}>
      <img src={logo} alt="logo" className={logoStyle && logoStyle.logo} />
      {title && <figcaption>RECEIPT TRACKER</figcaption>}
    </figure>
  )
}