import React, { useEffect, useState } from 'react';
import { Input, Button, Icon } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import './styles.scss';

export const welcomePage = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [finalValue, setFinalValue] = useState<string>('');
  useEffect(() => {
    if (finalValue != '') {
      router.push({ pathname: '/login', query: { finalValue } });
    }
  }, [finalValue]);

  return (
    <div className="homepage">
      <h1>WELCOME TO NTHANGENI BASKOP</h1>
      <div className="register">
        <div className="router">
          <Input
            value={inputValue}
            placeholder="your username to procced"
            onChange={e => setInputValue(e.target.value)}
            prefix={<Icon type="user" />}
          />
          <Button onClick={() => setFinalValue(inputValue)}>Signin</Button>
        </div>
        <br />
        <br />
        <Link href="/Register">
          <Button type="danger" block>
            First Time? REGISTER NOW
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default welcomePage;
