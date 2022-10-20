import { useEffect, useState } from "react";
import { AuthConfig } from "@talentdigital/sdk/src/interfaces";
import TdSdk from "@talentdigital/sdk";

export const useTdSdk = ({ realm, url, clientId }: AuthConfig) => {
  let pending = false;
  const [kit, setKit] = useState<TdSdk | undefined>();

  useEffect(() => {
    if (!kit && !pending) {
      pending = true;
      TdSdk.create({ realm, url, clientId }).then((newKit) => {
        pending = false;
        if (newKit) setKit(newKit);
      });
    }
  }, [kit]);

  return kit;
};
