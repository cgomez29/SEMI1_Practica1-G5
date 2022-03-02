from src import app
from flask import jsonify
from src.config.database import DB
from src.utils.utils import response

@app.route('/', methods=['GET'])
def home():
    try:
        try: 
            with DB.cursor() as cur: 
                cur.execute('select * from practica1.usuario;') 

                for row in cur.fetchall():
                    print(row)
        finally:
            DB.close()        
        return jsonify({'mensaje': "Home", 'exito': True})
        
    except Exception:
        return jsonify({'mensaje': "Home", 'exito': False})