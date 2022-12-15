import {
  EpisodeResponseWeb,
  LocalizedStringImpl,
} from "@talentdigital/api-client";
import { applicationId } from ".";
import { ApiClient, FeedbackQuestions, ID } from "./interfaces";

class FeedbackQuestion {
  private constructor(
    readonly id: string,
    readonly question: LocalizedStringImpl,
    readonly answers: Record<string, Record<string, string>>,
    private api: ApiClient,
    private seasonId: string,
    private episodeId: string
  ) {}

  static async createForEpisode(
    id: ID,
    info: EpisodeResponseWeb,
    api: ApiClient
  ): Promise<FeedbackQuestions> {
    if (!info?.feedbackQuestions) {
      return {};
    }

    return Object.fromEntries(
      info.feedbackQuestions.map((question) => {
        return [
          question.id,
          new FeedbackQuestion(
            question.id as string,
            question.question as LocalizedStringImpl,
            question.answers as Record<string, Record<string, string>>,
            api,
            id.season,
            id.episode
          ),
        ];
      })
    );
  }

  /**
   * Submit the feedback question
   * @param selectedAnswer string
   * @returns
   */
  submit(selectedAnswer: string) {
    const events = [
      {
        eventTypeId: this.id,
        type: "decision.choose",
        payload: {
          decision: this.id,
          option: {
            id: selectedAnswer,
          },
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
