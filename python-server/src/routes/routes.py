urlAuth = {
    "signIn":   "/api/signIn",
    "signUp":   "/api/signUp"
}

urlUser = {
    "getUser":  "/api/profile/<int:id>",
    "signUp":   "/api/upload"
}

urlAlbum= {
    "getAlbum":     "/api/album/<int:id>",
    "createAlbum":  "/api/album",
    "putAlbum":     "/api/album/<int:id>"
}

urlPhoto = {
    "getPhotos":  "/api/album/photo/<int:id>"
}