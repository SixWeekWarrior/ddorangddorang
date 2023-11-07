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
      // const accessToken = ('Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1ZjRiZjQ2ZTUyYjMxZDliNjI0OWY3MzA5YWQwMzM4NDAwNjgwY2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3MDU0NjEzOTk0MDMtNnJwZnRkbThpZDVpZDZ1dmswZDJyaWU1cDhuajVoMzUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3MDU0NjEzOTk0MDMtYjYzdG9vdWxwb3ZhYmYycDdmMWRsamdlbXI4NHBqMnAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTM2NjI1NzY4ODQ1OTAwNTEwNjQiLCJlbWFpbCI6InNpeHdlZWt3YXJyaW9yLnNzYWZ5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoi7Jyh7KCEIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pZQ0hsb3ZVcG1iWktYWGhsMDdFbGlOXy1nTTR6LVFXb1p0ZExrNUk3Wj1zOTYtYyIsImdpdmVuX25hbWUiOiLsnKHsoIQiLCJsb2NhbGUiOiJrbyIsImlhdCI6MTY5OTIxMjU4MiwiZXhwIjoxNjk5MjE2MTgyfQ.BsCfoCc7o-oBS0Fq5x8CR30z_eoB7mRl9PeqesjyZ_pGtAu56dMjzHqIPPvuzemK1KwsETL9-F7bHaFlwbeoToCdBD2yUUluqDRXL7QCivUeL1wmi4CN6zj2RSV00IooxR6mg1BNHJ_3ZUsRGk_PsFqW5381hHlwdhgrE6wa6yR5FX66oBNeOsMFidPV_IpYor-FB3bO07NoYmgTfgNIv2zPHBq9NcZIM6dP2YP0lH8AxDgbqgLpI9KS3kLI1DOl8n70Pp_cWx6nS_O4ik8HjzA7XrAK3UCFBFimU_fvP9oVpCjj8pn82AZLPRj51UIqjZPberbwtFcRMUY3tDjXXg');
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
