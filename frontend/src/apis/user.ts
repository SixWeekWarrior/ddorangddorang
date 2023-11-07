import apiInstance from './client';
import axios from 'axios';
import {UserInfo, UserMoreInfo} from '../types/user';

const client = apiInstance();

const postLogin = async (idToken: string) => {
  try {
    const res = await axios
      .create({
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + idToken,
        },
      })
      .post('https://k9a210.p.ssafy.io/api/v1/users/login');
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN POST_LOGIN');
  }
};

const postSignup = async (data: UserInfo) => {
  try {
    const res = await client.post(
      'users/signup',
      data,
      // {
      //   name: data.name,
      //   email: data.email,
      //   password: data.password,
      //   generation: data.generation,
      //   isMajor: data.isMajor,
      //   gender: data.gender,
      //   campus: data.campus,
      //   classes: data.classes,
      //   floor: data.floor,
      //   profileImage: data.profileImage,
      //   likes: data.likes,
      //   hate: data.hate,
      //   mbti: data.mbti,
      //   worry: data.worry,
      // }
    );
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN POST_SING_UP');
  }
};

const postMoreInfo = async (data: UserMoreInfo) => {
  try {
    const res = await client.post('users/moreinfo', {
      mbti: data.mbti,
      likes: data.likes,
      hate: data.hate,
      worry: data.worry,
    });
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN Post_More_Info');
  }
};

const user = {
  postLogin,
  postSignup,
  postMoreInfo,
};
export default user;
