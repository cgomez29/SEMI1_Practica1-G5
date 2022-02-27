import { Router } from 'express';

import passport from 'passport'
import { uploadFile } from '../controllers/upload.controllers';
import {
    getUsuarios,
} from '../controllers/user.controllers';

const router: Router = Router(); 

router.get(
    '/user',
    passport.authenticate('jwt', { session: false }),
    getUsuarios
);
router.post(
    '/upload',
    passport.authenticate('jwt', { session: false }),
    uploadFile
);

export default router; 