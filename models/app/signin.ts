import { SigninRequestPayload } from '../api';
import { GetDataError } from 'restful-react';

export interface ISigninState {
  isAuthenticating?: boolean;
  authError?: GetDataError<string[]>;
}

export interface ISigninActions {
  signin: (payload: SigninRequestPayload) => void;
  signout: () => void;
}
