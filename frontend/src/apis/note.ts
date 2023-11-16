import apiInstance from './client';

const client = apiInstance();

const getNotes = async () => {
  try {
    const res = await client.get('/notes');
    return res.data;
  } catch (e) {
    throw new Error('Error_IN_GetNotes');
  }
};

const postNote = async () => {
  try {
    const res = await client.post('/notes');
    return res.data;
  } catch (e) {
    throw new Error('Error_IN_GetNotes');
  }
};

const getNote = async (id: number) => {
  try {
    const res = await client.get(`/notes/${id}`);
    return res.data;
  } catch (e) {
    throw new Error('Error_IN_GetNotes');
  }
};

const mission = {
  getNotes,
  postNote,
  getNote,
};

export default mission;
