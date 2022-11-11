import { KyInstance } from "ky/distribution/types/ky";
import Keycloak, { KeycloakConfig } from "keycloak-js";
import Badge from "./badge";
import Test from "./test";
import { Api } from "@talentdigital/api-client";

export interface Config {
  tenant: string;
  testMode?: boolean;
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

export interface State {
  sid?: string;
  eid?: string;
  redirectUrl?: string;
}

export type Badges = Record<Badge["id"], Badge>;

export type Tests = Record<Test["id"], Test>;

export interface IApiService {
  request: (url: string, method: "get" | "post", options?: any) => Promise<any>;
}

export interface IAuthService {
  token: string;
  updateToken: () => void;
}

export interface SecurityDataType {
  headers: {
    Authorization: string;
  };
}

export type ApiClient = Api<SecurityDataType>;

export interface Profile {
  companyLogo: string;
  companyName: string;
  companyURL: string;
  id: string;
  leadingColor: string;
  playerAvatar: string;
  playerEmailAddress: string;
  playerName: string;
}