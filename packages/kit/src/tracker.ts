import { KeycloakTokenParsed } from "keycloak-js";
import LogRocket from "logrocket";

class Tracker {
  private logRocket: typeof LogRocket;
  constructor(
    logRocketId: string,
    userInfo: KeycloakTokenParsed,
    playerName: string
  ) {
    LogRocket.init(logRocketId);
    if (userInfo.sub) {
      LogRocket.identify(userInfo.sub, { name: playerName });
    }
    this.logRocket = LogRocket;
  }
  track(event: string) {
    this.logRocket.track(event);
  }
}

export default Tracker;
