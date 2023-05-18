export interface IPersoanlToken {
  personalAccessToken: string;
}
export interface IRefreshToken {
  refreshToken: string;
}

export interface ISignUpForm {
  account: string;
  password: string;
  serverKey: string;
}

export interface ILoginForm {
  account: string;
  password: string;
}
