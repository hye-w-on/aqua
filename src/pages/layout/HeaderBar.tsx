import { Link } from 'react-router-dom';
import EmployeeLogin from '../EmployeeLogin';
import i18n from 'i18n';
import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';
import { languageCode } from 'models/Common.enum';
import { BasicButton } from 'components/Button';

const HeaderBar = () => {
  const { t } = useTranslation();

  const handleChangeLanguage = (lang: languageCode) => {
    // 서버로부터 다국어 json을 받아서 i18n에 추가하는 Case
    //i18n.addResourceBundle(response.languageCode, 'translation', response.translatedMessages);
    //i18n.changeLanguage(lang);
    //i18n.reloadResources();
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <BasicButton>
        <Link to="/login/social">Social Login</Link>
      </BasicButton>
      <BasicButton>
        <Link to="/signup">Sign Up</Link>
      </BasicButton>
      <EmployeeLogin />
      <BasicButton
        onClick={() => {
          handleChangeLanguage(languageCode.EN);
        }}
      >
        English
      </BasicButton>
      <BasicButton
        onClick={() => {
          handleChangeLanguage(languageCode.KO);
        }}
      >
        Korean
      </BasicButton>
      <Span style={{ margin: '10px' }}>{t('language')}</Span>
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
