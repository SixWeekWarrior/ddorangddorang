import apiInstance from './client';

const client = apiInstance();

// mission 조회 API
const getMission = async () => {
  try {
    const res = await client.get('/missions');
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN GET_MISSIONS');
  }
};

// mission 변경 API
const putMissionChange = async (data: number) => {
  try {
    const res = await client.put('/missions', data);
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN PUT_MISSIONS');
  }
};

// mission 완료 API
const postMissionComplete = async (data: number) => {
  try {
    const res = await client.post('/missions', data);
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN POST_MISSIONS');
  }
};

const mission = {
  getMission,
  putMissionChange,
  postMissionComplete,
};

export default mission;
