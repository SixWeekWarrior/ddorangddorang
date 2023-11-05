import apiInstance from './client';
import axios from 'axios';

const client = apiInstance();

const postLogin = async (idToken: string) => {
  try {
    const res = await axios
      .create({
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + idToken,
        },
      })
      //   .post(process.env.NEXT_PUBLIC_DOMAIN + 'users/login');
      .post('https://k9a210.p.ssafy.io/api/v1/users/login');
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error('USER NOT FOUND');
  }
};

const user = {
  postLogin,
};
export default user;
