import { Request, Response } from 'express';
import md5 from 'md5'

import User from '../models/user.models';
import Photo from '../models/photo.models';
import Folder from '../models/folder.models';
import { buildResponse, buildErrorResponse } from '../helpers/response.helpers'


export const getUsuario = async (
        req : Request, 
        res : Response
): Promise<Response> => {
    
    // get idUsuario
    const { id } = req.params;  

    try {
        const user = await User.findOne({ 
            where: { idUsuario: id },
            attributes: { 
                exclude: ["createdAt", "updatedAt", 'contrasena']
            } 
        });

        // number of folders/albums
        const numberFolder = await Folder.findAll({ where: { usuario: id}});
        
        // number of photos
        let numberFotos: number = 0;
        numberFolder.forEach(async ({idFolder}) => {
            const photos = await Photo.findAll({ where: { folder: idFolder}});
            numberFotos += photos.length;
        });

        // preformatting data
        const data = {
            user: user,
            numberFotos: numberFotos,
            numberFolder: numberFolder.length,
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

export const updateProfile = async (
    req : Request, 
    res : Response
): Promise<Response> => {
    // get idUsuario
    const { id } = req.params;
    const changes = req.body;

    try {
        const user = await User.update(
                {...changes},
                { where: { idUsuario: id, contrasena: md5(changes.contrasena)}}
            );
        
        // preformatting data
        const data = {
            user
        }
        
        if (data) {
            // asnwer
            return res.status(200).json(buildResponse('Successfull', data));
        }
        return res.status(400).json(buildErrorResponse('Password incorrect', data));
    } catch (error) {
        return res.status(400).json(buildErrorResponse("No data found", error));
    }
};