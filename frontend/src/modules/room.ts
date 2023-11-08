import {atom} from 'recoil';
import {RoomInfo} from '../types/room';

const KEY = 'ROOM';

export const RoomKeyState = atom({
  key: `${KEY}/code`,
  default: {
    code: 0,
  },
});

// 수정 중인 정보를 가진다.
// 이 값은 실제 DB와 다를 수 있다.
export const TmpRoomInfoState = atom<RoomInfo>({
  key: `${KEY}/tmpinfo`,
  default: {
    isOpen: true,
    minMember: 0,
    maxMember: 0,
    duration: 0,
  },
});

// 힝상 DB와 같은 정보를 가진다.
export const RoomInfoState = atom<RoomInfo>({
  key: `${KEY}/info`,
  default: {
    isOpen: true,
    minMember: 0,
    maxMember: 0,
    duration: 0,
  },
});

const room = {RoomKeyState, RoomInfoState, TmpRoomInfoState};

export default room;
