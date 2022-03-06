import { Photo, PhotoUpload } from '../interfaces/interfaces';
import { servicePhotoByAlbum, servicePhotoNew } from './serviceApi';

export const getPhotosById = async (token: string, albumId: number): Promise<Photo[]> => {
  try {
    const { data } = await servicePhotoByAlbum(albumId, token);
    const { photos } = data.data;

    if (!Array.isArray(photos)) return [];

    const photoArray: Photo[] = photos.map((p) => ({
      id: p.idFoto,
      url: p.urlFoto,
      name: p.nombre,
    }));
    return photoArray;
  } catch (e) {
    return [];
  }
};

export const savePhotoByAlbm = async (
  token: string,
  photo: PhotoUpload
): Promise<Photo | null> => {
  try {
    const { data } = await servicePhotoNew(photo, token);
    const { urlFoto, nombre, idFoto } = data.data.photo;
    return {
      id: idFoto,
      url: urlFoto,
      name: nombre,
    };
  } catch (error) {
    return null;
  }
};
