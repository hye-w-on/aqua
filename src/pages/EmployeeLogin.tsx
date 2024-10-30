import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sessionApi from '../rest-api/session';
import { getEmployeesApi } from '../rest-api/employeeApi';
import { EmployeeLoginRequest } from 'models/Session';
import i18n from 'i18n';
import { BasicButton } from 'components/Button';
import BasicInput from 'components/Input';

const EmployeeLogin = () => {
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState<string>('admin');

  const handleLogin = async () => {
    const employeeLoginRequest = {
      employeeId: employeeId,
    };
    const response = await sessionApi.employeeLogin(employeeLoginRequest);
    if (response.successOrNot === 'Y' && response?.data) {
      const session = response.data;
      i18n.changeLanguage(session.languageCode || 'ko');
      //setSession(session);
      //navigate('/', { replace: true });
      console.log('Login Success', session);
    } else {
      console.log('Login Fail');
    }
  };

  return (
    <>
      <BasicInput
        value={employeeId}
        onChange={(e) => {
          setEmployeeId(e.target.value);
        }}
      />
      <BasicButton onClick={handleLogin}>Employee Login</BasicButton>
    </>
  );
};

export default EmployeeLogin;
