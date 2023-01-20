// This file was generated, do not change
export interface TalentUserRestRequestString {
  value: string;
}

export interface TalentUserRestRequestLong {
  /** @format int64 */
  value: number;
}

export interface TalentUserRestRequestBoolean {
  value: boolean;
}

export interface SignalModuleWeb {
  /** @format int64 */
  signalType?: number;
  query?: string;
}

export interface RealtimeDocumentWeb {
  docId: string;
  body: string;
  awareness?: string[];
}

export interface SingleValueApplicationConfigItemWeb {
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /**
   * @minLength 1
   * @maxLength 2147483647
   */
  value: string;
}

export interface MultiValueApplicationConfigItemWeb {
  /**
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  values: string[];
}

export interface ArticleRequest {
  /** @format int64 */
  id?: number;
  categories?: number[];
  author?: string;
  title?: string;
  created?: string;
  tags?: string[];
  teaser?: string;
  content?: string;
  draft?: boolean;
  videoFileName?: string;
  abstract?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  /** @pattern ^[a-zA-Z]{2}$ */
  locale: string;
  configureOtp?: boolean;
}

export interface MissionTargetWeb {
  /** @format int32 */
  department?: number;
  /** @format int32 */
  team?: number;
  /** @format int32 */
  function?: number;
  /** @format int32 */
  competenceArea?: number;
  /** @format int32 */
  competence?: number;
  /** @format int32 */
  subCompetence?: number;
  /** @format int32 */
  level?: number;
}

export interface MissionTargetEntityWeb {
  id?: string;
  /** @format int32 */
  department?: number;
  /** @format int32 */
  team?: number;
  /** @format int32 */
  function?: number;
  /** @format int32 */
  competenceArea?: number;
  /** @format int32 */
  competence?: number;
  /** @format int32 */
  subCompetence?: number;
  /** @format int32 */
  level?: number;
}

export interface FeedbackQuestionWeb {
  id: string;
  seasonId: string;
  episodeId: string;
  question?: string;
  answers?: string;
}

export interface CompetenceAreaRequest {
  /**
   * @format int64
   * @min 0
   */
  id: number;
  name?: string;
  competences?: CompetenceRequest[];
}

export interface CompetenceRequest {
  /**
   * @format int64
   * @min 0
   */
  id: number;
  name?: string;
  subCompetences?: SubCompetenceRequest[];
}

export interface SubCompetenceRequest {
  /**
   * @format int64
   * @min 0
   */
  id: number;
  name: string;
}

/** A more specific competence to be assessed, certified or educated. */
export interface Competence {
  /**
   * Unique ID of the competence. IDs below 1.000 allocated to talent::digital use.
   * @format int64
   * @example 10001
   */
  id: number;
  /**
   * Name of the competence as shown in the user interface.
   * @example "Software Development"
   */
  name: string;
  /**
   * Backlink to the competence area of this competence for convenience.
   * @format int64
   * @example 10001
   */
  competenceAreaId?: number;
  /** Subcompetences contained in this competence. */
  subCompetences: SubCompetence[];
  /** Flag indicating if the competence can be currently tested. */
  testsAvailable?: boolean;
}

/** A broad competence area such as professional competences, leadership competences, DigComp competences, ... */
export interface CompetenceArea {
  /**
   * Unique ID of the competence area. IDs below 1.000 allocated to talent::digital use.
   * @format int64
   * @example 10001
   */
  id: number;
  /**
   * Name of the competence area as shown in the user interface.
   * @example "Computer Science"
   */
  name: string;
  /** Competences contained in this competence area. */
  competences: Competence[];
  /** Flag indicating if the competence area can be currently tested. */
  testsAvailable?: boolean;
}

/** A detailed competence directly linked to tests. */
export interface SubCompetence {
  /**
   * Unique ID of the subcompetence. IDs below 1.000 allocated to talent::digital use.
   * @format int64
   * @example 10001
   */
  id: number;
  /**
   * Name of the subcompetence as shown in the user interface.
   * @example "Complexity"
   */
  name: string;
  /**
   * Backlink to the competence of this subcompetence for convenience.
   * @format int64
   * @example 10001
   */
  competenceId?: number;
  /** Flag indicating if the competence can be currently tested. */
  testsAvailable?: boolean;
}

export interface RealtimeDocumentEntityWeb {
  /**
   * @format int64
   * @min 0
   */
  id?: number;
  docId: string;
  body: string;
}

export interface CreateOrUpdateCertificateRequest {
  certificate: string;
  recipientName: string;
  title: string;
  description: string;
  /** @format double */
  grade: number;
}

export interface Certificate {
  certificate?: string;
  url?: string;
  recipientName?: string;
}

export interface ApplicationStateWeb {
  applicationId: string;
  state: string;
}

export interface ArticleResponse {
  /** @format int64 */
  id?: number;
  categories?: number[];
  author?: string;
  title?: string;
  created?: string;
  tags?: string[];
  teaser?: string;
  content?: string;
  draft?: boolean;
  videoFileName?: string;
  abstract?: string;
}

export interface EventCreationRequest {
  applicationId?: string;
  seasonId?: string;
  episodeId?: string;
  events: JsonNode[];
}

export type JsonNode = object;

/** A test item assesses a subcompetence at a certain level and provides one piece of evidence that the subcompetence is present at the given level. */
export interface TestItem {
  /**
   * ID of season
   * @example "season01"
   */
  seasonId: string;
  /**
   * ID of episode
   * @example "01"
   */
  episodeId: string;
  /**
   * Textual ID of the test item, matches the type of event that is generated during the test.
   * @example "programmingQuestion"
   */
  eventType: string;
  /**
   * Link to the subcompetence that this test item assesses.
   * @format int64
   * @min 0
   * @example 10001
   */
  subCompetenceId: number;
  /**
   * Defines at what level the subcompetence is assessed.
   * @example "FOUNDATION"
   */
  level: "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "HIGHLY_SPECIALISED";
  /**
   * A description of the test item shown to the user to determine criteria for passing the test.
   * @example "I successfully declared a variable."
   */
  documentation?: string;
}

export interface BadgeWeb {
  name: LocalizedStringImpl;
  image: string;
}

