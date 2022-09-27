import cliProgress from "cli-progress";
import got from "got";
import { SeasonDefinition } from "./SeasonDefinition";

interface FeedbackQuestion {
  id: string;
  question: {
    en?: string;
    de?: string;
  };
  answers: {
    id: number;
    en?: string;
    de?: string;
  }[];
}

export const deployFeedbackQuestions = async (
  baseUrl: string,
  authorization: string,
  data: SeasonDefinition["competenceAreas"]
) => {
  console.log("Deploying feedback-questions\n");

  const episode = "season-episode"; // TODO
  const feedbackQuestions = extractFeedbackQuestions(data);

  const multibar = new cliProgress.MultiBar(
    {
      clearOnComplete: false,
      hideCursor: true,
      format: `{bar} {episode}    {id}`,
    },
    cliProgress.Presets.shades_classic
  );

  const bars = {};

  bars[episode] = multibar.create(Object.keys(data).length, 0, {
    episode,
    id: "",
  });

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
    } catch (err) {
      console.log(`error while posting ${feedbackQuestion.id}`, err);
      continue;
    } finally {
      bars[episode].increment({ id: feedbackQuestion.id });
    }
  }

  multibar.stop();
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
                id: feedbackItemKey, // TODO: should this be more unique?
                question: feedbackItem.question,
                answers: Object.values(feedbackItem.answers).map(
                  (answer, index) => ({
                    id: index, // TODO
                    en: answer.en,
                    de: answer.de,
                  })
                ),
              };
            }
          );
        }
      );
    });
  });
};
