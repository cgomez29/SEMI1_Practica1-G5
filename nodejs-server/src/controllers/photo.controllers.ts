import { Request, Response } from 'express';

import User from '../models/user.models';
import Photo from '../models/photo.models';
import Folder from '../models/folder.models';
import { buildResponse, buildErrorResponse } from '../helpers/response.helpers'


export const getAllPhotos = async (req: Request, res: Response) => {
     // get idUsuario
     const { id } = req.params;  

     try {
         // number of folders/albums
         const folders = await Folder.findAll({ where: { usuario: id}});
 
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
         return res.status(400).json(buildErrorResponse("No data found", error));
     }
};