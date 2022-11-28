import React from 'react';
import { ButtonOnClick } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick, children }) => (
  <ButtonOnClick type="button" onClick={onClick}>
    {children}
  </ButtonOnClick>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
