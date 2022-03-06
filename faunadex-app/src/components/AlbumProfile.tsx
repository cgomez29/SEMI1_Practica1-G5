import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useRedux';
import { Album } from '../interfaces/interfaces';
import { activeAlbum } from '../redux/actions/album';
import { startLoadingPhotos } from '../redux/actions/photo';

interface Props {
  text?: string;
  classStyle?: string;
  album?: Album;
}
export const AlbumProfile: FC<Props> = ({ text, classStyle, album }) => {
  const { active } = useAppSelector((state) => state.album);
  const dispatch = useDispatch();

  const onClick = () => {
    if (album) {
      dispatch(activeAlbum(album));
      dispatch(startLoadingPhotos(album.id));
    }
  };

  return (
    <div
      className={`text-album animate__animated animate__fadeIn animate__fast ${
        classStyle || ''
      } ${album && album.id === active?.id ? 'text-active' : ''}`}
      onClick={() => onClick()}
    >
      {text ? <h3>{text}</h3> : <i className="fa-solid fa-images icon-album"></i>}
    </div>
  );
};
