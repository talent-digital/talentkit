import { useEffect, useState } from "react";
import TalentKit, { Config } from "@talentdigital/kit";

export const useKit = <T = unknown>(config?: Config) => {
  const [kit, setKit] = useState<TalentKit<T> | undefined>();
  let pending = false;

  useEffect(() => {
    if (!kit && !pending) {
      if (!config) throw new Error("The kit must be created with config");
      pending = true;
      void TalentKit.create<T>(config).then((newKit) => {
        pending = false;
        if (newKit) setKit(newKit);
      });
    }
  }, [config]);

  return kit;
};
