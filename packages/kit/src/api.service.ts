import { Api } from "@talentdigital/api-client";
import { IAuthService, SecurityDataType } from "./interfaces";

export const createApiClient = (auth: IAuthService) => {
  const securityWorker = async (): Promise<SecurityDataType> => {
    await auth.updateToken();
    return { headers: { Authorization: `Bearer ${auth.token}` } };
  };

  return new Api<SecurityDataType>({ baseUrl: "", securityWorker });
};
