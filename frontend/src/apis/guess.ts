import apiInstance from './client';

const client = apiInstance();

// guess 조회 API

// guess 변경 API
const postGuess = async (manitoId: number) => {
  try {
    const res = await client.post('/guess', manitoId);
    return res.data;
  } catch (e) {
    throw new Error('ERROR IN POST_GUESS');
  }
};

// 전체 guess 조회 API

const guess = {
  postGuess,
};

export default guess;
