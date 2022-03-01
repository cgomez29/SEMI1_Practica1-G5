# ---------------------- IMOPORTS -----------------------
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import DB
from s3 import S3
from utils import response


# ---------------------- FLASK APP ----------------------
app = Flask(__name__)
CORS(app)

# ---------------------- ROUTES -------------------------
@app.route('/', methods=['GET'])
def home():
    return jsonify({'mensaje': "Home", 'exito': True})

@app.route('/api/signUp', methods=['POST'])
def signUp():
    try:
        print(
            request.json['nombre'],
            request.json['usuario'],
            request.json['contrasena'],
            request.json['urlFoto']
        )        
    
        return response(True, '0', 'Kevin', 123)
        
    except Exception:
        return response(False, '0', 'Kevin', 123)

# ---------------------- MAIN ---------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)
