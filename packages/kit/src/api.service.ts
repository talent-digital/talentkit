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

      return Promise.resolve(new Response());
    };

    return new Api<SecurityDataType>({
      baseUrl: "",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      customFetch,
    });
  }

  const securityWorker = async (): Promise<SecurityDataType> =>
    auth
      .updateToken()
      .then(() => ({ headers: { Authorization: `Bearer ${auth.token}` } }));

  return new Api<SecurityDataType>({
    baseUrl: "",
    securityWorker,
  });
};
