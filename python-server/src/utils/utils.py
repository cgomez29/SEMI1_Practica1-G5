from flask import jsonify
import base64
import hashlib 
import secrets
import pymysql

from src.config.env import BUCKET_NAME
from src.config.s3 import S3
from src.config.database import DB


# =========================== GENERAL =======================

def response(status_: bool, token_: str, usuario_: str, idUsuario_: int, error_: str, statusCode_:int):
    return jsonify({
        "status": status_,
        "token": token_,
        "usuario": usuario_,
        "idUsuario": idUsuario_,
        "error": error_
    }), statusCode_

def MD5(password:str):
    hashObject = password.encode()
    md5Hash = hashlib.md5(hashObject)

    return md5Hash.hexdigest()

def splitImage(image:str):
    # data:image/png;base64, "code base64..."
    array = image.split(',');
    # data:image/png;base64
    preextension = array[0].split('/');
    # png;base64
    extension = preextension[1].split(';');

    return extension[0], array[1];    # return [extension, "code base 64"] 

def generateKeyImage(folder:str, extension:str):
    token = secrets.token_hex(15)
    key = '{}/{}.{}'.format(folder, token, extension)

    return key

# =========================== DATABASE =====================

def dbRead(query:str, params = None):
    cursor = DB.cursor()
    if params:
        cursor.execute(query, params)
    else:
        cursor.execute(query)
    
    entries = cursor.fetchall()
    cursor.close()
    
    return entries

def dbWrite(query:str, params):
    cursor = DB.cursor()
    
    try:
        cursor.execute(query, params)
        DB.commit()
        print(cursor.description)
        cursor.close()
        
        return True
        
    except pymysql.Error as e:
        print("Error %d: %s" % (e.args[0], e.args[1]))
        cursor.close()
        return False
        
# =========================== S3 ===========================

def uploadS3(folder:str, dataBase64:str, extension: str):
    try:

        key = generateKeyImage(folder, extension)
        contentType = 'image/{}'.format(extension)

        S3.Bucket(BUCKET_NAME).put_object(
            Key = key,
            Body = base64.b64decode(dataBase64),
            ContentType = contentType
        )
  
        return True, key
        
    except Exception:
        return False, ''