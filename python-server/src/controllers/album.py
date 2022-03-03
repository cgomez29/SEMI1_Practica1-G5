from flask import request, jsonify, Response
from src import app
import json

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


@app.route(urlAlbum['updateAlbum'], methods=['PUT'])
def updateAlbum(idAlbum):
    try:
        newNameAlbum = request.json['nombre']

        if newNameAlbum:
            # update album
            query = '''
            update practica1.folder 
            SET nombre = %s
            WHERE idfolder = %s
            '''
            resultQuery = dbWrite(query, (newNameAlbum, idAlbum))

            # return
            if resultQuery:
                # get id usuario
                query = 'select usuario from practica1.folder WHERE idfolder = %s'
                result = dbRead(query, (idAlbum))

                return jsonify({
                    "status": True,
                    "message": "Successfull",
                    "data": {
                        "createdAt": "",
                        "updatedAt": "",
                        "idFolder": idAlbum,
                        "usuario": result[0][0],
                        "nombre": newNameAlbum
                    },
                    "errors": None
                })
            else:
                return responseUser(False, 'Error', None, None, 400)

        return responseUser(False, 'Missing fields to complete', None, None, 400)

    except Exception as e:
        print(e)


@app.route(urlAlbum['getAllAlbums'], methods=['GET'])
def getAllAlbums(idUser):
    try:
        # get id usuario
        query = 'select * from practica1.folder WHERE usuario = %s'
        allAlbums = dbRead(query, (idUser))
        
        if allAlbums:
            folders = []
            for row in allAlbums:
                # row --> 0: idFolder, 1: nameFolder, 2: idUser
                folders.append({"idFolder": row[0],
                                "nombre": row[1],
                                "usuario": row[2],
                                "createdAt": "",
                                "updatedAt": ""})

            return Response(json.dumps(
                [
                    {
                        "status": True,
                        "message": "Successfull",
                        "data": {
                            "folders": folders
                        },
                        "errors": None
                    }
                ]
            ),  mimetype='application/json'), 200

        
        return responseUser(False, 'Error', None, None, 400)
    
    except Exception as e:
        return responseUser(False, 'Error', None, None, 400)
