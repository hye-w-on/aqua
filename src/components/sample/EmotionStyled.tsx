import styled from '@emotion/styled';

const Button = styled.button`
  border: solid 1px;
  margin: 10px;
`;

const YellowButton = styled(Button)`
  background-color: yellow;
`;

const EmotionStyledPage = () => {
  return <YellowButton>Login</YellowButton>;
};

export default EmotionStyledPage;
