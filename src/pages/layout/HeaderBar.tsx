import { Link } from 'react-router-dom';
import EmployeeLogin from '../EmployeeLogin';
import { BasicButton } from '../../components/Button';
import styled from '@emotion/styled';

const HeaderBar = () => {
  return (
    <>
      <Span>
        <Link to="/login/social">Social login</Link>
      </Span>
      <Span>
        <Link to="/signup">signup</Link>
      </Span>
      <Span>
        <EmployeeLogin />
      </Span>
      <hr />
    </>
  );
};

export default HeaderBar;

const Span = styled.span`
  margin: 10px;
  vertical-align: middle;
  //border: 1px solid black;
`;