export interface CompetenceAreaWeb {
  name?: LocalizedStringImpl;
  competences: Record<string, CompetenceWeb>;
}

export interface CompetenceWeb {
  name?: LocalizedStringImpl;
  subCompetences: Record<string, SubCompetenceWeb>;
}

export interface EpisodeWeb {
  title: LocalizedStringImpl;
  description: LocalizedStringImpl;
  maturity: "PENDING" | "ALPHA" | "BETA" | "PUBLIC";
  imageUrl: string;
  format: string;
  formatConfiguration: string;
  badges?: Record<string, BadgeWeb>;
}

export interface LocalizedStringImpl {
  en?: string;
  de?: string;
}

export interface SearchDefinitionWeb {
  generic?: string[];
  tool?: string[];
  links?: string[];
}

export interface SeasonWeb {
  id: string;
  title: LocalizedStringImpl;
  info: LocalizedStringImpl;
  seasonEndMessage: LocalizedStringImpl;
  assetsURL: string;
  competenceAreas?: Record<string, CompetenceAreaWeb>;
  episodes?: Record<string, EpisodeWeb>;
}

export interface SubCompetenceWeb {
  name: LocalizedStringImpl;
  testItems?: Record<string, TestItemWeb>;
  feedbackQuestions?: Record<string, FeedbackQuestionWeb>;
}

export interface TestItemWeb {
  episode?: string;
  level?: "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "HIGHLY_SPECIALISED";
  documentation?: LocalizedStringImpl;
  search?: Record<string, SearchDefinitionWeb>;
}

export interface EpisodeResponseWeb {
  title?: LocalizedStringImpl;
  description?: LocalizedStringImpl;
  maturity?: "PENDING" | "ALPHA" | "BETA" | "PUBLIC";
  assetsURL?: string;
  imageUrl?: string;
  format?: string;
  formatConfiguration?: string;
  badges?: Record<string, BadgeWeb>;
  testItems?: TestItemResponse[];
  feedbackQuestions?: FeedbackQuestionResponseWeb[];
}

export interface FeedbackQuestionResponseWeb {
  id?: string;
  question?: LocalizedStringImpl;
  answers?: Record<string, LocalizedStringImpl>;
}

export interface SeasonResponseWeb {
  id?: string;
  assetsURL?: string;
  title?: LocalizedStringImpl;
  info?: LocalizedStringImpl;
  seasonEndMessage?: LocalizedStringImpl;
  episodes?: Record<string, EpisodeResponseWeb>;
}

export interface TestItemResponse {
  id?: string;
  level?: "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "HIGHLY_SPECIALISED";
  documentation?: LocalizedStringImpl;
}

export interface TagEntity {
  /** @format int64 */
  id?: number;
  name?: string;
  type?: string;
}

export interface TalentGroupEntity {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format int64 */
  talentGroupParentId?: number;
}

export interface TalentUserWeb {
  id?: string;
  name?: string;
  talentGroup?: TalentGroupEntity;
  tagItems?: TagEntity[];
  supportUser?: boolean;
}

export interface WebSignalWeb {
  /** @format int32 */
  signalType?: number;
  strength?: number;
  whoFunction?: TagEntity[];
  whoTeam?: TalentGroupEntity[];
  active?: boolean;
  dataNeeded?: boolean;
}

export interface TrainingRecommendationWeb {
  courseName?: string;
  description?: string;
  language?: string;
  providerName?: string;
  type?: "FACE_TO_FACE" | "ONLINE";
  /** @format float */
  cost?: number;
  /** @format float */
  durationHours?: number;
  url?: string;
}

export interface PlayRecommendationWeb {
  season?: string;
  episode?: string;
  /** @format int32 */
  pendingTests?: number;
}

export interface MissionProgressWeb {
  targetId?: string;
  whoScope?: "ALL" | "DEPARTMENT" | "TEAM" | "FUNCTION";
  who?: string;
  whatScope?: "ALL" | "SUB_COMPETENCE" | "COMPETENCE" | "COMPETENCE_AREA";
  what?: string;
  /** @format int32 */
  level?: number;
  initialResults?: number[];
  bestResults?: number[];
}

export interface MissionProgressIndividualWeb {
  targetId?: string;
  whoScope?: "ALL" | "DEPARTMENT" | "TEAM" | "FUNCTION";
  who?: string;
  whatScope?: "ALL" | "SUB_COMPETENCE" | "COMPETENCE" | "COMPETENCE_AREA";
  what?: string;
  /** @format int32 */
  level?: number;
  /** @format int32 */
  myProgress?: number;
  /** @format int32 */
  organizationProgress?: number;
}

export interface FeedbackAnswerWeb {
  /** @format int32 */
  id?: number;
  text?: string;
  /** @format int32 */
  value?: number;
}

export interface FeedbackStatisticsWeb {
  id?: string;
  text?: string;
  answers?: FeedbackAnswerWeb[];
}

export interface CompetenceAreaTestsDetailsWeb {
  /** @format int64 */
  competenceAreaId?: number;
  tests?: TestDetailWeb[];
}

export interface TestDetailWeb {
  /** @format int64 */
  subCompetenceId?: number;
  id?: string;
  description?: string;
  level?: "START" | "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "HIGHLY_SPECIALISED";
  episode?: string;
  /** @format int32 */
  result?: number;
}

export interface SubCompetenceTestResultWeb {
  /** @format int64 */
  subCompetenceId?: number;
  level?: "START" | "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "HIGHLY_SPECIALISED";
  /** @format int32 */
  passedTests?: number;
  /** @format int32 */
  availableTests?: number;
}

export interface TalentDailyStatisticsWeb {
  /** @format int32 */
  engagementPoints?: number;
  /** @format date */
  date?: string;
}

export interface QualificationHintWeb {
  /** @format int64 */
  subCompetenceId?: number;
  currentLevel?: "START" | "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "HIGHLY_SPECIALISED";
}

export interface PlayerTeamOrganisationComparison {
  /** @format int32 */
  available?: number;
  /** @format int32 */
  playerTried?: number;
  /** @format int32 */
  playerPassed?: number;
  /** @format int32 */
  teamTried?: number;
  /** @format int32 */
  teamPassed?: number;
  /** @format int32 */
  organisationTried?: number;
  /** @format int32 */
  organisationPassed?: number;
}

