import axios, {AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';

function apiInstance(contentType: string = 'application/json;charset=utf-8') {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN + 'api',
    headers: {
      'Content-Type': contentType,
    },
  });

  client.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      const token = 'Bearer ';
      const Config: InternalAxiosRequestConfig = {
        ...config,
        // @ts-ignore
        headers: {
          ...config.headers,
          Authorization: token,
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
