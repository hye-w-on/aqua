import { callApi, CommonResponse, Method, Service } from "../utils/ApiUtil";

const sessionApi = {
  socialLogin: async (
    socialPlatform: string,
    authCode: string
  ): Promise<CommonResponse<any>> => {
    return callApi({
      service: Service.AQUA_BE,
      url: `/v1/session/social`,
      method: Method.POST,
      bodyParams: {
        socialPlatform: socialPlatform,
        authCode: authCode,
      },
    });
  },
};

export default sessionApi;
