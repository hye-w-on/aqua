const Login = () => {
  const kakaoOauthUri = process.env.REACT_APP_KAKAO_OAUTH_URI;
  const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = `${process.env.REACT_APP_REDIRECT_URI}/kakao`;

  const naverOauthUri = process.env.REACT_APP_NAVER_OAUTH_URI;
  const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const naverRedirectUri = `${process.env.REACT_APP_REDIRECT_URI}/naver`;

  const KAKAO_AUTH_URL = `${kakaoOauthUri}?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code`;
  const NAVER_AUTH_URL = `${naverOauthUri}?response_type=code&client_id=${naverClientId}&redirect_uri=${naverRedirectUri}`;

  return (
    <>
      <div>
        <a href={KAKAO_AUTH_URL}>KAKAO LOGIN</a>
      </div>
      <div>
        <a href={NAVER_AUTH_URL}>NAVER LOGIN</a>
      </div>
    </>
  );
};

export default Login;
