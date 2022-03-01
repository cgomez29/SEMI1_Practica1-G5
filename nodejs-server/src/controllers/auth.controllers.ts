import md5 from 'md5';
import { Request, Response } from 'express';

import User from '../models/user.models';
import { createToken, comparePassword } from '../helpers/auth.helpers';
import { UserAttributes } from '../models/user.models';
import { verifyCredential, verifyCredentialAndUsername } from '../services/user.services';

export const signUp = async (
    req: Request, 
    res: Response
): Promise<Response> => {
    const user = req.body as UserAttributes;
    if(await verifyCredentialAndUsername(user)) {
        try {
            // Insert user 
            const data = await User.create({
                ...user,
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