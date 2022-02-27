import { Router } from 'express';

import {
    signUp,
    signIn,
} from '../controllers/auth.controllers';

const router: Router = Router();

router.post(
    '/signUp',
    signUp
);

router.post(
    '/signIn',
    signIn
);

export default router;