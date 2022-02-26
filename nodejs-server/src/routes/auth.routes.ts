import { Router } from 'express';
import {
    getUsuarios,

} from '../controllers/user.controllers';

const router: Router = Router();

router.post(
    '/user',
    getUsuarios
);


export default router;