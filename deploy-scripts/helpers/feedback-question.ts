import cliProgress from "cli-progress";
import { constants } from "fs";
import { access, readdir, readFile } from "fs/promises";
import got from "got";
import { join } from "path";
import { parse } from "yaml";

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

export const deployFeedbackQuestions = async (
  baseUrl: string,
  seasonId: string,
  authorization: string
) => {
  const path = join("season", seasonId, "feedback-question");

  try {
    await access(path, constants.R_OK);

    const feedbackQuestionFiles = await readdir(path);

    if (feedbackQuestionFiles.length === 0) return;

    console.log("Deploying feedback-questions\n");

    const multibar = new cliProgress.MultiBar(
      {
        clearOnComplete: false,
        hideCursor: true,
        format: `{bar} {episode}    {id}`,
      },
      cliProgress.Presets.shades_classic
    );

    const bars = {};

    for (const feedbackQuestionFile of feedbackQuestionFiles) {
      const data = parse(
        await readFile(join(path, feedbackQuestionFile), "utf-8")
      ) as Record<string, FeedbackQuestion>;

      const episode = feedbackQuestionFile.replace(".yml", "");

      bars[episode] = multibar.create(Object.keys(data).length, 0, {
        episode,
        id: "",
      });

      for (const [id, { question, answers }] of Object.entries(data)) {
        await got
          .post(`${baseUrl}/api/v1/profile2/feedback-questions`, {
            headers: {
              authorization,
            },
            json: {
              id: `${episode}.${id}`,
              question: JSON.stringify(question),
              answers: JSON.stringify(answers),
            },
          })
          .json();

        bars[episode].increment({ id });
      }
    }
    multibar.stop();
  } catch (err) {
    console.log(`Season ${seasonId} has no feedback-questions`);
  }
};
