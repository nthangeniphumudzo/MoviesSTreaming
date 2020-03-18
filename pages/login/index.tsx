import React, { useState, useEffect } from 'react';
import { useAccessTokenContext, useSigninActionsContext, useSigninStateContext } from 'contexts/signin';
import './styles.scss';
import { Form, Alert, Input, Checkbox, Button } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Icon } from 'antd';
import { useRouter } from 'next/router';

export default function Login() {
  const accesssToken = useAccessTokenContext();
  const { signin } = useSigninActionsContext();
  const { authError, isAuthenticating } = useSigninStateContext();
  const router = useRouter();
  const { finalValue } = router.query;

  useEffect(() => {
    if (accesssToken) {
      router.push('/horrorFilms');
    }
  }, [accesssToken]);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const doSignin = () => {
    signin({
      username,
      password,
    });
  };

  return (
    <div className="body">
      <Form className="loginForm">
        <img
          src="/static/images/109697892-director-chair-popcorn-and-clapboard-cinema-movie-vector-illustration.jpg"
          width="75px"
        />

        {/* {authErrorMsg && !isReauth && <Alert message={authErrorMsg} type="error" showIcon />} */}
        {!accesssToken && !isAuthenticating && !authError && (
          <Alert type="warning" message={'You are not signed in!'} />
        )}

        {isAuthenticating && <Alert type="info" message={'Signin in...'} />}
        {authError && <Alert type="error" message={((e: any = authError) => e.data)()} />}

        <FormItem>
          <Input
            value={username}
            prefix={<Icon type="user" />}
            placeholder={`welcome back ${finalValue !== null ? finalValue : 'new user'}`}
            onChange={e => setUsername(e.target.value)}
            disabled={accesssToken || isAuthenticating ? true : null}
          />
        </FormItem>

        <FormItem>
          <Input
            value={password}
            prefix={<Icon type="lock" />}
            type="password"
            onChange={e => setPassword(e.target.value)}
            disabled={accesssToken || isAuthenticating ? true : null}
          />
        </FormItem>

        <FormItem className="un-authed-btn-container">
          <Button
            type="primary"
            loading={isAuthenticating}
            disabled={accesssToken || isAuthenticating || username.length == 0 || password.length == 0 ? true : null}
            onClick={doSignin}
          >
            Login
          </Button>
        </FormItem>

        <div className="custom-form-item">
          <Checkbox>Remember me</Checkbox>
        </div>
      </Form>
    </div>
  );
}
