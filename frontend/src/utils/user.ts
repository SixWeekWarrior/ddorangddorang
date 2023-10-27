// import { userApi } from '@src/apis';
// import { UserInfo, UserMode } from '@src/types/user';
// import { DefaultValue, atom, selector } from 'recoil';
// import { recoilPersist } from 'recoil-persist';

// const KEY = 'USER';
// const { persistAtom } = recoilPersist();

// export const UserInfoState = atom<UserInfo>({
//   key: `${KEY}/info`,
//   default: {
//     nickname: '',
//     dust: 0,
//     email: '',
//     roles: 'ROLE_USER',
//     userId: '',
//   },
//   effects_UNSTABLE: [persistAtom],
// });