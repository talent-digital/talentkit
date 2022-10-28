import { useEffect, useState } from "react";
import { AppConfig } from "@talentdigital/sdk/src/interfaces";
import TdSdk from "@talentdigital/sdk";

export const useTdSdk = ({ auth }: AppConfig) => {
  let pending = false;
  const [kit, setKit] = useState<TdSdk | undefined>();

  useEffect(() => {
    if (!kit && !pending) {
      pending = true;
      TdSdk.create({ auth }).then((newKit) => {
        pending = false;
        if (newKit) setKit(newKit);
      });
    }
  }, [kit]);

  return kit;
};
