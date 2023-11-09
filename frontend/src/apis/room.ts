import {RoomInfo} from '../types/room';
import apiInstance from './client';
// import axios from 'axios';

const client = apiInstance();

// 방 생성 API
const postRoom = async (data: RoomInfo) => {
  try {
    console.log('postRoom_data', data);

    const res = await client.post('/rooms', {
      isOpen: data.isOpen,
      minMember: data.minMember,
      maxMember: data.maxMember,
      duration: data.duration,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error('ERROR IN POST_ROOM');
  }
};

// 방 정보 수정 API
const putRoom = async (data: RoomInfo) => {
  try {
    const res = await client.put('/rooms', data);
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN PUT_ROOM');
  }
};

// 게임 시작 API
const postRoomStart = async () => {
  try {
    const res = await client.post('/rooms/start');
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN POST_ROOM_START');
  }
};

// 나의 room 정보 가져오기 API
const getRoomInfo = async () => {
  try {
    const res = await client.get('/rooms');
    return res.data;
  } catch (e) {
    throw new Error('getRoomInfo');
  }
};

const room = {
  postRoom,
  putRoom,
  postRoomStart,
  getRoomInfo,
};

export default room;
