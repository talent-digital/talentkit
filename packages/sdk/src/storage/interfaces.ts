export interface UserProfile {
  id: string;
  companyName: string;
  companyUrl: string;
  companyLogo: string;
  playerName: string;
  playerAvatar: string;
  leadingColor: string;
  playerEmailAddress: string;
}

export interface DBStore {
  applicationId: string;
  state: string;
}
