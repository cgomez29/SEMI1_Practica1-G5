import jwt from 'jsonwebtoken'

import { UserAttributes } from '../models/user.models'
import { JWT_SECRET } from '../config/jwtsecret.config'

export const createToken = (user: UserAttributes) => {
    return jwt.sign({ id: user.id, username: user.username}, JWT_SECRET!,{
        expiresIn: 3600
    });
};