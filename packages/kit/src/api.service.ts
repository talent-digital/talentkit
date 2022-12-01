import { Api } from "@talentdigital/api-client";
import { AuthService } from "./auth.service";
import { getBaseUrl } from "./helpers";
import { SecurityDataType } from "./interfaces";

export const createApiClient = ({
  auth,
  tenant,
  customFetch,
}: {
  auth?: AuthService;
  tenant?: string;
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
  if (!tenant) throw "Tenant must be defined if no customFetch is provided";

  const baseUrl = getBaseUrl(tenant);

  const securityWorker = async (): Promise<SecurityDataType> =>
    auth
      .updateToken()
      .then(() => ({ headers: { Authorization: `Bearer ${auth.token}` } }));

  return new Api<SecurityDataType>({
    baseUrl,
    securityWorker,
  });
};
