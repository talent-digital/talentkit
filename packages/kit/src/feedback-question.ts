import {
  EpisodeResponseWeb,
  LocalizedStringImpl,
} from "@talentdigital/api-client";
import { applicationId } from ".";
import { ApiClient, FeedbackOption, FeedbackQuestions, ID } from "./interfaces";

class FeedbackQuestion {
  private constructor(
    readonly id: string,
    readonly question: LocalizedStringImpl,
    readonly answers: Record<string, Record<string, string>>,
    private api: ApiClient,
    private seasonId: string,
    private episodeId: string
  ) {}

  static createForEpisode(
    { season, episode }: ID,
    info: EpisodeResponseWeb,
    api: ApiClient
  ): FeedbackQuestions {
    if (!info?.feedbackQuestions) {
      return {};
    }

    return Object.fromEntries(
      info.feedbackQuestions.map(({ id, question, answers }) => {
        return [
          id,
          new FeedbackQuestion(
            id as string,
            question as LocalizedStringImpl,
            answers as Record<string, Record<string, string>>,
            api,
            season,
            episode
          ),
        ];
      })
    ) as FeedbackQuestions;
  }

  /**
   * Submit the feedback question
   * @param option {id: number, text: string}
   * @returns
   */
  submit(option: FeedbackOption) {
    const events = [
      {
        eventTypeId: this.id,
        type: "decision.choose",
        payload: {
          decision: this.id,
          option,
        },
      },
    ];

    return this.api.domainModelEvents.saveEvent({
      applicationId,
      events,
      seasonId: this.seasonId,
      episodeId: this.episodeId,
    });
  }
}

export default FeedbackQuestion;
