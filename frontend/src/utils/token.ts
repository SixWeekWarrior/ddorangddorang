import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAccessToken = async (accessToken: string) => {
  await AsyncStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = async (refreshToken: string) => {
  await AsyncStorage.setItem('refreshToken', refreshToken);
};

export const setIdToken = async (idToken: string) => {
  await AsyncStorage.setItem('idToken', idToken);
};

export const removeAccessToken = async () => {
  await AsyncStorage.removeItem('accessToken');
};

export const removeRefreshToken = async () => {
  await AsyncStorage.removeItem('refreshToken');
};

export const removeIdToken = async () => {
  await AsyncStorage.removeItem('idToken');
};

export const setToken = async (accessToken: string, refreshToken: string) => {
  await setAccessToken(accessToken);
  await setRefreshToken(refreshToken);
};

export const removeToken = async () => {
  await removeAccessToken();
  await removeRefreshToken();
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem('accessToken');
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refreshToken');
};

export const getIdToken = async () => {
  return await AsyncStorage.getItem('idToken');
};

const token = {
  removeToken,
  removeAccessToken,
  removeRefreshToken,
  removeIdToken,
  setAccessToken,
  setRefreshToken,
  setIdToken,
  setToken,
  getAccessToken,
  getRefreshToken,
  getIdToken,
};

export default token;
