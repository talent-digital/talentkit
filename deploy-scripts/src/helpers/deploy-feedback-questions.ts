import got from "got";
import { SeasonDefinition } from "@talentkit/sdk";

interface FeedbackQuestion {
  id: string;
  question: {
    en?: string;
    de?: string;
  };
  answers: {
    id: string;
    en?: string;
    de?: string;
  }[];
}

export const deployFeedbackQuestions = async (
  baseUrl: string,
  authorization: string,
  data: SeasonDefinition["competenceAreas"]
) => {
  console.log("Deploying: feedback-questions");

  const feedbackQuestions = extractFeedbackQuestions(data);

  for (const feedbackQuestion of feedbackQuestions) {
    try {
      await got
        .post(`${baseUrl}/api/v1/profile2/feedback-questions`, {
          headers: {
            authorization,
          },
          json: {
            id: feedbackQuestion.id,
            question: JSON.stringify(feedbackQuestion.question),
            answers: JSON.stringify(feedbackQuestion.answers),
          },
        })
        .json();

      console.log("Deploy completed: feedback-questions\n");
    } catch (err) {
      console.log(`error while posting ${feedbackQuestion.id}`, err);
      continue;
    }
  }
};

const extractFeedbackQuestions = (
  competenceAreas: SeasonDefinition["competenceAreas"]
): FeedbackQuestion[] | null => {
  return Object.values(competenceAreas).flatMap((area) => {
    return Object.values(area.competences).flatMap((competence) => {
      return Object.keys(competence.subCompetences).flatMap(
        (subCompetenceKey) => {
          const subCompetence = competence.subCompetences[subCompetenceKey];

          return Object.keys(subCompetence.feedbackItems).map(
            (feedbackItemKey) => {
              const feedbackItem = subCompetence.feedbackItems[feedbackItemKey];

              return {
                id: feedbackItem.id,
                question: feedbackItem.question,
                answers: Object.keys(feedbackItem.answers).map((key) => ({
                  id: key,
                  en: feedbackItem.answers[key].en,
                  de: feedbackItem.answers[key].de,
                })),
              };
            }
          );
        }
      );
    });
  });
};
