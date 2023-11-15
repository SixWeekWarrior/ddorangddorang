import apiInstance from './client';
import axios from 'axios';
import {
  OpinionInfo,
  UserDailyInfo,
  UserInfo,
  UserMoreInfo,
  UserSsafyInfo,
} from '../types/user';
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
    const idToken = await tokenUtil.getIdToken();

    const formData = new FormData();
    if (data.profile) {
      const file = {
        uri: data.profile,
        type: 'image/jpeg',
        name: '프로필 사진.jpg',
      };
      formData.append('profile', file);
    }

    formData.append('signupInfo', {
      string: JSON.stringify(data),
      type: 'application/json',
    });

    const res = await axios
      .create({
        headers: {
          // 'Content-Type': 'application/json; charset=UTF-8',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + idToken,
        },
      })
      .post(serverUrl + '/users/signup', formData);

    await tokenUtil.setToken(
      res.data.data.accessToken,
      res.data.data.refreshToken,
    );
    return res.data;
  } catch (e: any) {
    console.log(e.request);
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

// 데일리 정보 (mood, color) 수정 API
const putTodayInfo = async (data: UserDailyInfo) => {
  try {
    const res = await client.put('/users/todayinfo', data);
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN PUT_TODAY_INFO');
  }
};

// User 정보 조회 API
const getUser = async () => {
  try {
    const res = await client.get('/users');
    return res.data.data;
  } catch (e) {
    throw new Error('ERROR IN GET_USER');
  }
};

// 전체 User 정보 조회 API
const getUserExceptMe = async () => {
  try {
    const res = await client.get('users/user-info-list');
    return res.data.data;
  } catch (e) {
    throw new Error('ERROR IN GET_USER_EXCEPT_ME');
  }
};

// 개발자 의견보내기 API
const postOpinion = async (data: OpinionInfo) => {
  try {
    const res = await client.post('/opinions', data);
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN POST_OPINION');
  }
};

// 마니또 Hint 정보 조회 API
const getManitoHint = async () => {
  try {
    const res = await client.get('/users/manitohint');
    return [true, res.data.data];
  } catch (e) {
    return [false, null];
    // throw new Error('ERROR IN GET_MANITO_HINT');
  }
};

// 내 state 조회
const getUserState = async () => {
  try {
    const res = await client.get('/users/state');
    return res.data.data;
  } catch (e) {
    throw new Error('ERROR IN getUserState');
  }
};

// Home 출력 정보 조회
const getHomeInfo = async () => {
  try {
    const res = await client.get('users/home');
    return res.data.data;
  } catch (e) {
    throw new Error('ERROR IN getHomeInfo');
  }
};

const user = {
  postLogin,
  postSignup,
  putSsafyInfo,
  putMoreInfo,
  putTodayInfo,
  getUser,
  getUserExceptMe,
  getManitoHint,
  getUserState,
  getHomeInfo,
  postOpinion,
};

export default user;
