import { EpisodeWeb } from "@talentdigital/api-client";
import { ApiClient, ID } from "./interfaces";

class Episode {
  private constructor(readonly id: string, private api: ApiClient) {}

  static async getForEpisode(id: ID, api: ApiClient): Promise<EpisodeWeb> {
    const { data } = await api.domainModelSeasons.getEpisode(
      id.season,
      id.episode
    );

    console.log("getForEpisode", data);

    return data;
  }
}

export default Episode;
