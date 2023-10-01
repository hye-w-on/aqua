import styled from 'styled-components';

const Button = styled.button`
  border: solid 1px;
  margin: 10px;
`;

const YellowButton = styled(Button)`
  background-color: yellow;
`;

const StyledComponentPage = () => {
  return <YellowButton>Login</YellowButton>;
};

export default StyledComponentPage;
