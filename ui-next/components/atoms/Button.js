import React from 'react';
import { ButtonStyles } from './ButtonStyles';

const Button = React.forwardRef(({ children, href, onClick, target }, ref) => (
  <ButtonStyles
    ref={ref}
    href={href}
    onClick={onClick ? onClick : null}
    target={target ? target : null}
    as="a"
  >
    {children}
  </ButtonStyles>
));

export default Button;
