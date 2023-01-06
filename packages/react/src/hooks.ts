import { useEffect, useState } from "react";
import TalentKit, { Config } from "@talentdigital/kit";

export const useKit = <T = unknown>({ tenant }: Config) => {
  let pending = false;
  const [kit, setKit] = useState<TalentKit<T> | undefined>();

  useEffect(() => {
    if (!tenant) return;
    if (!kit && !pending) {
      pending = true;
      void TalentKit.create<T>({ tenant }).then((newKit) => {
        pending = false;
        if (newKit) setKit(newKit);
      });
    }
  }, [tenant]);

  return kit;
};
