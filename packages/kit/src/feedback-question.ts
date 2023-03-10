import { EpisodeWeb, LocalizedString } from "@talentdigital/api-client";
import { applicationId } from ".";
import { ApiClient, FeedbackQuestions, ID } from "./interfaces";

class FeedbackQuestion {
  private constructor(
    readonly id: string,
    readonly question: LocalizedString,
    readonly answers: Record<string, LocalizedString>,
    private api: ApiClient,
    private seasonId: string,
    private episodeId: string
  ) {}

  static createForEpisode(
    { season, episode }: ID,
    info: EpisodeWeb,
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
            question as LocalizedString,
            answers as Record<string, LocalizedString>,
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
  submit(id: string) {
    const localized = this.answers[id];
    if (!localized) {
      console.log("Invalid answer id");
      return;
    }
    const text = JSON.stringify(localized);
    const events = [
      {
        eventTypeId: this.id,
        type: "decision.choose",
        payload: {
          decision: this.id,
          option: { id, text },
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
