import { EpisodeResponseWeb } from "@talentdigital/api-client";
import { ApiClient, ID } from "./interfaces";

class Episode {
  private constructor() {}

  static async getForEpisode(
    id: ID,
    api: ApiClient
  ): Promise<EpisodeResponseWeb> {
    const data = await (
      await api.domainModelSeasons.getEpisode(id.season, id.episode)
    ).json();

    return data;
  }
}

export default Episode;
