import { Request, Response } from 'express';
import md5 from 'md5';
import moment from 'moment';

import User from '../models/user.models';
import Photo from '../models/photo.models';
import Folder, { FolderAttributes } from '../models/folder.models';
import { buildResponse, buildErrorResponse } from '../helpers/response.helpers';
import { separateBase64 } from '../helpers/photo.helpers';
import { uploadS3 } from '../controllers/upload.controllers';
import { FOLDER_PROFILE, NAME_DEFAULT_FOLDER } from '../config/folder.config'

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
        for (const { idFolder } of numberFolder) {
            const photos = await Photo.findAll({ where: { folder: idFolder}});
            numberFotos += photos.length;
        }

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
        const { imagen } = changes;
        let user;

        if (imagen != ''){
            const [extension, dataBase64] = separateBase64(imagen);
            const { Location, Key } = await uploadS3(FOLDER_PROFILE, dataBase64, extension);
            console.log(Location);
            user = await User.update(
                {usuario: changes.usuario, nombre: changes.nombre, urlFoto: Key},
                { where: { idUsuario: id, contrasena: md5(changes.contrasena)}}
            );

            // saving to image profile 
            const { idFolder } = await Folder.findOne({
                where: { usuario: id, nombre: NAME_DEFAULT_FOLDER}}
            ) as FolderAttributes;
            
            // insert photo of profile
            await Photo.create({
                urlFoto: Key,
                nombre: `myphoto ${moment().format('YYYY-MM-DD HH:mm:s')}`,
                folder: idFolder,
            });

        } else {
            user = await User.update(
                    { usuario: changes.usuario, nombre: changes.nombre},
                    { where: { idUsuario: id, contrasena: md5(changes.contrasena)}}
                );
        }
        
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