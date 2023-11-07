import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAccessToken = async (accessToken: string) => {
  await AsyncStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = async (refreshToken: string) => {
  await AsyncStorage.setItem('refreshToken', refreshToken);
};

export const setToken = async (accessToken: string, refreshToken: string) => {
  await setAccessToken(accessToken);
  await setRefreshToken(refreshToken);
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem('accessToken');
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refreshToken');
};

const token = {
  setAccessToken,
  setRefreshToken,
  setToken,
  getAccessToken,
  getRefreshToken,
};

export default token;
