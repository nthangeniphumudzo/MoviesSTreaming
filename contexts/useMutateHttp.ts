import { useState } from 'react';
import { makePostRequest } from 'api/utils';
import { BASE_API_URL } from 'app-constants';
import qs from 'qs';

interface IMutate {
  path: string;
  verb: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

export const useMutateHttp = ({ path, verb = 'POST' }: IMutate) => {
  const [loading, setIsLoading] = useState(false);

  const mutateFunc = verb && makePostRequest;

  const mutate = (payload: any, params: { [key: string]: string | number } = null) =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      const parameters = params ? `?${qs.stringify(params)}` : '';

      mutateFunc(`${BASE_API_URL}${path}${parameters}`, payload)
        .then(value => {
          setIsLoading(false);
          resolve(value);
        })
        .catch(e => {
          setIsLoading(false);
          reject(e);
        });
    });

  return { loading, mutate };
};
