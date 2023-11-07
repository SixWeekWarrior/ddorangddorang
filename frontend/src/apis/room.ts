import {RoomInfo} from '../types/room';
import apiInstance from './client';
// import axios from 'axios';

const client = apiInstance();

// 방 생성 API
const postRoom = async (data: RoomInfo) => {
  try {
    const res = await client.post('/rooms', data);
    return res.data;
  } catch (e) {
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

const room = {
  postRoom,
  putRoom,
  postRoomStart,
};

export default room;
