import { Router } from 'express';

import passport from 'passport'
import {
    getUsuario,
    updateProfile
} from '../controllers/user.controllers';
import {
    getAllAlbums,
    createAlbum,
    updateAlbum,
} from '../controllers/folder.controllers'
import { 
    getAllPhotos,
    addPhotoToAlbum,
    getPhotoS3,
} from '../controllers/photo.controllers'

const router: Router = Router(); 

// ======================================================
// User
// ======================================================

// return user information
router.get(
    '/profile/:id',
    passport.authenticate('jwt', { session: false }),
    getUsuario
);

router.put(
    '/profile/:id',
    passport.authenticate('jwt', { session: false }),
    updateProfile
);

// ======================================================
// Album = Folder
// ======================================================

router.post(
    '/album',
    passport.authenticate('jwt', { session: false}),
    createAlbum
);

router.put(
    '/album/:id',
    passport.authenticate('jwt', { session: false}),
    updateAlbum
);

// return all albums
router.get(
    '/album/:id',
    passport.authenticate('jwt', { session: false }),
    getAllAlbums
);



// ======================================================
// Photo
// ======================================================

// return all photos by album 
router.get(
    '/album/photo/:id',
    passport.authenticate('jwt', { session: false }),
    getAllPhotos
);

router.post(
    '/album/photo',
    passport.authenticate('jwt', { session: false }),
    addPhotoToAlbum
);

router.post(
    '/album/photo64',
    passport.authenticate('jwt', { session: false }),
    getPhotoS3
);

// router.post(
//     '/upload',
//     passport.authenticate('jwt', { session: false }),
//     uploadFile
// );

export default router; 