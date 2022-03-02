import md5 from 'md5';
import { Request, Response } from 'express';

import User from '../models/user.models';
import { createToken, comparePassword } from '../helpers/auth.helpers';
import { UserAttributes } from '../models/user.models';
import { verifyCredential, verifyCredentialAndUsername } from '../services/user.services';
import { uploadS3 } from '../controllers/upload.controllers';
import { separateBase64 } from '../helpers/photo.helpers';

export const signUp = async (
    req: Request, 
    res: Response
): Promise<Response> => {
    const FOLDER: string = 'Fotos_Perfil';

    const user = req.body;
    if(await verifyCredentialAndUsername(user)) {
        try {

            const { imagen } = user;
            let key:string = '';

            if (imagen != ''){
                const [extension, dataBase64] = separateBase64(imagen);
                const { Location, Key } = await uploadS3(FOLDER, dataBase64, extension);
                key = Key;
                console.log(Location)
            }

                

            // Insert user 
            const data = await User.create({
                ...user,
                urlFoto: key,
                contrasena: md5(user.contrasena)
            });   
            return res.status(200).json({ 
                status: true, 
                token: createToken(data), 
                usuario: data.usuario, 
                idUsuario: data.idUsuario, 
                error: null 
            });

        } catch (error) {
            return res.status(400).json({
                status: false,
                token: "",
                usuario: "", 
                idUsuario: 0, 
                error: error });
        }
    }
    return res.status(400).json({
        status: false, 
        token: "",  
        usuario: "", 
        idUsuario: 0, 
        error: "Repeated user" 
    });
}

export const signIn = async (
    req: Request, 
    res: Response
): Promise<Response> => {
    const { usuario, contrasena} = req.body;
    if(await verifyCredential(usuario, contrasena)) {
        try {
            const user = await User.findOne({
                where: {usuario: usuario}
            }) as UserAttributes;
            
            if(!user) {
                return res.status(400).json({  
                    status: false, 
                    token: "",  
                    usuario: "", 
                    idUsuario: 0, 
                    error: "Not found" 
                });
            }
            
            // compare password 
            if (comparePassword(contrasena, user.contrasena)) {
                return res.status(200).json({
                    status: true, 
                    token: createToken(user),  
                    usuario: user.usuario, 
                    idUsuario: user.idUsuario, 
                    error: null 
                });
            }
        } catch (error) {
            return res.status(400).json({
                status: false, 
                token: "",  
                usuario: "", 
                idUsuario: 0, 
                error: error 
            });
        }
    }

    return res.status(400).json({  
        status: false, 
        token: "",  
        usuario: "", 
        idUsuario: 0, 
        error: "The username or password are incorrect" 
    });
}