import { ID } from "./interfaces";

const seasonsKey = "SEASONS";

class Savegame {
  constructor(private id: ID, private storage: Storage) {}

  load() {
    const s = this.storage.getItem(seasonsKey);
    if (!s) return {};

    const data = JSON.parse(s);

    if (data[this.id.season]) {
      return data[this.id.season][this.id.episode];
    }
  }

  save(payload: unknown) {
    const s = this.storage.getItem(seasonsKey);

    let data = s ? JSON.parse(s) : {};

    data = {
      ...data,
      [this.id.season]: {
        ...data[this.id.season],
        [this.id.episode]: payload,
      },
    };
    this.storage.setItem(seasonsKey, JSON.stringify(data));
  }
}

export default Savegame;
