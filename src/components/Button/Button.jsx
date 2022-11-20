import React from 'react';
import { ButtonOnClick } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = props => (
  <ButtonOnClick type="button" onClick={props.onClick}>
    {props.children}
  </ButtonOnClick>
);

Button.prototype = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
