import { Request, Response } from 'express';
import sequelize from 'sequelize'

import Folder from '../models/folder.models';
import { buildResponse, buildErrorResponse } from '../helpers/response.helpers'

export const getAllAlbums = async (
    req: Request, 
    res: Response
): Promise<Response> => {
     // get idUsuario
     const { id } = req.params;  

     try {
         // folder by idUser
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

export const createAlbum = async (
    req: Request, 
    res: Response
): Promise<Response> => {
    // get idUsuario and get name folder
    const { idUsuario, nombre } = req.body;
    
    
    try {
        // preformatting data
        const data = await Folder.create({ usuario: idUsuario, nombre});

        if (data) {
            // asnwer
            return res.status(200).json(buildResponse('Successfull', data));
        }
        return res.status(400).json(buildErrorResponse('No created', data));
    } catch (error) {
        return res.status(400).json(buildErrorResponse("No data found", error));
    }
};

export const updateAlbum = async (
    req: Request, 
    res: Response
): Promise<Response> => {
    //  get name folder
    const {  nombre } = req.body;
    // get idAlbum 
    const { id } = req.params;
    
    try {

        // preformatting data
        const data = await Folder.update({ 
            nombre: nombre, 
            updateAt: sequelize.fn('NOW') }, 
            {   
                where: {idFolder: id}
            });

        if (data) {
            // asnwer
            return res.status(200).json(buildResponse('Successfull', data));
        }
        return res.status(400).json(buildErrorResponse('No created', data));
    } catch (error) {
        return res.status(400).json(buildErrorResponse("No data found", error));
    }
};