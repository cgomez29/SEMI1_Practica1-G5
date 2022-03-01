from src import app
from flask import request
from src.utils.utils import response
from src.routes.routes import urlAuth

@app.route(urlAuth['signIn'], methods=['POST'])
def signIn():
    try:
        return response(True, '0', '', 0)
        
    except Exception:
        return response(False, '0', 'Kevin', 123)

@app.route(urlAuth['signUp'], methods=['POST'])
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