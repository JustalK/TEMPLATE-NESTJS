/**
 * A payload of an app
 * */
export interface PayloadAuth {
  /**
   * The Oauth that will be use to call the protected endpoints of the app
   * */
  access_token: string;
  /**
   * This refresh token to use for refreshing the Oauth
   * */
  refresh_token: string;
}
