import { KyInstance } from "ky/distribution/types/ky";
import Keycloak, { KeycloakConfig } from "keycloak-js";

export interface AppConfig {
  auth: AuthConfig;
  testMode?: boolean;
  processUrl?: boolean;
}

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
  | "login"
  | "init"
  | "onTokenExpired"
  | "updateToken"
  | "token"
  | "tokenParsed"
  | "onAuthSuccess"
  | "updateToken"
>;

export interface AppState {
  sid?: string;
  eid?: string;
  redirectUrl?: string;
}
