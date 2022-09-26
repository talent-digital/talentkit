import cliProgress from "cli-progress";
import got from "got";

export interface FeedbackQuestion {
  question: {
    en: string;
    de: string;
  };
  answers: {
    id: number;
    en: string;
    de: string;
  }[];
}

interface FeebackSomething {
  id: string;
  question: any;
  answers: any;
}

export const deployFeedbackQuestions = async (
  baseUrl: string,
  authorization: string,
  data: any // SeasonDefinition["competenceAreas"]
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

const extractFeedbackQuestions = (competenceAreas: any): FeebackSomething[] => {
  return Object.values(competenceAreas).flatMap((area: any) => {
    return Object.values(area.competences).flatMap((competence: any) => {
      return Object.keys(competence.subCompetences).flatMap(
        (subCompetenceKey: any) => {
          const subCompetence = competence.subCompetences[subCompetenceKey];

          return Object.keys(subCompetence.feedbackItems).map(
            (feedbackItemKey) => {
              const feedbackItem = subCompetence.feedbackItems[feedbackItemKey];

              return {
                id: feedbackItemKey, // TODO: should this be more unique?
                question: feedbackItem.question,
                answers: feedbackItem.answers,
              };
            }
          );
        }
      );
    });
  });
};
