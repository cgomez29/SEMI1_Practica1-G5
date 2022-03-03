from flask import request, jsonify, Response
from datetime import datetime
import json

from src.routes.routes import urlPhoto
from src.utils.utils import (
    responseUser,
    response,
    dbRead,
    dbWrite,
    splitImage,
    uploadS3
)
from src import app


@app.route(urlPhoto['createPhoto'], methods=['POST'])
def createPhoto():
    try:
        folder = 'Fotos_Publicadas'
        idFolder = request.json['idFolder']
        namePhoto = request.json['nombre']
        imageUrl = request.json['imagen']

        if not imageUrl:
            return responseUser(False, 'Missing field image to complete', None, None, 400)

        # upload image
        extension, dataBase64 = splitImage(imageUrl)
        result, key = uploadS3(folder, dataBase64, extension)

        # insert data photo
        actualDateTime = datetime.today().strftime('%Y-%m-%d')
        query = 'insert into practica1.foto (folder, nombre, urlfoto, createdAt, updatedAt) values (%s, %s, %s, %s, %s)'
        result = dbWrite(query, (idFolder, namePhoto, key,
                         actualDateTime, actualDateTime))

        # return value
        if result:
            query = 'select idfoto, urlfoto, nombre, folder, createdAt, updatedAt from practica1.foto WHERE folder = %s AND nombre = %s'
            resultSelect = dbRead(query, (idFolder, namePhoto))
            actualPhoto = resultSelect[0]

            return jsonify({
                "status": True,
                "message": "Successfull",
                "data": {
                    "photo": {
                        "createdAt": actualPhoto[4].strftime('%Y-%m-%d'),
                        "updatedAt": actualPhoto[5].strftime('%Y-%m-%d'),
                        "idFoto": actualPhoto[0],
                        "urlFoto": actualPhoto[1],
                        "nombre": actualPhoto[2],
                        "folder": actualPhoto[3]
                    }
                },
                "errors": None
            })
        else:
            return response(False, '', '', 0, 'Request failed', 400)

    except Exception as e:
        print(e)


@app.route(urlPhoto['getPhoto'], methods=['GET'])
def getPhotosByAlbum(idAlbum):
    try:
        query = '''
        select idfoto, urlfoto, nombre from practica1.foto 
        where folder = %s;
        '''
        allPhotos = dbRead(query, (idAlbum))

        if allPhotos:
            photos = []
            for row in allPhotos:
                # row --> 0: idFolder, 1: nameFolder, 2: idUser
                photos.append({
                    "idFoto": row[0],
                    "urlFoto": row[1],
                    "nombre": row[2]
                })

            return Response(json.dumps(
                [
                    {
                        "status": True,
                        "message": "Successfull",
                        "data": {
                            "photos": photos
                        },
                        "errors": None
                    }
                ]
            ),  mimetype='application/json'), 200

        return responseUser(False, 'No data found', None, None, 400)

    except Exception as e:
        print(e)
        return responseUser(False, 'No data found', None, None, 400)
