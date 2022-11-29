/**
 * Configuration of a season in talent::digital.
 */
export interface SeasonDefinition {
  /**
   * The title of the season.
   */
  title: LocalizedString;

  /**
   * A description of what the season is about.
   */
  info: LocalizedString;

  /**
   * The URL where the assets for this season can be accesed.
   */
  assetsURL: URL;

  /**
   * The competences that this season addresses in the talent::digital competence model.
   * The ID identifies the competence and should be globally unique.
   */
  competenceAreas: { [id in string]: CompetenceArea };

  /**
   * The episodes (learning modules) to verify the competences.
   * The ID can be simply e.g. "01", "02", ...
   * It permits rearranging episodes in a season without loosing any previously generated data from players.
   */
  episodes: { [id in string]: EpisodeDefinition };

  /**
   * A rewarding message to the player when they finish the season.
   */
  seasonEndMessage: LocalizedString;
}

/**
 * A competence area is a broad educational subject, such as security, compliance etc.
 * All competence areas of all seasons published in a tenant are merged into a competence model
 * that is shown to users. Competence areas and competences may be reused across seasons.
 */
export interface CompetenceArea {
  /**
   * The name of the competence area as shown in the user interface.
   */
  name?: LocalizedString;

  /**
   * The more detailed competences in this competence area.
   */
  competences: { [id in string]: Competence };
}

/**
 * The more detailed competences in a competence area. E.g. "IT security" in the security competence area.
 */
export interface Competence {
  /**
   * The name of the competence as shown in the user interface.
   */
  name?: LocalizedString;

  /**
   * The granular sub competences that are actually tested.
   */
  subCompetences: { [id in string]: SubCompetence };
}

/**
 * A sub competence is actually tested by talent::digital test items. E.g., "Password security" in the "IT security" competence.
 */
export interface SubCompetence {
  /**
   * The name of the subcompetence as shown in the user interface.
   */
  name?: LocalizedString;

  /**
   * The tests to validate the subcompetence.
   */
  testItems?: { [id in string]: TestItem };

  /**
   * Attitude-related questions towards the subcompetence.
   */
  feedbackItems?: { [id in string]: FeedbackItem };
}

/**
 * Test items are tests executed in talent::digital episodes as evidence that a user possesses a certain subcompetence.
 */
export interface TestItem {
  /**
   * The difficulty level of the test item.
   */
  level: Level;

  /**
   * The id of the episode where this test-item is executed
   */
  episode: string;

  /**
   * A text describing the action required for the test.
   */
  documentation: LocalizedString;

  /**
   * A search specification for finding educational material around the test and the subcompetence.
   */
  search: LocalizedSearchDefinition;

  /**
   * The type of tool that is used for the test. E.g., "chat" or "video-conferencing".
   * This tool is matched against the tools configured by the administrator for the organization.
   */
  toolType?: ToolType;
}

/**
 * The available difficulty levels of tests.
 */
export enum Level {
  Foundation = "BEGINNER",
  Intermediate = "INTERMEDIATE",
  Advanced = "ADVANCED",
}

/**
 * The available tool types that can be configured in the user interface.
 */
export enum ToolType {
  videoConference = "video-conference",
  chat = "chat",
  chatbot = "chatbot",
  calendarServices = "calendar-services",
  projectCollaboration = "project-collaboration",
  crm = "crm",
  documentCreation = "document-creation",
}

/**
 * A search specification for finding educational material for a topic depending on the language of the user.
 */
export type LocalizedSearchDefinition = {
  [key in LanguageCode]: SearchDefinition;
};

/**
 * A search specification for finding educational material for a topic in a particular language.
 */
export interface SearchDefinition {
  /**
   * A list of search queries to find education material.
   */
  generic?: string[];

  /**
   * A list of tool-specific search queries to find education material. These search queries get the user-configured tool added.
   */
  tool?: string[];

  /**
   * A list of links with known education material.
   */
  links?: string[];
}

/**
 * Attitude-related questions towards the subcompetence.
 */
export interface FeedbackItem {
  /**
   * The id of the episoed in which this feedback item is used
   */
  episode: string;
  /**
   * The question text
   */
  question: LocalizedString;
  /**
   * The possible answers
   */
  answers: { [id in string]: LocalizedString };
}

/**
 * An episode of a season in talent::digital. An episode is a learning module of typically 5-20 minutes duration
 * that tests some of the subcompetences in the season and offers learning material for failed tests.
 */
export interface EpisodeDefinition {
  /**
   * The title of the episode as shown in the user interface.
   */
  title: LocalizedString;

  /**
   * The description of the episode as shown in the user interface.
   */
  description: LocalizedString;

  /**
   * The development status of the episode.
   * This determines if the episode can be accessed by players generally in the user interface, or only through specific URLs.
   */
  maturity: Maturity;

  /**
   * The URL of an SVG preview image for the episode shown in the user interface.
   */
  imageUrl: URL;

  /**
   * The URL of the app that is run when the user runs the episode.
   */
  format: URL;

  /**
   * The URL of a configuration file that is passed to the app when it is run, e.g., to set up quiz questions.
   */
  formatConfiguration: URL;

  /**
   * Badges that can be obtained by playing the episode.
   */
  badges?: { [id in string]: Badge };
}

/**
 * A badge is an award for "special performance" that can be given to the user.
 * It is shown in the "Badges" tab to the user.
 */
export interface Badge {
  /**
   * The text that is shown with the badge.
   */
  name: LocalizedString;

  /**
   * The URL of an image representing the badge.
   */
  image: URL;
}

/**
 * The maturity of the episode.
 * * "pending": Still under development.
 * * "alpha": Ready for alpha testing (e.g., first guided testing to determine usability issues).
 * * "beta": Ready for beta testing (e.g., unguided testing to determine test item differentiation).
 * * "public": Generally available for anyone to play it, if it has been unlocked by the administrator of the organisation.
 */
export enum Maturity {
  Pending = "pending",
  Alpha = "alpha",
  Beta = "beta",
  Public = "public",
}

/**
 * Language codes used for internationalised strings.
 */
export enum LanguageCode {
  de = "de",
  en = "en",
}

/**
 * Localized strings represent text that is available in multiple languages.
 * The user is shown text in their language, if the text in their language is configured;
 * otherwise they see the text in the configured language, if only one language is configured;
 * otherwise they see the text in the reference language ("de"?).
 */
export type LocalizedString = { [key in LanguageCode]: string | undefined };

/**
 * A URL to an asset or app. The URL is either relative to the current repository or
 * absolute to an already deployed asset or app.
 */
export type URL = string;
