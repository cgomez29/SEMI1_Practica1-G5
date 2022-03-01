from src import app
from flask import jsonify

@app.route('/', methods=['GET'])
def home():
    return jsonify({'mensaje': "Home", 'exito': True})