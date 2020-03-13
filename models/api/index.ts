import { MutateProps } from 'restful-react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface SigninRequestPayload {
  username: string;
  password: string;
}

export type UserType = 'CUSTOMER' | 'ADMINISTRATOR';

export interface AccessToken {
  value: string;
  expiry: string;
  type: UserType;
}

export interface SignupRequestPayload {
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
}
export interface UploadPayload {
  genre: string;
  image: File;
  movie: File;
}

export type SigninSigninProps = Omit<MutateProps<AccessToken, string[], void, SigninRequestPayload>, 'path' | 'verb'>;
