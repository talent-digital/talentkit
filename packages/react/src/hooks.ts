import { useEffect, useState } from "react";
import TalentKit, { Config } from "@talentdigital/kit";

export const useKit = ({ tenant }: Config) => {
  let pending = false;
  const [kit, setKit] = useState<TalentKit | undefined>();

  useEffect(() => {
    if (!tenant) return;
    if (!kit && !pending) {
      pending = true;
      void TalentKit.create({ tenant }).then((newKit) => {
        pending = false;
        if (newKit) setKit(newKit);
      });
    }
  }, [tenant]);

  return kit;
};
