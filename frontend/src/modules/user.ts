import {atom} from 'recoil';
import {UserInfo} from '../types/user';

const KEY = 'USER';

// 수정 중인 정보를 가진다.
// 이 값은 실제 DB와 다를 수 있다.
export const TmpUserInfoState = atom<UserInfo>({
  key: `${KEY}/tmpinfo`,
  default: {
    name: '',
    generation: 0,
    isMajor: true,
    gender: true,
    campus: -1,
    classes: 0,
    floor: 0,
    profileImage: '',
    likes: '',
    hate: '',
    mbti: '',
    worry: '',
    roomId: 0,
    status: 0,
    mood: '',
    color: '',
    profile: '',
  },
});

// 힝상 DB와 같은 정보를 가진다.
export const UserInfoState = atom<UserInfo>({
  key: `${KEY}/info`,
  default: {
    name: '',
    generation: 0,
    isMajor: true,
    gender: true,
    campus: -1,
    classes: 0,
    floor: 0,
    profileImage: '',
    likes: '',
    hate: '',
    mbti: '',
    worry: '',
    roomId: 0,
    status: 0,
    mood: '',
    color: '',
    profile: '',
  },
});

const user = {UserInfoState, TmpUserInfoState};

export default user;
