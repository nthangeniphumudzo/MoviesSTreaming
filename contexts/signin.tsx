import { createContext, PropsWithChildren, useState, useEffect, useContext } from 'react';
import { AccessToken, ISigninState, ISigninActions } from 'models';
import { ACCESS_TOKEN_NAME } from 'app-constants';
import { useSigninSignin } from '../hooks';

const AccessTokenContext = createContext<AccessToken>(undefined);
const SigninStateContext = createContext<ISigninState>(undefined);
const SigninActionsContext = createContext<ISigninActions>(undefined);

export function SigninProvider(props: PropsWithChildren<{}>) {
  const [accessToken, setAccessToken] = useState<AccessToken>(null);
  const { mutate: signin, error: authError, loading: isAuthenticating } = useSigninSignin({});
  // access token to and fro session storage
  useEffect(() => {
    if (!accessToken) {
      const sessionAccessTokenStr = sessionStorage.getItem(ACCESS_TOKEN_NAME);
      if (sessionAccessTokenStr) {
        const sessionAccessToken: AccessToken = JSON.parse(sessionAccessTokenStr);
        if (new Date(sessionAccessToken.expiry) > new Date()) {
          setAccessToken(sessionAccessToken);
        } else {
          sessionStorage.removeItem(ACCESS_TOKEN_NAME);
        }
      }
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(accessToken));
    }
  }, [accessToken]);
  // signin actions
  const signinActions: ISigninActions = Object.freeze({
    signin: payload => {
      signin(payload).then(setAccessToken);
    },
    signout: () => {
      sessionStorage.removeItem(ACCESS_TOKEN_NAME);
      setAccessToken(null);
    },
  });

  const { children } = props;

  return (
    <SigninStateContext.Provider value={{ authError, isAuthenticating }}>
      <AccessTokenContext.Provider value={accessToken ? Object.freeze(accessToken) : accessToken}>
        <SigninActionsContext.Provider value={signinActions}>{children}</SigninActionsContext.Provider>
      </AccessTokenContext.Provider>
    </SigninStateContext.Provider>
  );
}

export function useAccessTokenContext() {
  const context = useContext(SigninActionsContext);
  if (!context) throw new Error(`${useAccessTokenContext.name} should be invoked within ${SigninProvider.name}`);
  return useContext(AccessTokenContext);
}
export function useSigninStateContext() {
  const context = useContext(SigninStateContext);
  if (!context) throw new Error(`${useSigninStateContext.name} should be invoked within ${SigninProvider.name}`);
  return context;
}
export function useSigninActionsContext() {
  const context = useContext(SigninActionsContext);
  if (!context) throw new Error(`${useSigninActionsContext.name} should be invoked within ${SigninProvider.name}`);
  return context;
}
