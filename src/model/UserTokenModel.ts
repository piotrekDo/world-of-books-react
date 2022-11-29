export interface UserTokenModel {
  accessToken: string;
  accessTokenExpiresAt: string;
  roles: string[];
  username: string;
  adult: boolean;
}
