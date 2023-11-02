import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button, { ButtonProps } from '@mui/material/Button';
//icon
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export const StyledButton = styled(Button)``;

//const BasicButton: React.FC<ButtonProps> = ({ children }) => { //react/prop-types Lint error
export const BasicButton = (props: ButtonProps) => {
  return (
    <StyledButton variant="contained" size="small" {...props}>
      {props.children}
    </StyledButton>
  );
};

export const ActionButton = (props: ButtonProps) => {
  return (
    <StyledActionButton variant="outlined" size="small" {...props}>
      {props.children}
    </StyledActionButton>
  );
};

const StyledActionButton = styled(Button)`
  min-width: 0px;
  padding: 5px;
  margin: 1px;
`;

export const ActionDeleteButton = (props: ButtonProps) => {
  return (
    <StyledActionDeleteButton variant="outlined" size="small" {...props}>
      <DeleteForeverRoundedIcon />
    </StyledActionDeleteButton>
  );
};
const StyledActionDeleteButton = styled(Button)`
  min-width: 0px;
  padding: 1px;
  margin: 1px;
`;
