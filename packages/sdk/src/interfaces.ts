import { KyInstance } from "ky/distribution/types/ky";
import Keycloak, { KeycloakConfig } from "keycloak-js";

export type AuthConfig = KeycloakConfig;

export interface UserInfo {
  sub: string;
  email?: string;
  name?: string;
  preferred_username?: string;
  locale?: string;
}

export type HttpClient = Pick<KyInstance, "create" | "get" | "post">;
export type AuthClient = Pick<
  Keycloak,
  "login" | "init" | "onTokenExpired" | "updateToken" | "token"
>;
