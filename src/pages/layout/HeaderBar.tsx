import { Link } from 'react-router-dom';
import EmployeeLogin from '../EmployeeLogin';
import i18n from 'i18n';
import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';
import { languageCode } from 'models/Common.enum';

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
      <Span>
        <Link to="/login/social">Social Login</Link>
      </Span>
      <Span>
        <Link to="/signup">Sign Up</Link>
      </Span>
      <Span>
        <EmployeeLogin />
      </Span>
      <div>
        <button
          onClick={() => {
            handleChangeLanguage(languageCode.EN);
          }}
        >
          English
        </button>
        <button
          onClick={() => {
            handleChangeLanguage(languageCode.KO);
          }}
        >
          Korean
        </button>
        <div style={{ margin: '10px' }}>{t('language')}</div>
      </div>
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