export interface CompetenceAreaTestResultReportWeb {
  /** @format int64 */
  competenceAreaId?: number;
  competenceAreaName?: string;
  /** @format int32 */
  availableTests?: number;
  /** @format int32 */
  totalTried?: number;
  /** @format int32 */
  totalPassed?: number;
}

export interface ApplicationConfigItemInfoResponse {
  name?: string;
  multiValue?: boolean;
}

export interface ProfileTwoCompanyCompetenceArea {
  /** @format int64 */
  competenceAreaId?: number;
  competenceAreaName?: string;
  /** @format int32 */
  testUserCount?: number;
  /** @format int32 */
  availableTests?: number;
  /** @format int32 */
  minTried?: number;
  /** @format double */
  medianTried?: number;
  /** @format int32 */
  maxTried?: number;
  /** @format int32 */
  minPassed?: number;
  /** @format double */
  medianPassed?: number;
  /** @format int32 */
  maxPassed?: number;
}

export interface WebTagAreaReportDTO {
  /** @format int64 */
  tagId?: number;
  tagName?: string;
  competenceAreaList?: ProfileTwoCompanyCompetenceArea[];
}

export interface CompanyNumberOfUsersStatisticsReportWeb {
  /** @format int32 */
  currentPeriodActiveUsers?: number;
  /** @format int32 */
  previousPeriodActiveUsers?: number;
  /** @format int32 */
  allRegisteredUsers?: number;
  /** @format int32 */
  currentPeriodRegisteredUsers?: number;
  /** @format int32 */
  previousPeriodRegisteredUsers?: number;
}

export interface CompanyLastCompletedEpisodesStatisticsReportWeb {
  lastCompletedEpisodes?: CompletedEpisodeStatisticsWeb[];
}

export interface CompletedEpisodeStatisticsWeb {
  /** @format int32 */
  episode?: number;
  /** @format int32 */
  numberOfUsers?: number;
}

export interface WebGeneralReportDTO {
  /**
   * Min number of tries in all competence areas
   * @format int32
   */
  minTried?: number;
  /**
   * Median of tries in all competence areas
   * @format double
   */
  medianTried?: number;
  /**
   * Max number of tries in all competence areas
   * @format int32
   */
  maxTried?: number;
  /**
   * Min number of passed tests in all competence areas
   * @format int32
   */
  minPassed?: number;
  /**
   * Median of passed tests in all competence areas
   * @format double
   */
  medianPassed?: number;
  /**
   * Max number of passed tests in all competence areas
   * @format int32
   */
  maxPassed?: number;
  /**
   * user count who took the test
   * @format int32
   */
  testUserCount?: number;
  /**
   * Sum of tests in all competence areas
   * @format int32
   */
  availableTests?: number;
}

export interface WebDepartmentAreaReportDTO {
  /** @format int64 */
  departmentId?: number;
  departmentName?: string;
  competenceAreaList?: ProfileTwoCompanyCompetenceArea[];
  childDepartments?: WebDepartmentAreaReportDTO[];
}

