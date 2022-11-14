import { Api } from "@talentdigital/api-client";
import { AuthService } from "./auth.service";
import { SecurityDataType } from "./interfaces";

export const createApiClient = (auth?: AuthService) => {
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
