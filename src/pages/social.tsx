import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import sessionApi from '../api/session';
import { SessionInfo, setSessionInfo } from '../utils/SessionUtil';

const SocialRedirectHandler = () => {
  const { socialPlatform } = useParams();
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get('code');

  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const { successOrNot, statusCode, data } = await sessionApi.socialLogin(socialPlatform ?? '', authCode ?? '');

      if (successOrNot === 'Y') {
        const sessionInfo: SessionInfo = { ...data };
        console.log('sessionInfo', sessionInfo);
        setSessionInfo(sessionInfo);

        navigate('/login', { replace: true });
      } else if (successOrNot === 'N' && statusCode === 'NOT_MEMBER_AND_SIGN_UP') {
        console.log('data: ', data);
        navigate('/signup', { replace: true, state: data });
      }
    };

    getUserInfo();
  }, []);

  return <>...Loading</>;
};

export default SocialRedirectHandler;
