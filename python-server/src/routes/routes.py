urlAuth = {
    "signIn":   "/api/signIn",
    "signUp":   "/api/signUp"
}

urlUser = {
    "getUser":      "/api/profile/<int:id>",
    "updateUser":   "/api/profile/<int:id>"
}

urlAlbum= {
    "getAlbum":     "/api/album/<int:id>",
    "createAlbum":  "/api/album",
    "putAlbum":     "/api/album/<int:id>"
}

urlPhoto = {
    "getPhotos":  "/api/album/photo/<int:id>"
}