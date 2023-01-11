import { atom, useAtom } from "jotai";
import TalentKit, { Config } from "@talentdigital/kit";

const kitAtom = atom<TalentKit<unknown> | undefined>(undefined);

let pending = false;

export const useKit = <T = Record<string, unknown>,>(config?: Config) => {
  const [kit, setKit] = useAtom(kitAtom);

  if (!kit && !pending) {
    if (config) {
      pending = true;
      void TalentKit.create<T>(config).then((newKit) => {
        pending = false;
        setKit(newKit);
      });
    }
  }

  return kit as TalentKit<T> | undefined;
};
