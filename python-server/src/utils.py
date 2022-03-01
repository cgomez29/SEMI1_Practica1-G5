from flask import Flask, jsonify, request

from io import BytesIO
from PIL import Image
import base64

from settings import BUCKET_NAME
from s3 import S3


def response(status_: bool, token_: str, usuario_: str, idUsuario_: int, error_: str = None):
    return jsonify({
        "status": status_,
        "token": token_,
        "usuario": usuario_,
        "idUsuario": idUsuario_,
        "error": error_
    })


def s3():
    print('1. jpg to PIL Image')
    img = Image.open('exp2.png')

    print('2. PIL Image to base64 encoded buffer')
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    imgBase64 = base64.b64encode(buffer.getvalue())

    print('3. upload image to s3')
    S3.Bucket(BUCKET_NAME).put_object(Key='twiiks.png',
                                      Body=base64.b64decode(imgBase64),
                                      ContentType='image/png',)
