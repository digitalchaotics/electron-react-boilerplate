// @flow

export default class Auth {
  apiKey: string;
  secret: string;

  constructor(apiKey: string, secret: string) {
    this.apiKey = apiKey;
    this.secret = secret;
  }
}
