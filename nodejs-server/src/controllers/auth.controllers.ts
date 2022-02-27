import { Request, Response } from 'express';
import { verifyCredential, verifyCredentialAndUsername } from '../services/user.services'
import User from '../models/user.models';
import { createToken } from '../helpers/auth.helpers';
import { UserAttributes } from '../models/user.models';

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body;
    if(await verifyCredentialAndUsername(user)) {
        try {
            // Insert user 
            const data = await User.create({...user});   
            return res.status(200)
                .json({ status: true, token: createToken(data),  username: data.username, id: data.id, error: null });
        } catch (error) {
            return res.status(400)
                .json({  status: false, token: "",  username: "", id: 0, error: error });
        }
    }
    return res.status(400)
        .json({  status: false, token: "",  username: "", id: 0, error: "Repeated user" });
}

export const signIn = async (req: Request, res: Response): Promise<Response> => {
    const { username, password} = req.body;
    if(await verifyCredential(username, password)) {
        try {
            const user = await User.findOne({where: {username: username}}) as UserAttributes;
            
            if(!user) {
                return res.status(400)
                    .json({  status: false, token: "",  username: "", id: 0, error: "Not found" });
            }
            
            //  TODO: compare password 

            return res.status(200)
                .json({ status: true, token: createToken(user),  username: user.username, id: user.id, error: null });

        } catch (error) {
            return res.status(400)
            .json({  status: false, token: "",  username: "", id: 0, error: error });
        }
    }

    return res.status(400)
            .json({  status: false, token: "",  username: "", id: 0, error: "The username or password are incorrect" });
}