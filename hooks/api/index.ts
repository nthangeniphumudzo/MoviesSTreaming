import { UseSigninSigninProps, UseSignupCustomerProps, UseSignupAdministatorProps } from 'generated';

import { useMutate } from 'restful-react';

import { AccessToken, SigninRequestPayload, SignupRequestPayload } from 'models';

export const useSigninSignin = (props: UseSigninSigninProps) =>
  useMutate<AccessToken, string[], void, SigninRequestPayload>('POST', `/api/Signin`, props);
export const useSignupCustomer = (props: UseSignupCustomerProps) =>
  useMutate<string, string[], void, SignupRequestPayload>('POST', `/api/Signup/customer`, props);
export const useSignupAdministator = (props: UseSignupAdministatorProps) =>
  useMutate<string, string[], void, SignupRequestPayload>('POST', `/api/Signup/administrator`, props);
//export const useVideosGetVideos = (props: UseVideosGetVideosProps) => useGet<[], unknown, void>(`/api/Videos`props);
