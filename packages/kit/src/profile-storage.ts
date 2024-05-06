import { ApiClient } from "./interfaces";
import RemoteStorage from "./remote-storage";
import StorageService from "./storage.service";

interface Profile {
  leadingColor?: string;
  playerAvatar?: string;
  playerName?: string;
}

const defaultProfile: Required<Profile> = {
  leadingColor: "#d3e553",
  playerAvatar: "/avatars/avatar5.svg",
  playerName: "Teammitglied",
};

const PROFILE_KEY = "profile";

class ProfileStorage {
  private storage: StorageService | null = null;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  get playerName(): string {
    return (
      this.storage?.getItem<Profile>(PROFILE_KEY)?.playerName ||
      defaultProfile.playerName
    );
  }

  get playerAvatar(): string {
    return (
      this.storage?.getItem<Profile>(PROFILE_KEY)?.playerAvatar ||
      defaultProfile.playerAvatar
    );
  }

  get leadingColor(): string {
    return (
      this.storage?.getItem<Profile>(PROFILE_KEY)?.leadingColor ||
      defaultProfile.leadingColor
    );
  }

  get profile(): Profile {
    return this.storage?.getItem<Profile | null>(PROFILE_KEY) || defaultProfile;
  }

  static async init(apiClient: ApiClient) {
    const storage = new StorageService(
      await RemoteStorage.create(apiClient, "talentkit")
    );

    if (!storage.getItem(PROFILE_KEY)) {
      storage.setItem(PROFILE_KEY, defaultProfile);
    }

    return new ProfileStorage(storage);
  }

  update(profile: Profile) {
    this.storage?.setItem(PROFILE_KEY, profile);
  }
}

export default ProfileStorage;
