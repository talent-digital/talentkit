import { Options, ResponsePromise } from "ky";
import { KyInstance } from "ky/distribution/types/ky";
import { Input } from "ky/distribution/types/options";
import {
  AuthConfig,
  HttpClient,
  IApiService,
  IAuthService,
} from "./interfaces";
import ky from "ky";
import { KeycloakRole } from "./auth.service";
import Keycloak from "keycloak-js";

export class MockAuthService implements IAuthService {
  private constructor() {}
  token = "";
  updateToken = () => {};

  static async create() {
    return new MockAuthService();
  }

  userHasRole = (role: KeycloakRole): boolean => {
    return true;
  };

  getUser = () => {
    return {};
  };

  getUserFullname = (): string => {
    return "TestUser";
  };

  getUserEmail = (): string => {
    return "testuser@test.com";
  };
}

export const mockKy: HttpClient = {
  create: (options: Options): KyInstance => {
    const http = ky.create(options);

    return http;
  },

  get: (url: Input, options?: Options | undefined): ResponsePromise => {
    return false as unknown as ResponsePromise;
  },

  post: (url: Input, options?: Options | undefined): ResponsePromise => {
    return false as unknown as ResponsePromise;
  },
};

export const mockApiService: IApiService = {
  request: () => Promise.resolve({}),
};
