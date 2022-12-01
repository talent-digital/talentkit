import { Api } from "@talentdigital/api-client";
import Keycloak, { KeycloakConfig } from "keycloak-js";
import Badge from "./badge";
import FeedbackQuestion from "./feedback-question";
import { SeasonDefinition } from "./season";
import Test from "./test";

export interface Config {
  tenant?: string;
  seasonDefinition?: SeasonDefinition;
  id?: ID;
  logRocketId?: string;
}

export type AuthConfig = KeycloakConfig;

export interface UserInfo {
  sub: string;
  email?: string;
  name?: string;
  preferred_username?: string;
  locale?: string;
}

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

export interface ID {
  season: string;
  episode: string;
  redirectUrl?: string;
}

export type Badges = Record<Badge["id"], Badge>;

export type Tests = Record<Test["id"], Test>;

export type FeedbackQuestions = Record<
  FeedbackQuestion["id"],
  FeedbackQuestion
>;

export interface SecurityDataType {
  headers: {
    Authorization: string;
  };
}

export type ApiClient = Api<SecurityDataType>;

export interface ProfileStorage {
  companyLogo: string;
  companyName: string;
  id: string;
  leadingColor: string;
  playerAvatar: string;
  playerEmailAddress: string;
  playerName: string;
}

export interface EngagementPointsStorage {
  points: number;
  openedArticles: string[];
  ratedArticles: string[];
  date: Date;
  linksOpened: Record<string, string[]>;
}

export type SeasonsStorage = Record<string, Record<string, unknown>>;

export type BadgesStorage = string[];
