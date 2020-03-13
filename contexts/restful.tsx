import { PropsWithChildren } from 'react';
import { AccessToken } from 'models';
import { useAccessTokenContext } from './signin';
import { RestfulProvider } from 'restful-react';
import { BASE_API_URL } from 'app-constants';

const createTokenHeader = (accessToken: AccessToken) =>
  !accessToken ? {} : { authorization: `Bearer ${accessToken.value}` };

export function AuthenticationProvider(props: PropsWithChildren<{}>) {
  const accessToken: AccessToken = useAccessTokenContext();
  return (
    <RestfulProvider base={BASE_API_URL} requestOptions={{ headers: { ...createTokenHeader(accessToken) } }}>
      {props.children}
    </RestfulProvider>
  );
}
