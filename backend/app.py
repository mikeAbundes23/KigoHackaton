from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from controllers.tren_controller import tren_blueprint
from classes import db

# Cargar variables de entorno desde el archivo .env
load_dotenv()
app = Flask(__name__)
app.register_blueprint(tren_blueprint)


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/')
def hello_world():
    return 'Hello world!'

if __name__ == '__main__':
    app.run()