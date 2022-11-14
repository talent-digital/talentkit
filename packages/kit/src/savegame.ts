import { ID } from "./interfaces";
import Storage from "./storage.service";

const seasonsKey = "SEASONS";

class Savegame {
  constructor(private id: ID, private storage: Storage) {}

  load() {
    const s = this.storage.getItem(seasonsKey);
    if (s[this.id.season]) {
      return s[this.id.season][this.id.episode];
    }
  }

  save(payload: any) {
    let s = this.storage.getItem(seasonsKey);
    s = {
      ...s,
      [this.id.season]: {
        ...s[this.id.season],
        [this.id.episode]: payload,
      },
    };
    this.storage.setItem(seasonsKey, s);
  }
}

export default Savegame;
