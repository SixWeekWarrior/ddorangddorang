import axios, {AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';
import {tokenUtil} from '../utils';

function apiInstance(contentType: string = 'application/json;charset=utf-8') {
  const client = axios.create({
    baseURL: 'https://k9a210.p.ssafy.io/api/v1',
    headers: {
      'Content-Type': contentType,
    },
  });

  client.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      const accessToken = 'Bearer ' + (await tokenUtil.getAccessToken());
      const Config: InternalAxiosRequestConfig = {
        ...config,
        // @ts-ignore
        headers: {
          ...config.headers,
          Authorization: accessToken,
        },
      };
      return Config;
    },
    error => {
      Promise.reject(error);
    },
  );

  return client;
}

export default apiInstance;
