from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from controllers.tren_controller import tren_blueprint
from apscheduler.schedulers.background import BackgroundScheduler
from classes import db

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Inicializar la aplicación Flask
app = Flask(__name__)
app.register_blueprint(tren_blueprint)

# Configurar la base de datos SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Crear un planificador de tareas de fondo
scheduler = BackgroundScheduler()

# Función para actualizar los trenes
def update_trenes():
    with app.app_context():
        from controllers.tren_controller import update_trenes as update_trenes_func
        update_trenes_func()

# Agregar la tarea de actualización al planificador para que se ejecute cada minuto
scheduler.add_job(update_trenes, 'interval', minutes=1)

# Iniciar el planificador
scheduler.start()

# Ruta de prueba
@app.route('/')
def hello_world():
    return 'Hello world!'

# Iniciar la aplicación Flask
if __name__ == '__main__':
    app.run()
