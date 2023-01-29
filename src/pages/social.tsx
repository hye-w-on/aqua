import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SessionUtil, { SessionInfo } from "../utils/SessionUtil";

const SocialRedirectHandler = () => {
  const { socialType } = useParams();
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  let navigate = useNavigate();
  const sessionUtil = new SessionUtil();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getInfo = async () => {
    const loginRequest = {
      socialTypeCode: socialType,
      authCode: authCode,
    };

    const { successOrNot, statusCode, data } = {};
    //await sessionApi.socialLogin(loginRequest);

    if (successOrNot === "Y") {
      const sessionInfo: SessionInfo = { ...data };

      sessionUtil.setSessionInfo(sessionInfo);

      navigate("/login", { replace: true });
    } else if (successOrNot === "N" && statusCode === "USER_NOT_FOUND") {
      navigate("/singup", { replace: true });
    }
  };

  useEffect(() => {
    if (authCode) {
      getInfo();
    }
  }, [authCode, getInfo]);

  return <>...Loading</>;
};

export default SocialRedirectHandler;
