import { Album } from '../interfaces/interfaces';
import {
  serviceAlbums,
  serviceDeleteAlbum,
  serviceSaveAlbums,
  serviceUpdateAlbum,
} from './serviceApi';

export const getAlbums = async (uId: number, token: string): Promise<Album[]> => {
  const { data } = await serviceAlbums(uId, token);
  const { folders } = data.data;
  if (!Array.isArray(folders)) return [];
  const albums: Album[] = folders.map((folder) => ({
    id: folder.idFolder,
    name: folder.nombre,
  }));
  return albums;
};

export const saveAlbum = async (
  uId: number,
  token: string,
  name: string
): Promise<Album | null> => {
  try {
    const { data } = await serviceSaveAlbums(uId, token, name);
    const { idFolder, nombre } = data.data;
    return {
      id: idFolder,
      name: nombre,
    };
  } catch (error) {
    return null;
  }
};

export const updateAlbum = async (
  albumId: number,
  token: string,
  album: string
): Promise<Album | null> => {
  try {
    const { data } = await serviceUpdateAlbum(albumId, token, album);
    const { status } = data;
    if (status) {
      return {
        id: albumId,
        name: album,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const removeAlbum = async (albumId: number, token: string) => {
  try {
    const { data } = await serviceDeleteAlbum(token, albumId);
    const { idFolder, deleted_photos } = data.data;

    return {
      albumId: idFolder as number,
      deletedPhotos: deleted_photos as number,
    };
  } catch (error) {
    return null;
  }
};
