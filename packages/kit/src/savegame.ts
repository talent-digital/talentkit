import { ID, SeasonsStorage } from "./interfaces";
import StorageService from "./storage.service";

const seasonsKey = "SEASONS";

class Savegame {
  constructor(private id: ID, private storage: StorageService) {}

  load() {
    const data = this.storage.getItem<SeasonsStorage>(seasonsKey);
    if (!data) return {};

    if (data[this.id.season]) {
      return data[this.id.season][this.id.episode];
    }
  }

  save(payload: unknown) {
    let data = this.storage.getItem<SeasonsStorage>(seasonsKey) || {};

    data = {
      ...data,
      [this.id.season]: {
        ...data[this.id.season],
        [this.id.episode]: payload,
      },
    };
    this.storage.setItem(seasonsKey, data);
  }
}

export default Savegame;
