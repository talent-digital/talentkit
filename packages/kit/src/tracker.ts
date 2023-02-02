/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { KeycloakTokenParsed } from "keycloak-js";

export interface TrackerConfig {
  logRocketId: string;
  userInfo: KeycloakTokenParsed;
  playerName: string;
}
class Tracker {
  private logRocket;
  private constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LogRocket: any,
    { logRocketId, userInfo, playerName }: TrackerConfig
  ) {
    LogRocket.init(logRocketId);
    if (userInfo.sub) {
      LogRocket.identify(userInfo.sub, { name: playerName });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.logRocket = LogRocket;
  }
  static async create(config: TrackerConfig) {
    const { default: LogRocket } = await import("logrocket");
    return new Tracker(LogRocket, config);
  }

  track(event: string) {
    this.logRocket.track(event);
  }
}

export default Tracker;
