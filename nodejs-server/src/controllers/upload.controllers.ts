import { PutObjectRequest } from 'aws-sdk/clients/s3';
import AWS from 'aws-sdk';
import randomBytes from 'randombytes';

import { s3_credentials } from '../config/s3.config';

//acceso a Amazon s3 con las credenciales declaradas.
const s3 = new AWS.S3(s3_credentials);

const generate_key = (folder: String, extension: String) => {
  var random_str = randomBytes(16).toString('hex');
  //var file_parts = filename.split('.');
  //var file_extension = file_parts[file_parts.length - 1].toLocaleLowerCase();
  // 
  return `${folder}/${random_str}.${extension}`;
};

// Subir a s3
export const uploadS3 = async (folder: string, dataBase64: String, extension: String) => {
  const Key = generate_key(folder, extension);
  const bucket = process.env.S3_BUCKET || '';
  const buff = Buffer.from(dataBase64, 'base64');

  const params: PutObjectRequest = {
    Bucket: bucket,
    Key: Key,
    Body: buff,
    ContentType: 'image',
    //ACL: 'public-read',
  };

  return await s3.upload(params).promise();
};

// Subir a s3
export const getObjectS3 = async (id: string) => {
  const bucket = process.env.S3_BUCKET as string;

  let getParams = {
      Bucket: bucket,
      Key: id
    }

  s3.getObject(getParams, async (err, data) => {
    if (err) 
        return err;
    const { Body } = data as any;
    let dataBase64 = await Buffer.from(Body).toString('base64'); //byte to base 64
    return dataBase64;
  })
};