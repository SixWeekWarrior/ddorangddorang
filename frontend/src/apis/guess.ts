import apiInstance from './client';

const client = apiInstance();

// guess 조회 API
const getGuess = async () => {
  try {
    const res = await client.get('/guess');
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error('ERROS IN GET_GUESS');
  }
};

// guess 변경 API
const postGuess = async (manitoId: number) => {
  try {
    const res = await client.post('/guess', {manitoId: manitoId});
    return res.data.data;
  } catch (e) {
    console.log(e);
    throw new Error('ERROR IN POST_GUESS');
  }
};

// 전체 guess 조회 API
const getGuessAll = async () => {
  try {
    const res = await client.get('/guess/all');
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error('ERROS IN GET_GUESS_ALL');
  }
};

const guess = {
  getGuess,
  postGuess,
  getGuessAll,
};

export default guess;
