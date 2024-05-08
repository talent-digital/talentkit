import { TalentUserProfileRequestWeb } from "@talentdigital/api-client";
import { ApiClient } from "./interfaces";

class Profile {
  public data: TalentUserProfileRequestWeb;

  constructor(
    private api: ApiClient,
    profile: TalentUserProfileRequestWeb
  ) {
    this.api = api;
    this.data = profile;
  }

  static async init(apiClient: ApiClient) {
    const { data: user } = await apiClient.domainModelTalent.loadTalentUser1({
      format: "json",
    });
    const profile: TalentUserProfileRequestWeb = {
      avatarName: user.avatarName,
      avatarImage: user.avatarImage,
      avatarLeadingColor: user.avatarLeadingColor,
    };

    return new Profile(apiClient, profile);
  }

  async update(profile: TalentUserProfileRequestWeb) {
    await this.api.domainModelTalent.updateTalentUserProfile(profile);
  }
}

export default Profile;
