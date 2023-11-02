import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button, { ButtonProps } from '@mui/material/Button';

export const StyledButton = styled(Button)``;

//const BasicButton: React.FC<ButtonProps> = ({ children }) => { //react/prop-types Lint error
export const BasicButton = (props: ButtonProps) => {
  return (
    <StyledButton variant="contained" size="small" {...props}>
      {props.children}
    </StyledButton>
  );
};

export const ActionSmailButton = (props: ButtonProps) => {
  return (
    <StyledActionSmailButton variant="outlined" size="small" {...props}>
      {props.children}
    </StyledActionSmailButton>
  );
};

const StyledActionSmailButton = styled(Button)`
  min-width: 0px;
  padding: 5px;
  margin: 1px;
`;
