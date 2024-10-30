import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import sessionApi from '../rest-api/session';
import { SessionStorageInfo, setSessionStorageInfo } from '../utils/sessionStorageUtil';
import { SocialSessionResponse } from 'models/Session';

const SocialRedirectHandler = () => {
  const { socialPlatform } = useParams();
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get('code');

  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await sessionApi.socialLogin(socialPlatform ?? '', authCode ?? '');

      if (response.successOrNot === 'Y' && response.data) {
        const sessionStorageInfo: SocialSessionResponse = response.data;
        console.log('Login success: sessionInfo:', sessionStorageInfo);
        setSessionStorageInfo(sessionStorageInfo);

        //navigate('/', { replace: true });
      } else if (response.successOrNot === 'N' && response.statusCode === 'NOT_MEMBER_AND_SIGN_UP') {
        console.log('member profile data: ', response.data);
        navigate('/signup', { replace: true, state: response.data });
      }
    };

    getUserInfo();
  }, []);

  return <>...Loading</>;
};

export default SocialRedirectHandler;
