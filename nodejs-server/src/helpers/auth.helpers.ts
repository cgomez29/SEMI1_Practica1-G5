import jwt from 'jsonwebtoken'
import md5 from 'md5';

import { UserAttributes } from '../models/user.models'
import { JWT_SECRET } from '../config/jwtsecret.config'

export const createToken = (user: UserAttributes) => {
    const { idUsuario, usuario } = user; 
    return jwt.sign({ 
        idUsuario: idUsuario, 
        usuario: usuario}, 
        JWT_SECRET!,{
            expiresIn: 3600
        }
    );
};

export const comparePassword = (
    password: string, 
    passwordDB: string
): boolean => {
    if (md5(password) == passwordDB) return true;
    return false;
};