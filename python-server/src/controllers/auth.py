from src import app
from flask import request
from src.utils.utils import (
    response,
    MD5,
    dbRead,
    dbWrite,
    splitImage,
    uploadS3
)
from src.routes.routes import urlAuth

@app.route(urlAuth['signIn'], methods=['POST'])
def signIn():
    try:
        user = request.json['usuario']
        password = request.json['contrasena']
        
        if not user or not password:
            return response(False, '', '', 0, 'Username or password not provided.', 400)
            
        query = 'select * from practica1.usuario WHERE usuario = %s AND contrasena = %s'
        result = dbRead(query, (user, MD5(password)))
        # 0: id, 1: nombre, 2: contrasena, 3: usuario, 4: urlfoto
        if result:
            actualUser = result[0]
            dbPassword = actualUser[2]
            
            if MD5(password) == dbPassword:
                return response(True, '-1', actualUser[3], actualUser[0], None, 200)
            else:
                return response(False, '', '', 0, 'Incorrect username and/or password.', 401)
                
        else:
            return response(False, '', '', 0, 'Username does not exist', 400)
        
    except Exception:
        return response(False, '', '', 0, 'Request failed', 400)

@app.route(urlAuth['signUp'], methods=['POST'])
def signUp():
    try:
        folder = 'Fotos_Perfil'
        
        # entry data
        name = request.json['nombre']
        user = request.json['usuario']
        password = request.json['contrasena']
        imagenUrl = request.json['imagen']
        
        if not name or not user or not password or not imagenUrl:
            return response(False, '', '', 0, 'Missing fields to complete', 400)
    
        # upload image 
        extension, dataBase64 = splitImage(imagenUrl)
        result, key = uploadS3(folder, dataBase64, extension)
        
        # insert data
        query = 'insert into practica1.usuario (nombre, contrasena, usuario, urlfoto) values (%s, %s, %s, %s)'
        result = dbWrite(query, (name, MD5(password), user, key))
        print('WRITE DATABASE: ', result)

        # return value
        if result:
            query = 'select * from practica1.usuario WHERE usuario = %s AND contrasena = %s'            
            resultSelect = dbRead(query, (user, MD5(password)))
            actualUser = resultSelect[0]
            
            return response(True, '-1', actualUser[3], actualUser[0], None, 200)
        else:
            return response(False, '', '', 0, 'Request failed', 400)
            
    except Exception:
        return response(False, '', '', 0, 'Request failed', 400)