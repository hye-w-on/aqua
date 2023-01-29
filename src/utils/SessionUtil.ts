export enum SessionStorage {
  ID_TOKEN = "idToken",
  NICKNAME = "nickname",
}

export interface SessionInfo {
  idToken?: string;
  nickname?: string;
}

export default class SessionUtil {
  public getSessionInfo = (): SessionInfo => {
    let sessionInfo: SessionInfo = {} as SessionInfo;
    sessionInfo = {
      idToken: sessionStorage.getItem(SessionStorage.ID_TOKEN) ?? "",
      nickname: sessionStorage.getItem(SessionStorage.NICKNAME) ?? "",
    };
    return sessionInfo;
  };

  public setSessionInfo = (sessionInfo: SessionInfo): void => {
    for (const [key, value] of Object.entries(sessionInfo)) {
      sessionStorage.setItem(key, value ?? "");
    }
  };
}
