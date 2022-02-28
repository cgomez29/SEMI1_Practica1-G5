# ---------------------- IMOPORTS -----------------------
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

import os
import urllib
import base64
import boto3
from PIL import Image
from io import BytesIO

from settings import BUCKET_NAME, SERVICE_NAME, REGION_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

# ---------------------- FLASK APP ----------------------
app = Flask(__name__)
CORS(app)

# ---------------------- DATABASE CONNECTION ------------

# ---------------------- S3 CONNECTION ------------------
S3 = boto3.resource(
    service_name = SERVICE_NAME,
    region_name = REGION_NAME,
    aws_access_key_id = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY
)

# ---------------------- ROUTES -------------------------
@app.route('/', methods=['GET'])
def home():
    return jsonify({'mensaje': "Exito", 'exito': False})

@app.route('/', methods=['POST'])
def uploadImage():
    print('1. jpg to PIL Image')
    img = Image.open('exp3.png')

    print('2. PIL Image to base64 encoded buffer')
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    imgBase64 = base64.b64encode(buffer.getvalue())
    
    print('3. upload image to s3')
    S3.Bucket(BUCKET_NAME).put_object(Key='twiiks.png',
                Body=base64.b64decode(imgBase64),
                ContentType='image/png',)
    
    return jsonify({'mensaje': "Exito", 'exito': False})

# ---------------------- MAIN ---------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
