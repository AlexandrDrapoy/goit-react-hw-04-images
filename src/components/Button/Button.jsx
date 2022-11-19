import React from 'react';
export const Button = props => (
  <button type="button" onClick={props.onClick} className="Button">
    {props.children}
  </button>
);