export interface WebAreaTestResultDTO {
  /** @format int64 */
  competenceAreaId?: number;
  competenceAreaName?: string;
  /** @format int32 */
  availableTests?: number;
  /** @format int32 */
  testUserCount?: number;
  /** @format int32 */
  minTried?: number;
  /** @format double */
  medianTried?: number;
  /** @format int32 */
  maxTried?: number;
  /** @format int32 */
  minPassed?: number;
  /** @format double */
  bestMedianPassed?: number;
  /** @format double */
  initialMedianPassed?: number;
  /** @format int32 */
  maxPassed?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title talent::digital REST APIs
 * @baseUrl 
 *
 * REST APIs for configuration and talent analytics.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  domainModelTalent = {
    /**
     * No description
     *
     * @tags Domain model: Talent
     * @name UpdateTalentUserName
     * @request PUT:/api/v1/talent/{userId}/update-name
     * @secure
     */
    updateTalentUserName: (userId: string, data: TalentUserRestRequestString, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/talent/${userId}/update-name`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Talent
     * @name UpdateTalentUserGroup
     * @request PUT:/api/v1/talent/{userId}/update-group
     * @secure
     */
    updateTalentUserGroup: (userId: string, data: TalentUserRestRequestLong, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/talent/${userId}/update-group`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Talent
     * @name UpdateTalentUserTags
     * @request PUT:/api/v1/talent/{userId}/tags
     * @secure
     */
    updateTalentUserTags: (userId: string, data: TalentUserRestRequestLong[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/talent/${userId}/tags`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint allows you to set the value of the talent's "support user" property. Test results of the talent marked as "support user" are not taken into account while generating company reports.
     *
     * @tags Domain model: Talent
     * @name UpdateTalentSupportUserFlag
     * @summary Edit talent's "support user" property
     * @request PUT:/api/v1/talent/{userId}/support
     * @secure
     */
    updateTalentSupportUserFlag: (userId: string, data: TalentUserRestRequestBoolean, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/talent/${userId}/support`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Talent
     * @name UpdateTalentUserName1
     * @request PUT:/api/v1/talent/update-name
     * @secure
     */
    updateTalentUserName1: (data: TalentUserRestRequestString, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/talent/update-name`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Talent
     * @name UpdateTalentUserGroup1
     * @request PUT:/api/v1/talent/update-group
     * @secure
     */
    updateTalentUserGroup1: (data: TalentUserRestRequestLong, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/talent/update-group`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Talent
     * @name UpdateTalentUserTags1
     * @request PUT:/api/v1/talent/tags
     * @secure
     */
    updateTalentUserTags1: (data: TalentUserRestRequestLong[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/talent/tags`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Talent
     * @name LoadTalentUser
     * @request GET:/api/v1/talent/{userId}
     * @secure
     */
    loadTalentUser: (userId: string, params: RequestParams = {}) =>
      this.request<TalentUserWeb, any>({
        path: `/api/v1/talent/${userId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Talent
     * @name LoadTalentUser1
     * @request GET:/api/v1/talent
     * @secure
     */
    loadTalentUser1: (params: RequestParams = {}) =>
      this.request<TalentUserWeb, any>({
        path: `/api/v1/talent`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  organisationAnalyticsSignals = {
    /**
     * @description This endpoint allows for the deployment of signal modules
     *
     * @tags Organisation analytics: Signals
     * @name UpsertSignalModule
     * @summary Profile 2.0 Company Signal Modules
     * @request PUT:/api/v1/signals/module
     * @secure
     */
    upsertSignalModule: (data: SignalModuleWeb, params: RequestParams = {}) =>
      this.request<SignalModuleWeb, any>({
        path: `/api/v1/signals/module`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint triggers the job that populates the signals table
     *
     * @tags Organisation analytics: Signals
     * @name ExecuteSignalsJob
     * @summary Start the Signals Population Job
     * @request POST:/api/v1/signals/populate
     * @secure
     */
    executeSignalsJob: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/signals/populate`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint returns the currently active signals
     *
     * @tags Organisation analytics: Signals
     * @name GetWebSignals
     * @summary Profile 2.0 Company Signals
     * @request GET:/api/v1/signals
     * @secure
     */
    getWebSignals: (params: RequestParams = {}) =>
      this.request<WebSignalWeb[], any>({
        path: `/api/v1/signals`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  utilitiesRealtime = {
    /**
     * @description This endpoint gets document awareness information and returns document body
     *
     * @tags Utilities: Realtime
     * @name GetRealtimeDocument
     * @summary Realtime Document
     * @request PUT:/api/v1/realtime/{docId}
     * @secure
     */
    getRealtimeDocument: (docId: string, data: string, params: RequestParams = {}) =>
      this.request<RealtimeDocumentWeb, any>({
        path: `/api/v1/realtime/${docId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint creates or updates a realtime document
     *
     * @tags Utilities: Realtime
     * @name SendRealtimeDocument
     * @summary Realtime Document
     * @request POST:/api/v1/realtime/{docId}
     * @secure
     */
    sendRealtimeDocument: (docId: string, data: string, params: RequestParams = {}) =>
      this.request<RealtimeDocumentEntityWeb, any>({
        path: `/api/v1/realtime/${docId}`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  utilitiesTenantConfiguration = {
    /**
     * @description If there is an application configuration item with the specified name, this endpoint will update it. <br> Otherwise, a new item will be added. If an existing item had multiple values it will be changed to a single-valued. <br> Admin role required.
     *
     * @tags Utilities: Tenant configuration
     * @name UpdateSingleValueConfigItem
     * @summary Update or save a configuration item with a single value.
     * @request PUT:/api/v1/config/single-value
     * @secure
     */
    updateSingleValueConfigItem: (data: SingleValueApplicationConfigItemWeb, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/config/single-value`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint adds an application configuration item with a single value. <br> Admin role required.
     *
     * @tags Utilities: Tenant configuration
     * @name SaveSingleValueConfigItem
     * @summary Add a configuration item with a single value.
     * @request POST:/api/v1/config/single-value
     * @secure
     */
    saveSingleValueConfigItem: (data: SingleValueApplicationConfigItemWeb, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/config/single-value`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description If there is an application configuration item with the specified name, this endpoint will update it. <br> Otherwise, a new item will be added. If an existing item had single value it will be changed to a multiple-valued. <br> Admin role required.
     *
     * @tags Utilities: Tenant configuration
     * @name UpdateMultiValueConfigItem
     * @summary Update or save a configuration item with multiple values.
     * @request PUT:/api/v1/config/multi-value
     * @secure
     */
    updateMultiValueConfigItem: (data: MultiValueApplicationConfigItemWeb, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/config/multi-value`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint adds an application configuration item with multiple values. <br> Admin role required.
     *
     * @tags Utilities: Tenant configuration
     * @name SaveMultiValueConfigItem
     * @summary Add a configuration item with multiple values.
     * @request POST:/api/v1/config/multi-value
     * @secure
     */
    saveMultiValueConfigItem: (data: MultiValueApplicationConfigItemWeb, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/config/multi-value`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description "This endpoint returns an application configuration item with a single value - <a href=\"#model-SingleValueConfigItemResponse\">SingleValueConfigItemResponse</a>.
     *
     * @tags Utilities: Tenant configuration
     * @name FindSingleValueConfigItem
     * @summary Get a configuration item with a single value.
     * @request GET:/api/v1/config/single-value/{name}
     * @secure
     */
    findSingleValueConfigItem: (name: string, params: RequestParams = {}) =>
      this.request<SingleValueApplicationConfigItemWeb, void>({
        path: `/api/v1/config/single-value/${name}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint returns an application configuration item with multiple values - <a href="#model-MultiValueConfigItemResponse">MultiValueConfigItemResponse</a>.
     *
     * @tags Utilities: Tenant configuration
     * @name FindMultiValueConfigItem
     * @summary Get an configuration item with multiple values.
     * @request GET:/api/v1/config/multi-value/{name}
     * @secure
     */
    findMultiValueConfigItem: (name: string, params: RequestParams = {}) =>
      this.request<MultiValueApplicationConfigItemWeb, void>({
        path: `/api/v1/config/multi-value/${name}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint returns a list of <a href="#model-ConfigItemInfoResponse">ConfigItemInfoResponse</a>. <br> Admin role required.
     *
     * @tags Utilities: Tenant configuration
     * @name FindAllConfigItems
     * @summary Get all configuration items.
     * @request GET:/api/v1/config
     * @secure
     */
    findAllConfigItems: (params: RequestParams = {}) =>
      this.request<ApplicationConfigItemInfoResponse[], any>({
        path: `/api/v1/config`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint removes an application configuration item. <br> Admin role required.
     *
     * @tags Utilities: Tenant configuration
     * @name RemoveConfigItem
     * @summary Remove a configuration item.
     * @request DELETE:/api/v1/config/{name}
     * @secure
     */
    removeConfigItem: (name: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/api/v1/config/${name}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  utilitiesArticles = {
    /**
     * @description This endpoint tries to find and return an article with id equal to the value provided as a path variable
     *
     * @tags Utilities: Articles
     * @name GetArticle
     * @summary Return article by id.
     * @request GET:/api/v1/articles/{id}
     * @secure
     */
    getArticle: (id: number, params: RequestParams = {}) =>
      this.request<ArticleResponse, any>({
        path: `/api/v1/articles/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint accepts an <a href="#web-ArticleRequest"> ArticleRequest </a> object and tries to use it in order to update article. Value of the `id` field is not taken into account - id provided as a path variable is used instead.
     *
     * @tags Utilities: Articles
     * @name UpdateArticleById
     * @summary Update article by id.
     * @request PUT:/api/v1/articles/{id}
     * @secure
     */
    updateArticleById: (id: number, data: ArticleRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/articles/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Articles
     * @name ArticleUp
     * @request PUT:/api/v1/articles/up/{id}
     * @secure
     */
    articleUp: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/articles/up/${id}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Articles
     * @name ArticleTop
     * @request PUT:/api/v1/articles/top/{id}
     * @secure
     */
    articleTop: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/articles/top/${id}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Articles
     * @name ArticleDown
     * @request PUT:/api/v1/articles/down/{id}
     * @secure
     */
    articleDown: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/articles/down/${id}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Articles
     * @name ArticleBottom
     * @request PUT:/api/v1/articles/bottom/{id}
     * @secure
     */
    articleBottom: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/articles/bottom/${id}`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint returns a list of articles. The request parameter named `drafts` allows filtering the results.
     *
     * @tags Utilities: Articles
     * @name GetArticles
     * @summary Return all articles.
     * @request GET:/api/v1/articles
     * @secure
     */
    getArticles: (
      query?: {
        drafts?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<ArticleResponse[], any>({
        path: `/api/v1/articles`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint accepts a list of <a href="#web-ArticleRequest"> ArticleRequest </a> objects and tries to use them in order to create or update articles. If value of the `id` is set it will try to find and update existing article, otherwise a new article will be created.
     *
     * @tags Utilities: Articles
     * @name SaveOrUpdateArticles
     * @summary Add or update articles.
     * @request PUT:/api/v1/articles
     * @secure
     */
    saveOrUpdateArticles: (data: ArticleRequest[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/articles`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint accepts an <a href="#web-ArticleRequest"> ArticleRequest </a> object and tries to save it. Value of the `id` field is not taken into account - it will be calculated by the database. If the operation is successful, an <a href="#model-ArticleResponse"> ArticleResponse </a> object will be returned.
     *
     * @tags Utilities: Articles
     * @name AddArticle
     * @summary Add new article.
     * @request POST:/api/v1/articles
     * @secure
     */
    addArticle: (data: ArticleRequest, params: RequestParams = {}) =>
      this.request<ArticleResponse, any>({
        path: `/api/v1/articles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint tries to find and remove articles with ids equal to the values provided as request parameters
     *
     * @tags Utilities: Articles
     * @name DeleteArticles
     * @summary Remove articles by ids.
     * @request DELETE:/api/v1/articles
     * @secure
     */
    deleteArticles: (
      query: {
        id: number[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/articles`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),
  };
  utilitiesMisc = {
    /**
     * No description
     *
     * @tags Utilities: Misc
     * @name CreateUser
     * @summary Self-registration support for new users.
     * @request POST:/api/v1/user
     * @secure
     */
    createUser: (data: CreateUserRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/user`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Send out email campaigns to participants based on an email template in SendInBlue.
     *
     * @tags Utilities: Misc
     * @name CreateCampaignUsingTemplateWithTag
     * @summary Send an email campaign.
     * @request POST:/api/v1/campaign/{templateTag}
     * @secure
     */
    createCampaignUsingTemplateWithTag: (templateTag: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/campaign/${templateTag}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Misc
     * @name GetVersion
     * @summary Get the software version.
     * @request GET:/api/v1/version
     * @secure
     */
    getVersion: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/version`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  domainModelMissions = {
    /**
     * @description This endpoint returns all targets
     *
     * @tags Domain model: Missions
     * @name GetAllTargets
     * @summary Get a target.
     * @request GET:/api/v1/missions/target
     * @secure
     */
    getAllTargets: (params: RequestParams = {}) =>
      this.request<MissionTargetEntityWeb[], any>({
        path: `/api/v1/missions/target`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint creates or updates the mission target
     *
     * @tags Domain model: Missions
     * @name CreateTarget
     * @summary Create a target.
     * @request POST:/api/v1/missions/target
     * @secure
     */
    createTarget: (data: MissionTargetWeb, params: RequestParams = {}) =>
      this.request<MissionTargetEntityWeb[], any>({
        path: `/api/v1/missions/target`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This enpoint triggers the job that populates the mission_progress table
     *
     * @tags Domain model: Missions
     * @name RunMissionsCalculationJob
     * @summary Calculate the progress.
     * @request POST:/api/v1/missions/calculate
     * @secure
     */
    runMissionsCalculationJob: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/missions/calculate`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint returns aggregated mission progress
     *
     * @tags Domain model: Missions
     * @name GetMissionsAggregatedProgress
     * @summary Get the organisation's progress on all targets.
     * @request GET:/api/v1/missions/progress
     * @secure
     */
    getMissionsAggregatedProgress: (params: RequestParams = {}) =>
      this.request<MissionProgressWeb[], any>({
        path: `/api/v1/missions/progress`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Returns mission progress for the requesting user with overall mission progress for each mission target
     *
     * @tags Domain model: Missions
     * @name GetMissionIndividualProgress
     * @summary Get your personal progress on all targets.
     * @request GET:/api/v1/missions/individual/progress
     * @secure
     */
    getMissionIndividualProgress: (params: RequestParams = {}) =>
      this.request<MissionProgressIndividualWeb[], any>({
        path: `/api/v1/missions/individual/progress`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint removes the mission target by id
     *
     * @tags Domain model: Missions
     * @name DeleteTarget
     * @summary Delete a target.
     * @request DELETE:/api/v1/missions/target/{id}
     * @secure
     */
    deleteTarget: (id: string, params: RequestParams = {}) =>
      this.request<MissionTargetEntityWeb[], any>({
        path: `/api/v1/missions/target/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  organisationAnalyticsFeedback = {
    /**
     * @description This endpoint returns all feedback questions
     *
     * @tags Organisation analytics: Feedback
     * @name GetFeedbackQuestions
     * @summary Profile 2.0 Feedback questions
     * @request GET:/api/v1/feedback-questions
     * @secure
     */
    getFeedbackQuestions: (params: RequestParams = {}) =>
      this.request<FeedbackQuestionWeb[], any>({
        path: `/api/v1/feedback-questions`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint adding new feedback question definition
     *
     * @tags Organisation analytics: Feedback
     * @name AddNewQuestion
     * @summary Profile 2.0 Feedback questions
     * @request POST:/api/v1/feedback-questions
     * @secure
     */
    addNewQuestion: (data: FeedbackQuestionWeb, params: RequestParams = {}) =>
      this.request<FeedbackQuestionWeb[], any>({
        path: `/api/v1/feedback-questions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint removes the feedback question by id
     *
     * @tags Organisation analytics: Feedback
     * @name DeleteQuestion
     * @summary Profile 2.0 Feedback questions
     * @request DELETE:/api/v1/feedback-questions
     * @secure
     */
    deleteQuestion: (
      query: {
        id: string;
        seasonId: string;
        episodeId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<FeedbackQuestionWeb[], any>({
        path: `/api/v1/feedback-questions`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint returns statistics of answers for feedback questions with questions and answers for provided language
     *
     * @tags Organisation analytics: Feedback
     * @name GetStatistics
     * @summary Profile 2.0 Feedback questions
     * @request GET:/api/v1/feedback-questions/statistics
     * @secure
     */
    getStatistics: (
      query: {
        language: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<FeedbackStatisticsWeb[], any>({
        path: `/api/v1/feedback-questions/statistics`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  domainModelCompetences = {
    /**
     * @description Returns a list of <a href="#model-CompetenceArea">CompetenceArea</a> with the currently installed competence hierarchy.
     *
     * @tags Domain model: Competences
     * @name GetCompetencesTree
     * @summary Returns the currently installed competence hierarchy.
     * @request GET:/api/v1/competences
     * @secure
     */
    getCompetencesTree: (params: RequestParams = {}) =>
      this.request<CompetenceArea[], any>({
        path: `/api/v1/competences`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Competences
     * @name AddNewCompetence
     * @summary Merge a competence hierarchy into the currently installed competence hierarchy and return the updated hierarchy.
     * @request POST:/api/v1/competences
     * @secure
     */
    addNewCompetence: (data: CompetenceAreaRequest[], params: RequestParams = {}) =>
      this.request<CompetenceArea[], any>({
        path: `/api/v1/competences`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Adds a new test item or updates an existing test item.
     *
     * @tags Domain model: Competences
     * @name CreateTestItem
     * @summary Define a test item to validate a competence level.
     * @request POST:/api/v1/test-item
     * @secure
     */
    createTestItem: (data: TestItem, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/test-item`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  domainModelCertificates = {
    /**
     * @description This endpoint returns current user's certificates
     *
     * @tags Domain model: Certificates
     * @name FindTalentCertificates
     * @summary List certificates.
     * @request GET:/api/v1/certificate
     * @secure
     */
    findTalentCertificates: (params: RequestParams = {}) =>
      this.request<Certificate[], any>({
        path: `/api/v1/certificate`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint creates new certificates or updates existing ones. If a certificate with matching name has already been assigned to current user, it will be updated. Otherwise, a new one will be created.
     *
     * @tags Domain model: Certificates
     * @name CreateOrUpdateTalentCertificates
     * @summary Create or update certificates.
     * @request POST:/api/v1/certificate
     * @secure
     */
    createOrUpdateTalentCertificates: (data: CreateOrUpdateCertificateRequest[], params: RequestParams = {}) =>
      this.request<Certificate[], any>({
        path: `/api/v1/certificate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  utilitiesAssets = {
    /**
     * No description
     *
     * @tags Utilities: Assets
     * @name AsyncS3Upload
     * @request POST:/api/v1/assets/{type}/upload
     * @secure
     */
    asyncS3Upload: (
      type: string,
      data: {
        files: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/assets/${type}/upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Assets
     * @name GetS3Video
     * @request GET:/api/v1/assets/video/{fileName}
     * @secure
     */
    getS3Video: (fileName: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format int32 */
          short?: number;
          char?: string;
          /** @format int32 */
          int?: number;
          /** @format int64 */
          long?: number;
          /** @format float */
          float?: number;
          /** @format double */
          double?: number;
          direct?: boolean;
          readOnly?: boolean;
        },
        any
      >({
        path: `/api/v1/assets/video/${fileName}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Assets
     * @name GetAllS3ObjectsFromBucket
     * @request GET:/api/v1/assets/objects
     * @secure
     */
    getAllS3ObjectsFromBucket: (
      query?: {
        defaultBucket?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<string[], any>({
        path: `/api/v1/assets/objects`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Assets
     * @name GetS3Image
     * @request GET:/api/v1/assets/image/{fileName}
     * @secure
     */
    getS3Image: (fileName: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format int32 */
          short?: number;
          char?: string;
          /** @format int32 */
          int?: number;
          /** @format int64 */
          long?: number;
          /** @format float */
          float?: number;
          /** @format double */
          double?: number;
          direct?: boolean;
          readOnly?: boolean;
        },
        any
      >({
        path: `/api/v1/assets/image/${fileName}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Assets
     * @name DeleteS3File
     * @request DELETE:/api/v1/assets/delete/{type}/{fileName}
     * @secure
     */
    deleteS3File: (type: string, fileName: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/assets/delete/${type}/${fileName}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  utilitiesSavegame = {
    /**
     * No description
     *
     * @tags Utilities: Savegame
     * @name SaveOrUpdateState
     * @request POST:/api/v1/savegame
     * @secure
     */
    saveOrUpdateState: (data: ApplicationStateWeb, params: RequestParams = {}) =>
      this.request<ApplicationStateWeb, any>({
        path: `/api/v1/savegame`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Utilities: Savegame
     * @name GetResult
     * @request GET:/api/v1/savegame/{applicationId}
     * @secure
     */
    getResult: (applicationId: string, params: RequestParams = {}) =>
      this.request<ApplicationStateWeb, any>({
        path: `/api/v1/savegame/${applicationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  domainModelEvents = {
    /**
     * @description This endpoint accepts an <a href="#web-EventCreationRequest"> EventCreationRequest </a> object and tries to save it. This object should has a valid application ID (e.g. "talentApplicationProfileTwo"). Providing at least one event in json format is mandatory. Game results in profile 2.0 is passed through "result" property of the event; "result" property of the event consists of the "id" (a string  which is test-id) and the "value" (numeric; failed=0, passed=1) properties. If test result-ID (result.id) is not already mapped to the proper sub-competence-ID, the result will not reflected in reports. (See <a href="#operations-test-item-controller-saveTestItem"> Test Item registry/update </a>).
     *
     * @tags Domain model: Events
     * @name SaveEvent
     * @summary Saving events
     * @request POST:/api/v1/event
     * @secure
     */
    saveEvent: (data: EventCreationRequest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/event`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  domainModelSeasons = {
    /**
     * @description This endpoint gets all seasons
     *
     * @tags Domain model: Seasons
     * @name GetAllSeasons
     * @summary Get all seasons
     * @request GET:/api/v1/season
     * @secure
     */
    getAllSeasons: (params: RequestParams = {}) =>
      this.request<SeasonResponseWeb[], any>({
        path: `/api/v1/season`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint adds a new season
     *
     * @tags Domain model: Seasons
     * @name AddSeason
     * @summary Add new season
     * @request POST:/api/v1/season
     * @secure
     */
    addSeason: (data: SeasonWeb, params: RequestParams = {}) =>
      this.request<SeasonResponseWeb[], any>({
        path: `/api/v1/season`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This endpoint gets a single episode by id inside a single season
     *
     * @tags Domain model: Seasons
     * @name GetEpisode
     * @summary Get episode
     * @request GET:/api/v1/season/{seasonId}/episode/{episodeId}
     * @secure
     */
    getEpisode: (seasonId: string, episodeId: string, params: RequestParams = {}) =>
      this.request<EpisodeResponseWeb, any>({
        path: `/api/v1/season/${seasonId}/episode/${episodeId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint delete episode with all badges by season id and episode id
     *
     * @tags Domain model: Seasons
     * @name DeleteEpisode
     * @summary Delete episode
     * @request DELETE:/api/v1/season/{seasonId}/episode/{episodeId}
     * @secure
     */
    deleteEpisode: (seasonId: string, episodeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/season/${seasonId}/episode/${episodeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint gets a single season by id
     *
     * @tags Domain model: Seasons
     * @name GetSeason
     * @summary Get season
     * @request GET:/api/v1/season/{id}
     * @secure
     */
    getSeason: (id: string, params: RequestParams = {}) =>
      this.request<SeasonResponseWeb, any>({
        path: `/api/v1/season/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint delete season with all episodes and badges by season id
     *
     * @tags Domain model: Seasons
     * @name DeleteSeason
     * @summary Delete season
     * @request DELETE:/api/v1/season/{seasonId}
     * @secure
     */
    deleteSeason: (seasonId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/season/${seasonId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description This endpoint delete episode with all badges by season id and episode id
     *
     * @tags Domain model: Seasons
     * @name DeleteBadge
     * @summary Delete badge
     * @request DELETE:/api/v1/season/{seasonId}/episode/{episodeId}/badge/{badgeId}
     * @secure
     */
    deleteBadge: (seasonId: string, episodeId: string, badgeId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/season/${seasonId}/episode/${episodeId}/badge/${badgeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  domainModelTalentGroup = {
    /**
     * No description
     *
     * @tags Domain model: Talent group
     * @name LoadTalentGroups
     * @request GET:/api/v1/talent-groups/by-parent/{parentGroupId}
     * @secure
     */
    loadTalentGroups: (parentGroupId: number, params: RequestParams = {}) =>
      this.request<TalentGroupEntity[], any>({
        path: `/api/v1/talent-groups/by-parent/${parentGroupId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Talent group
     * @name LoadTalentGroups1
     * @request GET:/api/v1/talent-groups/by-parent
     * @secure
     */
    loadTalentGroups1: (parentGroupId: number, params: RequestParams = {}) =>
      this.request<TalentGroupEntity[], any>({
        path: `/api/v1/talent-groups/by-parent`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  domainModelTags = {
    /**
     * No description
     *
     * @tags Domain model: Tags
     * @name LoadTagsTypes
     * @request GET:/api/v1/tags/types
     * @secure
     */
    loadTagsTypes: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/api/v1/tags/types`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Domain model: Tags
     * @name FindTagsByType
     * @request GET:/api/v1/tags/by-type/{tagType}
     * @secure
     */
    findTagsByType: (tagType: string, params: RequestParams = {}) =>
      this.request<TagEntity[], any>({
        path: `/api/v1/tags/by-type/${tagType}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  userAnalyticsRecommendations = {
    /**
     * @description Returns a list of training course recommendations based on play results
     *
     * @tags User analytics: Recommendations
     * @name GetTrainingRecommendations
     * @summary Training Recommendations.
     * @request GET:/api/v1/recommendation/training
     * @secure
     */
    getTrainingRecommendations: (params: RequestParams = {}) =>
      this.request<TrainingRecommendationWeb[], any>({
        path: `/api/v1/recommendation/training`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description Returns a list of Season, Episodes with the number of pending tests per episode which fall within the player's mission targets
     *
     * @tags User analytics: Recommendations
     * @name GetPlayRecommendations
     * @summary Play recommendations.
     * @request GET:/api/v1/recommendation/play
     * @secure
     */
    getPlayRecommendations: (params: RequestParams = {}) =>
      this.request<PlayRecommendationWeb[], any>({
        path: `/api/v1/recommendation/play`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  userAnalyticsProgressReporting = {
    /**
     * @description This endpoint returns test descriptions and results achieved by the current user. The request parameters named `season` (required) and `episode` (optional) allow filtering the results.
     *
     * @tags User analytics: Progress reporting
     * @name GetCompetenceAreaTestDetailsReports
     * @summary Profile 2.0 Test Details Report
     * @request GET:/api/v1/user-report/test-details
     * @secure
     */
    getCompetenceAreaTestDetailsReports: (
      query: {
        season: string;
        episode?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CompetenceAreaTestsDetailsWeb[], any>({
        path: `/api/v1/user-report/test-details`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns number of passed and available tests in a given season. Statistics are grouped by subCompetence id and test level.
     *
     * @tags User analytics: Progress reporting
     * @name GetSubCompetencesTestsReports
     * @summary Profile 2.0 User Sub competences Report
     * @request GET:/api/v1/user-report/sub-competence
     * @secure
     */
    getSubCompetencesTestsReports: (
      query: {
        season: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SubCompetenceTestResultWeb[], any>({
        path: `/api/v1/user-report/sub-competence`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User analytics: Progress reporting
     * @name FindTalentStatistics
     * @request GET:/api/v1/user-report/statistics
     * @secure
     */
    findTalentStatistics: (
      query?: {
        /**
         * @format int32
         * @default 28
         */
        days?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<TalentDailyStatisticsWeb[], any>({
        path: `/api/v1/user-report/statistics`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description According to the user's test results and comparing to function target or department target, user may receive some advices or recommendations. If user did not achieve to the target qualification level (for certain sub-competence), this endpoint returns recommendation list. If user is in the same level as the target qualification, this endpoint returns advice list for improvement, otherwise the result of the endpoint will be an empty JSON array. This endpoint accepts one mandatory 'type' parameter which just accepts 'advice' or 'recommendation' as value. The result is a list of pairs contains sub-competence and current level of user in that sub-competence (target for this competences can be obtained via other endpoint).
     *
     * @tags User analytics: Progress reporting
     * @name GetProfileTwoQualificationAdvices
     * @summary Profile 2.0 Qualification improvement advices
     * @request GET:/api/v1/user-report/qualifications/{type}
     * @secure
     */
    getProfileTwoQualificationAdvices: (type: "ADVICE" | "RECOMMENDATION", params: RequestParams = {}) =>
      this.request<QualificationHintWeb[], any>({
        path: `/api/v1/user-report/qualifications/${type}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns the player's tried & passed tests, the most tried and passed tests in the player's team and the most tried and passed tests in the whole organisation.
     *
     * @tags User analytics: Progress reporting
     * @name GetPlayerTeamOrganisationComparisonReport
     * @summary Profile 2.0 Test Score Comparison
     * @request GET:/api/v1/user-report/compare
     * @secure
     */
    getPlayerTeamOrganisationComparisonReport: (params: RequestParams = {}) =>
      this.request<PlayerTeamOrganisationComparison, any>({
        path: `/api/v1/user-report/compare`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns a high-level report for test results of current user. If user is not attended in game and did not passed any test, all values in all 5 Competence areas are zero.
     *
     * @tags User analytics: Progress reporting
     * @name GetCompetenceAreaTestResults
     * @summary Profile 2.0 User Report
     * @request GET:/api/v1/user-report
     * @secure
     */
    getCompetenceAreaTestResults: (params: RequestParams = {}) =>
      this.request<CompetenceAreaTestResultReportWeb[], any>({
        path: `/api/v1/user-report`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  organisationAnalyticsReport = {
    /**
     * @description This endpoint returns list of Tags for specified type with its related competence areas.
     *
     * @tags Organisation analytics: Report
     * @name GetProfileTwoTagCompetenceAreas
     * @summary Profile 2.0 Company Tag (Function) report
     * @request GET:/api/v1/company-report/tag-area/{tagType}
     * @secure
     */
    getProfileTwoTagCompetenceAreas: (tagType: string, params: RequestParams = {}) =>
      this.request<WebTagAreaReportDTO[], any>({
        path: `/api/v1/company-report/tag-area/${tagType}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns the total number of registered users, the number of users who actively played the game in current and previous period, and the number user who created an account in current and previous period.<br> Admin role required.
     *
     * @tags Organisation analytics: Report
     * @name GetCompanyNumberOfUsersStatistics
     * @summary Company statistics report
     * @request GET:/api/v1/company-report/number-of-users
     * @secure
     */
    getCompanyNumberOfUsersStatistics: (params: RequestParams = {}) =>
      this.request<CompanyNumberOfUsersStatisticsReportWeb, any>({
        path: `/api/v1/company-report/number-of-users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns information about the last completed episodes in a given season.<br> Admin role required.
     *
     * @tags Organisation analytics: Report
     * @name GetCompanyLastCompletedEpisodeStatistics
     * @summary Company statistics report - last completed episodes
     * @request GET:/api/v1/company-report/last-completed-episodes
     * @secure
     */
    getCompanyLastCompletedEpisodeStatistics: (
      query: {
        season: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CompanyLastCompletedEpisodesStatisticsReportWeb, any>({
        path: `/api/v1/company-report/last-completed-episodes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns aggregated test result of company. Notice that users who are already in a department (has talent-group-id) will be counted in statistics.
     *
     * @tags Organisation analytics: Report
     * @name GetProfileTwoGeneralReport
     * @summary Profile 2.0 Company general test result report
     * @request GET:/api/v1/company-report/general
     * @secure
     */
    getProfileTwoGeneralReport: (params: RequestParams = {}) =>
      this.request<WebGeneralReportDTO, any>({
        path: `/api/v1/company-report/general`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns list of departments and in every department object, there is a list of competence areas containing statistics of that department. This statistics is aggregated from sub-departments and statistics of test results those are directly in current department (if exists any user in current department).Any depth of department hierarchy is traversed by the algorithm to generate result. This endpoint accepts user in all levels of department. If no user was connected directly to department (at any level), that department has no effect on statistics.
     *
     * @tags Organisation analytics: Report
     * @name GetProfileTwoDepartmentAreas
     * @summary Profile 2.0 Company Departments report
     * @request GET:/api/v1/company-report/department-area
     * @secure
     */
    getProfileTwoDepartmentAreas: (params: RequestParams = {}) =>
      this.request<WebDepartmentAreaReportDTO[], any>({
        path: `/api/v1/company-report/department-area`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description This endpoint returns a high-level report of the test results for the all users in the company who are attended in tests. Normally users who are not attended in game will not taken into account in report calculations.
     *
     * @tags Organisation analytics: Report
     * @name GetCompanyCompetenceAreaTestResults
     * @summary Profile 2.0 Company Report
     * @request GET:/api/v1/company-report
     * @secure
     */
    getCompanyCompetenceAreaTestResults: (params: RequestParams = {}) =>
      this.request<WebAreaTestResultDTO[], any>({
        path: `/api/v1/company-report`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
