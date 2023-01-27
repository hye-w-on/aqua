import { useParams, useSearchParams } from "react-router-dom";

const SocialRedirectHandler = () => {
  const { socialType } = useParams();

  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  return <>...Loading</>;
};

export default SocialRedirectHandler;
