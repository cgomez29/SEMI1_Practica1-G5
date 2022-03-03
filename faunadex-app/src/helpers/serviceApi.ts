import axios from 'axios';

import { UserProfile, UserRegister } from '../interfaces/interfaces';
import { getToBase64 } from './user';

// const API_SERVER = `http://${process.env.REACT_APP_SERVER}/api`;
const API_SERVER = `http://34.125.116.155:4000/api`;
const options = {
  headers: { 'content-type': 'application/json' },
};

// =============================================================================
// AUTH
// =============================================================================
// Login
export const serverLogin = async (user: string, password: string) => {
  return await axios.post(
    `${API_SERVER}/signIn`,
    {
      usuario: user,
      contrasena: password,
    },
    options
  );
};

// Register
export const serverRegister = async (user: UserRegister) => {
  const image = user.photo ? await getToBase64(user.photo) : '';

  const newUser = {
    nombre: `${user.name} ${user.lastname}`,
    usuario: user.username,
    contrasena: user.password1,
    imagen: (image as string).toString(),
  };
  return await axios.post(`${API_SERVER}/signUp`, newUser, options);
};
// =============================================================================
// PROFILE
// =============================================================================
// GetProfile
export const serverProfile = async (id: number, token: string) => {
  return await axios.get(`${API_SERVER}/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// UPDATE Profile
export const serverUpdateProfile = async (
  id: number,
  token: string,
  user: UserProfile
) => {
  const image = user.photo ? await getToBase64(user.photo) : '';

  const userUpdated = {
    nombre: user.name,
    usuario: user.username,
    contrasena: user.password1,
    imagen: (image as string).toString(),
  };

  return await axios.put(`${API_SERVER}/profile/${id}`, userUpdated, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// =============================================================================
// ALBUM
// =============================================================================
// GetAlbums
export const serviceAlbums = async (uId: number, token: string) => {
  return await axios.get(`${API_SERVER}/album/${uId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
