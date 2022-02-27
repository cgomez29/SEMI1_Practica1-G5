import { Request, Response } from 'express';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import AWS from 'aws-sdk';
import randomBytes from 'randombytes';

import { s3_credentials } from '../config/s3.config';

//acceso a Amazon s3 con las credenciales declaradas.
const s3 = new AWS.S3(s3_credentials);

const generate_key = (filename: String) => {
  var random_str = randomBytes(16).toString('hex');
  var file_parts = filename.split('.');
  var file_extension = file_parts[file_parts.length - 1].toLocaleLowerCase();
  return `Fotos_Perfil/${random_str}.${file_extension}`;
};

const uploadS3 = async (file: any) => {
  const Key = generate_key(file.name);
  const bucket = process.env.S3_BUCKET || '';
  const buff = Buffer.from(file.data, 'base64');

  const params: PutObjectRequest = {
    Bucket: bucket,
    Key: Key,
    Body: buff,
    ContentType: file.mimetype,
    //ACL: 'public-read',
  };

  return await s3.upload(params).promise();
};

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let file = req?.files?.file;
  let state: boolean = false;
  let msg = {};

  await uploadS3(file)
    .then(({ Location, Key }) => {
        console.log({ Location, Key })
      msg = { location: Location, key: Key };
      state = false;
    })
    .catch((err) => {
      console.log('File save error: ', err);
      state = true;
    });

  if (state)
    return res.status(500).json({ msg: 'Error: Could not upload file!' });
  return res.status(200).json( msg );
};
