from flask import request, jsonify
from src import app

from src.routes.routes import urlAlbum
from src.utils.utils import (
    responseUser,
    MD5,
    responseUser200,
    dbRead,
    dbWrite,
    splitImage,
    uploadS3
)


@app.route(urlAlbum['createAlbum'], methods=['POST'])
def createAlbum():
    try:
        idUser = request.json['idUsuario']
        nameAlbum = request.json['nombre']

        queryInsert = 'insert into practica1.folder (nombre, usuario) values (%s, %s)'
        result = dbWrite(queryInsert, (nameAlbum, idUser))

        if result:
            # numberFolders
            queryFolders = 'select idfolder from practica1.folder WHERE nombre = %s AND usuario = %s'
            result = dbRead(queryFolders, (nameAlbum, idUser))
            idFolder = result[0][0]

            return jsonify(
                {
                    "status": True,
                    "message": "Successfull",
                    "data": {
                        "createdAt": "",
                        "updatedAt": "",
                        "idFolder": idFolder,
                        "usuario": idUser,
                        "nombre": nameAlbum
                    },
                    "errors": None
                }
            )
        else:
            return responseUser(False, 'No data found', None, None, 400)

    except Exception as e:
        print(e)
        return responseUser(False, 'No data found', None, None, 400)
        
