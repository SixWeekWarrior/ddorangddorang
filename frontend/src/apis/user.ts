import apiInstance from './client';
import axios from 'axios';
import {UserInfo, UserMoreInfo, UserSsafyInfo} from '../types/user';
import {tokenUtil} from '../utils';

const client = apiInstance();
const serverUrl = 'https://k9a210.p.ssafy.io/api/v1';

// 로그인 요청 API
const postLogin = async (idToken: string) => {
  try {
    const res = await axios
      .create({
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + idToken,
        },
      })
      .post(serverUrl + '/users/login');

    return res.data;
  } catch (e) {
    throw new Error('ERROR IN POST_LOGIN');
  }
};

// 회원가입시 정보 입력 API
const postSignup = async (data: UserInfo) => {
  try {
    const res = await client.post('/users/signup', data);

    await tokenUtil.setToken(
      res.data.data.accessToken,
      res.data.data.refreshToken,
    );
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN POST_SIGN_UP');
  }
};

// 부가 정보 (mbti, likes, hate, worry) 수정 API
const putMoreInfo = async (data: UserMoreInfo) => {
  try {
    const res = await client.put('/users/moreinfo', data);
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN PUT_MORE_INFO');
  }
};

// 싸피 정보 수정 API
const putSsafyInfo = async (data: UserSsafyInfo) => {
  try {
    const res = await client.put('/users/ssafyinfo', data);
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN PUT_SSAFY_INFO');
  }
};

const user = {
  postLogin,
  postSignup,
  putSsafyInfo,
  putMoreInfo,
};

export default user;
