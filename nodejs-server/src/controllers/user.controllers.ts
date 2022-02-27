import { Request, Response } from 'express';
import UserIntance from '../models/user.models';


export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const data = await UserIntance.findAll({});
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(204).json({ msg: 'No data found' });
    }
};

