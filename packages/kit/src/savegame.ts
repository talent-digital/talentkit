import { savegameKey } from ".";
import { ID, SavegameStorage } from "./interfaces";
import StorageService from "./storage.service";

class Savegame {
  constructor(private id: ID, private storage: StorageService) {}

  load(): unknown {
    const savegames = this.storage.getItem<SavegameStorage>(savegameKey);
    if (!savegames) return null;

    const seasonStorage = savegames[this.id.season];
    if (!seasonStorage) return null;

    const episodeStorage = seasonStorage[this.id.episode];
    if (!episodeStorage) return null;

    return episodeStorage.savegame;
  }

  save(savegame: unknown) {
    let savegames = this.storage.getItem<SavegameStorage>(savegameKey) || {};

    savegames = {
      ...savegames,
      [this.id.season]: {
        ...(savegames[this.id.season] || {}),
        [this.id.episode]: {
          ...(savegames[this.id.season]?.[this.id.episode] || {}),
          savegame,
        },
      },
    };
    this.storage.setItem(savegameKey, savegames);
  }
}

export default Savegame;
