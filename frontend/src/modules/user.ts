import {atom} from 'recoil';
import {UserInfo} from '../types/user';

const KEY = 'USER';

export const JoinUserInfoState = atom<UserInfo>({
  key: `${KEY}/info`,
  default: {
    name: '',
    email: '',
    password: '',
    generation: 0,
    isMajor: '',
    gender: '',
    campus: 0,
    classes: 0,
    floor: 0,
    profileImage: '',
    likes: '',
    hate: '',
    mbti: '',
    worry: '',
  },
});

export const UserInfoState = atom<UserInfo>({
  key: `${KEY}/info`,
  default: {
    name: '',
    email: '',
    password: '',
    generation: 0,
    isMajor: '',
    gender: '',
    campus: 0,
    classes: 0,
    floor: 0,
    profileImage: '',
    likes: '',
    hate: '',
    mbti: '',
    worry: '',
  },
});

const user = {UserInfoState, JoinUserInfoState};

export default user;
