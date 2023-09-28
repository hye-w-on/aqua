export enum SessionStorage {
  ID_TOKEN = 'idToken',
  NICKNAME = 'nickname',
}

export interface SessionInfo {
  idToken?: string;
  nickname?: string;
}

export const getSessionInfo = (): SessionInfo => {
  let sessionInfo: SessionInfo = {} as SessionInfo;
  sessionInfo = {
    idToken: sessionStorage.getItem(SessionStorage.ID_TOKEN) ?? '',
    nickname: sessionStorage.getItem(SessionStorage.NICKNAME) ?? '',
  };
  return sessionInfo;
};

export const setSessionInfo = (sessionInfo: SessionInfo): void => {
  for (const [key, value] of Object.entries(sessionInfo)) {
    sessionStorage.setItem(key, value ?? '');
  }
};
