import { useEffect, useState } from "react";
import TalentKit, { Config } from "@talentdigital/kit";

export const create =
  <T = unknown>(config: Config) =>
  () => {
    let pending = false;
    const [kit, setKit] = useState<TalentKit<T> | undefined>();

    useEffect(() => {
      if (!kit && !pending) {
        pending = true;
        void TalentKit.create<T>(config).then((newKit) => {
          pending = false;
          if (newKit) setKit(newKit);
        });
      }
    }, [config]);

    return kit;
  };
