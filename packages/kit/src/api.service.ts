import { Api } from "@talentdigital/api-client";
import { IAuthService, SecurityDataType } from "./interfaces";

export const createApiClient = (auth?: IAuthService) => {
  if (!auth) {
    const customFetch: Api<SecurityDataType>["customFetch"] = async (
      input: RequestInfo | URL,
      init?: RequestInit
    ) => {
      console.log(input);
      console.log(init);

      return new Response();
    };

    return new Api<SecurityDataType>({
      baseUrl: "",
      customFetch,
    });
  }

  const securityWorker = async (): Promise<SecurityDataType> => {
    await auth.updateToken();
    return { headers: { Authorization: `Bearer ${auth.token}` } };
  };

  return new Api<SecurityDataType>({
    baseUrl: "",
    securityWorker,
  });
};
