import { EmployeeLoginRequest, EmployeeSession, SocialSessionResponse } from 'models/Session';
import { MemberProfile } from '../models/Member';
import { callRestApi, RestApiResponse, Method, Service } from '../utils/RestApiUtil';

const sessionApi = {
  socialLogin: async (socialPlatform: string, authCode: string): Promise<RestApiResponse<SocialSessionResponse>> => {
    return callRestApi({
      service: Service.AQUA_BE,
      url: `/v1/session/social`,
      method: Method.POST,
      body: {
        socialPlatform: socialPlatform,
        authCode: authCode,
      },
    });
  },

  employeeLogin: async (employeeLoginRequest: EmployeeLoginRequest): Promise<RestApiResponse<EmployeeSession>> => {
    return callRestApi({
      service: Service.AQUA_BE,
      url: `/v1/http-session/employee`,
      method: Method.POST,
      body: {
        ...employeeLoginRequest,
        languageCode: 'ko', //TODO
      },
    });
  },

  getEmployeeSession: async (): Promise<RestApiResponse<EmployeeSession>> => {
    return callRestApi({
      service: Service.AQUA_BE,
      url: `/v1/http-session/employee`,
      method: Method.GET,
    });
  },

  checkHttpSessionScope: async () => {
    return callRestApi({
      service: Service.AQUA_BE,
      url: `/v1/http-session/scope`,
      method: Method.GET,
    });
  },

  memberSignUp: async (memberProfile: MemberProfile): Promise<RestApiResponse<any>> => {
    return callRestApi({
      service: Service.AQUA_BE,
      url: '/v1/member',
      method: Method.POST,
      body: memberProfile,
    });
  },
};

export default sessionApi;
