import { useEffect, useState } from "react";
import { Config } from "@talentdigital/kit/src/interfaces";
import TalentKit from "@talentdigital/kit";

export const useTdSdk = ({ tenant }: Config) => {
  let pending = false;
  const [kit, setKit] = useState<TalentKit | undefined>();

  useEffect(() => {
    if (!kit && !pending) {
      pending = true;
      void TalentKit.create({ tenant }).then((newKit) => {
        pending = false;
        if (newKit) setKit(newKit);
      });
    }
  }, [kit]);

  return kit;
};
