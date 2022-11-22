import { applicationId } from ".";
import { ApiClient, FeedbackQuestions, ID } from "./interfaces";

class FeedbackQuestion {
  private constructor(
    readonly id: string,
    readonly question: string,
    readonly answers: string,
    private api: ApiClient
  ) {}

  static async createForEpisode(
    id: ID,
    api: ApiClient
  ): Promise<FeedbackQuestions> {
    const { data } =
      await api.organisationAnalyticsFeedback.getFeedbackQuestions();
    if (!data || !data.length) return {};

    return Object.fromEntries(
      data.map(({ id, question, answers }) => {
        if (!question || !answers) throw "Question or answers missing";
        return [id, new FeedbackQuestion(id, question, answers, api)];
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
        eventTypeId: "season2episode2.videochatQuestion",
        type: "decision.choose",
        payload: {
          decision: "videochatQuestion",
          option: {
            id: selectedAnswer,
          },
        },
      },
    ];

    return this.api.domainModelEvents.saveEvent({
      applicationId,
      events,
    });
  }
}

export default FeedbackQuestion;
