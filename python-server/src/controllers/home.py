from src import app
from flask import jsonify

@app.route('/', methods=['GET'])
def home():
    try:       
        return jsonify({'message': "Home from python", 'status': True})
        
    except Exception:
        return jsonify({'message': "Error server from python", 'status': False})

@app.route('/api/test', methods=['GET'])
def test():
    try:
        return jsonify({'message': "Server from python is working", 'status': True})
        
    except Exception:
        return jsonify({'message': "Error server from python", 'status': False})