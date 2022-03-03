import { Request, Response } from 'express';

import Photo from '../models/photo.models';
import { buildResponse, buildErrorResponse } from '../helpers/response.helpers';
import Folder from '../models/folder.models';
import { uploadS3, getObjectS3 } from '../controllers/upload.controllers';
import { separateBase64 } from '../helpers/photo.helpers';

export const getAllPhotos = async (req: Request, res: Response) => {
     // get idUsuario
     const { id } = req.params;  

     try {
        // number of folders/albums
        const folders = await Photo.findAll({
            include: [{ 
                model: Folder,
                as: 'album',
                attributes:{
                    include: ['nombre'],
                    exclude: [ 'createdAt', 'updatedAt', 'idFolder', 'usuario' ],
                } ,
                where: { usuario: id}
            }],
            attributes: { 
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        });
         // preformatting data
         const data = {
            folders: folders,
         }
 
         if (data) {
             // asnwer
             return res.status(200).json(buildResponse('Successfull', data));
         }
         return res.status(400).json(buildErrorResponse('No data found', data));
     } catch (error) {
         return res.status(400).json(buildErrorResponse('No data found', error));
     }
};

export const addPhotoToAlbum = async (
    req: Request, 
    res: Response
): Promise<Response> => {
    const FOLDER: string = 'Fotos_Publicadas';
    // get data
    const { imagen, nombre, idFolder} = req.body;
    
    const [extension, dataBase64] = separateBase64(imagen);

    try {
        const { Location, Key } = await uploadS3(FOLDER, dataBase64, extension);
            
        console.log(Location)

        const photo = await Photo.create({ urlFoto: Key, nombre: nombre, folder: idFolder})

        // preformatting data
        const data = {
            photo: photo,
        }

        if (data) {
            // asnwer
            return res.status(200).json(buildResponse('Successfull', data));
        }
        return res.status(400).json(buildErrorResponse('No data found', data));
    } catch (error) {
        return res.status(400).json(buildErrorResponse('No data found', error));
    }
};

export const getPhotoByAlbum = async (req: Request, res: Response) => {
    // get idFolder
    const { id } = req.params;  

    try {
       // number of folders/albums
       const photos = await Photo.findAll({
           where: {
               folder: id,
           },
           attributes: { 
               exclude: [ 'folder', 'createdAt', 'updatedAt' ]
           }
       });
        // preformatting data
        const data = {
            photos: photos,
        }

        if (data) {
            // asnwer
            return res.status(200).json(buildResponse('Successfull', data));
        }
        return res.status(400).json(buildErrorResponse('No data found', data));
    } catch (error) {
        return res.status(400).json(buildErrorResponse('No data found', error));
    }
};

