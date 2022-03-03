from src import app
from flask import jsonify

@app.route('/', methods=['GET'])
def home():
    try:       
        return jsonify({'message': "Server from python is working", 'status': True})
        
    except Exception:
        return jsonify({'message': "Error server from python", 'status': False})