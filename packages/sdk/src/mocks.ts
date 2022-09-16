import { KeycloakConfig, KeycloakPromise, KeycloakError } from "keycloak-js";
import { Options, ResponsePromise } from "ky";
import { KyInstance } from "ky/distribution/types/ky";
import { Input } from "ky/distribution/types/options";
import { AuthClient, HttpClient } from "./interfaces";
import ky from "ky";

export class MockKeycloak implements AuthClient {
  constructor(config: KeycloakConfig) {
    // We could protect the endpoint
    this.config = config;
  }
  private config: KeycloakConfig;

  init() {
    return Promise.resolve(true) as unknown as KeycloakPromise<
      boolean,
      KeycloakError
    >;
  }

  login() {
    return Promise.resolve(true) as unknown as KeycloakPromise<void, void>;
  }

  updateToken() {
    return Promise.resolve(true) as unknown as KeycloakPromise<
      boolean,
      boolean
    >;
  }
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
