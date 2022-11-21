import { Api } from "@talentdigital/api-client";
import { AuthService } from "./auth.service";
import { SecurityDataType } from "./interfaces";

export const createApiClient = ({
  auth,
  customFetch,
}: {
  auth?: AuthService;
  customFetch?: Api<SecurityDataType>["customFetch"];
}) => {
  if (customFetch) {
    return new Api<SecurityDataType>({
      baseUrl: "",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      customFetch,
    });
  }

  if (!auth) throw "Either auth or custom fetch need to be defined";

  const securityWorker = async (): Promise<SecurityDataType> =>
    auth
      .updateToken()
      .then(() => ({ headers: { Authorization: `Bearer ${auth.token}` } }));

  return new Api<SecurityDataType>({
    baseUrl: "",
    securityWorker,
  });
};
