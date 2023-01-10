import { useEffect, useState } from "react";
import TalentKit, { Config } from "@talentdigital/kit";

export const create = <T = unknown>(config: Config) => {
  const [kit, setKit] = useState<TalentKit<T> | undefined>();
  let pending = false;

  useEffect(() => {
    if (!kit && !pending) {
      pending = true;
      void TalentKit.create<T>(config).then((newKit) => {
        pending = false;
        if (newKit) setKit(newKit);
      });
    }
  }, [config]);

  return () => kit;
};
