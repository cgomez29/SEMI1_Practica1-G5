urlAuth = {
    "signIn":   "/api/signIn",
    "signUp":   "/api/signUp"
}

urlUser = {
    "getUser":      "/api/profile/<int:id>",
    "updateUser":   "/api/profile/<int:id>"
}

urlAlbum= {
    "createAlbum":      "/api/album",
    "updateAlbum":      "/api/album/<int:idAlbum>",
    "getAllAlbums":     "/api/album/<int:idUser>",
}

urlPhoto = {
    "getPhotos":  "/api/album/photo/<int:id>"
}