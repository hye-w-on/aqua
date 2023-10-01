import { MemberProfile } from '../models/Member';
import { callApi, RestApiResponse, Method, Service } from '../utils/RestApiUtil';

const sessionApi = {
  socialLogin: async (socialPlatform: string, authCode: string): Promise<RestApiResponse<any>> => {
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

  socialSignUp: async (memberProfile: MemberProfile): Promise<RestApiResponse<any>> => {
    return callApi({
      service: Service.AQUA_BE,
      url: '/v1/member',
      method: Method.POST,
      bodyParams: memberProfile,
    });
  },
};

export default sessionApi;
