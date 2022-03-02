interface Props {
  urlFoto: string;
}
const bucket_S3 = 'https://practice1-g5-images.s3.amazonaws.com';

export const PreviewImage = ({ urlFoto }: Props) => {
  const image = urlFoto !== '' ? `${bucket_S3}/${urlFoto}` : './assets/user.png';
  return (
    <div className="preview-img animate__animated animate__fadeIn animate__fast">
      <img src={image} alt="" width="150px" />
    </div>
  );
};
