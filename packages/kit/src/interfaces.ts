import { Api } from "@talentdigital/api-client";
import { KeycloakConfig, KeycloakInstance } from "keycloak-js";
import Badge from "./badge";
import FeedbackQuestion from "./feedback-question";
import { SeasonDefinition } from "@talentdigital/season";
import Test from "./test";
import { supportedExtensions } from "./helpers";

export interface Config {
  tenant?: string;
  localBackendURL?: string;
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
  KeycloakInstance,
  | "login"
  | "init"
  | "onTokenExpired"
  | "updateToken"
  | "token"
  | "tokenParsed"
  | "onAuthSuccess"
>;

export interface ID {
  season: string;
  episode: string;
  redirectUrl?: string;
  configUrl?: string;
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

export type EpisodeStorage = {
  playcount: number;
  savegame: unknown;
};

export type SeasonStorage = Record<string, EpisodeStorage>;

export type SavegameStorage = Record<string, SeasonStorage>;

export type BadgesStorage = string[];

export type SupportedExtensions = (typeof supportedExtensions)[number];

export interface FeedbackOption {
  id: number;
  text: string;
}
