import { Router } from 'express';

import {
    signUp,
    signIn,
    testServer,
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

// Test     
router.get(
    '/test',
    testServer
);

export default router;