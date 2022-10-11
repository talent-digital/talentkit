import got from "got";
import { SeasonDefinition } from "@talentkit/sdk";

type SeasonInfo = Omit<SeasonDefinition, "competenceAreas">;

export const deploySeasonInfo = async (
  baseUrl: string,
  authorization: string,
  data: SeasonDefinition
) => {
  console.log("Deploying: season-info");

  const seasonInfo: SeasonInfo = {
    title: data.title,
    info: data.info,
    seasonEndMessage: data.seasonEndMessage,
    episodes: data.episodes,
  };

  try {
    await got
      .post(`${baseUrl}/api/v1/profile2/todo`, {
        headers: {
          authorization,
        },
        json: seasonInfo,
      })
      .json();

    console.log("Deploy completed: season-info\n");
  } catch (err) {
    console.log(`error while posting ${seasonInfo.title}`, err);
  }
};
