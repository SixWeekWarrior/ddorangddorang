import {RoomInfo} from '../types/room';
import apiInstance from './client';

const client = apiInstance();

// 방 생성 API
const postRoom = async (data: RoomInfo) => {
  try {
    const res = await client.post('/rooms', {
      isOpen: data.isOpen,
      minMember: data.minMember,
      maxMember: data.maxMember,
      duration: data.duration,
    });

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

// 나의 room 정보 가져오기 API
const getRoomInfo = async () => {
  try {
    const res = await client.get('/rooms');
    return res.data;
  } catch (e) {
    throw new Error('getRoomInfo');
  }
};

// 대기하는 사람 리스트 가져오기 API
const getRoomWaiting = async () => {
  try {
    const res = await client.get('/rooms/waiting');
    return res.data;
  } catch (e) {
    throw new Error('getRoomWaiting');
  }
};

// 대기하는 사람 승인하는 API
const postRoomResponse = async (data: {userId: number}[]) => {
  try {
    const res = await client.post('/rooms/response', data);
    return res.data;
  } catch (e) {
    throw new Error('postRoomResponse');
  }
};

// 게임을 시작하는  API
const postRoomStart = async () => {
  try {
    const res = await client.post('/rooms/start');
    return res.data;
  } catch (e) {
    throw new Error('postRoomResponse');
  }
};

// 게임에 들어오는 API
const postRoomJoin = async (data: number) => {
  try {
    const res = await client.post('/rooms/join', {
      accessCode: data,
    });
    return res.data;
  } catch (e) {
    throw new Error('postRoomJoin');
  }
};

const getRoomEnd = async () => {
  try {
    const res = await client.get('/rooms/end');
    return res.data;
  } catch (e) {
    throw new Error('getRoomEnd');
  }
};

const room = {
  postRoom,
  putRoom,
  getRoomInfo,
  getRoomWaiting,
  postRoomResponse,
  postRoomStart,
  postRoomJoin,
  getRoomEnd,
};

export default room;
