import { useAppSelector } from '../hooks/useRedux';

import { AlbumProfile } from '../components/AlbumProfile';
import { MyCarousel } from '../components/MyCarousel';

export const PhotoPage = () => {
  const { albums } = useAppSelector((state) => state.album);

  return (
    <div className="animate__animated animate__fadeIn animate__faster photo-main-container">
      <div className="photo-albums-container mb-2">
        <AlbumProfile text="Mis álbums" classStyle="mb-1 text-album-photo" />
        {albums.map((album) => (
          <AlbumProfile
            key={album.id}
            text={album.name}
            classStyle="mb-1 text-album-photo"
            album={album}
          />
        ))}
      </div>
      <div className="photo-container-carrusel">
        <h2
          className="name-title texto-cententer text-profile mb-1"
          style={{
            border: 'none',
          }}
        >
          <i className="fa-solid fa-image me-2"></i>
          Mis Fotos
        </h2>
        <div className="carrusel">
          <MyCarousel />
        </div>
      </div>
    </div>
  );
};
