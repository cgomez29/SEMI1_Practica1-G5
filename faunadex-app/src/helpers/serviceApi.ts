import axios from 'axios';

import { PhotoUpload, UserProfile, UserRegister } from '../interfaces/interfaces';
import { getToBase64 } from './user';

// const API_SERVER = `http://${process.env.REACT_APP_SERVER}/api`;
// const API_SERVER = `http://3.22.97.170:4000/api`;

const API_SERVER = `http://semi1-practica1-load-balancer-558368108.us-east-2.elb.amazonaws.com:4000/api`;

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

// New Album
export const serviceSaveAlbums = async (uId: number, token: string, album: string) => {
  const newAlbum = {
    idUsuario: uId,
    nombre: album,
  };

  return await axios.post(`${API_SERVER}/album`, newAlbum, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update Album

export const serviceUpdateAlbum = async (
  albumId: number,
  token: string,
  album: string
) => {
  const updateAlbum = {
    nombre: album,
  };

  return await axios.put(`${API_SERVER}/album/${albumId}`, updateAlbum, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete Album
export const serviceDeleteAlbum = async (token: string, albumId: number) => {
  return await axios.delete(`${API_SERVER}/album/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// =============================================================================
// Photo
// =============================================================================
// Photo by album
export const servicePhotoByAlbum = async (albumId: number, token: string) => {
  return await axios.get(`${API_SERVER}/photo/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// New photo
export const servicePhotoNew = async (photo: PhotoUpload, token: string) => {
  const image = photo.image ? await getToBase64(photo.image) : '';
  const photoNew = {
    imagen: image,
    nombre: photo.name,
    idFolder: photo.folderId,
  };
  return await axios.post(`${API_SERVER}/album/photo`, photoNew, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
