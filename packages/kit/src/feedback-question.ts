import { EpisodeWeb, LocalizedString } from "@talentdigital/api-client";
import { ApiClient, FeedbackQuestions, ID } from "./interfaces";
import LogRocket from "logrocket";

class FeedbackQuestion {
  private constructor(
    readonly id: string,
    readonly question: LocalizedString,
    readonly answers: Record<string, LocalizedString>,
    private api: ApiClient,
    private seasonId: string,
    private episodeId: string,
    private savegameKeyId: string
  ) {}

  static createForEpisode(
    { season, episode }: ID,
    info: EpisodeWeb,
    api: ApiClient,
    savegameKeyId: string
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
            episode,
            savegameKeyId
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
      console.error("Invalid answer id");
      LogRocket.captureException(new Error(`Invalid answer id: ${id}`));
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
      applicationId: this.savegameKeyId,
      events,
      seasonId: this.seasonId,
      episodeId: this.episodeId,
    });
  }
}

export default FeedbackQuestion;
