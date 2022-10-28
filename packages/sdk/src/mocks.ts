import { Options, ResponsePromise } from "ky";
import { KyInstance } from "ky/distribution/types/ky";
import { Input } from "ky/distribution/types/options";
import { AuthConfig, HttpClient } from "./interfaces";
import ky from "ky";
import { KeycloakRole } from "./auth.service";
import Keycloak from "keycloak-js";

export class MockAuthService {
  private constructor() {}

  static async create(_: AuthConfig, _1: () => any) {
    const auth = new Keycloak();

    return new MockAuthService();
  }

  createHttp = (): HttpClient => ky.create({});

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

  private updateServiceWorker = async () => {};
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
