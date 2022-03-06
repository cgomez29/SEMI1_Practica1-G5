import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useAppSelector } from '../hooks/useRedux';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const MyCarousel = () => {
  const { photos } = useAppSelector((state) => state.photo);

  return (
    <Carousel responsive={responsive} infinite={true}>
      {photos.map((p) => (
        <div key={p.id} className="corrusel-info">
          <img
            src={`https://practice1-g5-images.s3.amazonaws.com/${p.url}`}
            alt={p.name}
            key={p.id}
            className="carrusel-img"
          />
          <p>{p.name}</p>
        </div>
      ))}
    </Carousel>
  );
};
