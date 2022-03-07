from datetime import datetime
from flask import request
from src import app

from src.routes.routes import urlUser
from src.utils.utils import (
    responseUser,
    responseUserUpdated,
    MD5,
    responseUser200,
    dbRead,
    dbWrite,
    splitImage,
    uploadS3
)


@app.route(urlUser['getUser'], methods=['GET'])
def getUser(id):
    try:
        query = 'select * from practica1.usuario WHERE idusuario = %s'
        result = dbRead(query, (id))
        # 0: id, 1: nombre, 2: contrasena, 3: usuario, 4: urlfoto
        if result:
            actualUser = result[0]

            # numberFolders
            queryFolders = 'select COUNT(*) from practica1.folder WHERE usuario = %s'
            result = dbRead(queryFolders, (id))
            numberFolders = result[0][0]

            # numberPhotos
            queryPhotos = '''
            select COUNT(foto.idfoto) numberPhotos from practica1.usuario u
            inner join practica1.folder folder on u.idusuario = folder.usuario
            inner join practica1.foto foto on folder.idfolder = foto.folder 
            where u.idusuario = %s
            '''
            result = dbRead(queryPhotos, (id))
            numberPhotos = result[0][0]

            return responseUser200(actualUser[0], actualUser[1], actualUser[3], actualUser[4], numberPhotos, numberFolders)
        else:
            return responseUser(False, 'No data found', None, None, 400)

    except Exception as e:
        print(e)
        return responseUser(False, 'No data found', None, None, 400)


@app.route(urlUser['updateUser'], methods=['PUT'])
def updateUser(id):
    try:
        folder = 'Fotos_Perfil'

        # entry data
        name = request.json['nombre']
        user = request.json['usuario']
        password = request.json['contrasena']
        imagenUrl = request.json['imagen']
        
        query = 'select contrasena from practica1.usuario where idusuario = %s'            
        resultSelect = dbRead(query, (id))
        passwordDb = resultSelect[0][0]
        passwordMd5 = MD5(password)
        
        if passwordDb != passwordMd5:
            return responseUser(False, 'Wrong password when updating ', None, None, 400)

        if imagenUrl:
            # upload image
            extension, dataBase64 = splitImage(imagenUrl)
            result, key = uploadS3(folder, dataBase64, extension)

            # update data
            query = '''
            update practica1.usuario u
            SET u.usuario = %s, u.nombre = %s, urlfoto = %s
            WHERE u.idusuario = %s; 
            '''
            resultQuery = dbWrite(query, (user, name, key, id))

            # insert profile photo
            query = 'select idfolder from practica1.folder WHERE usuario = %s AND nombre = %s'            
            resultSelect = dbRead(query, (id, 'Fotos del perfil'))
            
            namePhoto = 'myphoto ' + datetime.today().strftime('%Y-%m-%d %H:%M:%S')
            query = 'insert into practica1.foto (folder, nombre, urlfoto) values (%s, %s, %s)'
            result = dbWrite(query, (resultSelect[0][0], namePhoto, key))
            
            # return
            if result:
                return responseUserUpdated()
            else:
                return responseUser(False, 'Error', None, None, 400)
        else:
            # update data
            query = '''
            update practica1.usuario u
            SET u.usuario = %s, u.nombre = %s
            WHERE u.idusuario = %s;
            '''
            resultQuery = dbWrite(query, (user, name, id))

            # return
            if resultQuery:
                return responseUserUpdated()
            else:
                return responseUser(False, 'Error', None, None, 400)

    except Exception as e:
        print(e)
        return responseUser(False, 'Error', None, None, 400)
