import { applicationId, savegameKey } from ".";
import { ApiClient, ID, SavegameStorage } from "./interfaces";
import StorageService from "./storage.service";

class Events {
  constructor(
    private api: ApiClient,
    private storage: StorageService,
    private id: ID
  ) {}

  /**
   * @description Mark the episode as completed and return to the dashboard
   */
  async end() {
    const events = [
      {
        eventTypeId: "episode.end",
        season: this.id.season,
        episode: this.id.episode,
      },
    ];

    await this.api.domainModelEvents.saveEvent({ applicationId, events });

    let savegames = this.storage.getItem<SavegameStorage>(savegameKey) || {};

    const season = savegames[this.id.season] || {};

    const episode = season[this.id.episode] || {};

    const playcount = episode.playcount || 0;

    savegames = {
      ...savegames,
      [this.id.season]: {
        ...season,
        [this.id.episode]: {
          ...episode,
          playcount: playcount + 1,
        },
      },
    };

    this.storage.setItem<SavegameStorage>(savegameKey, savegames);

    this.navigateToDashboard();
  }

  /**
   * Navigate the user beck to the dashboard.
   */
  pause() {
    this.navigateToDashboard();
  }

  private navigateToDashboard() {
    if (this.id.redirectUrl) {
      window.location.assign(this.id.redirectUrl);
    } else {
      console.error("No redirect URL hasn't been set");
      window.close();
    }
  }
}

export default Events;
