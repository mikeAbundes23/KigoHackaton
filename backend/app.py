from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
from controllers.tren_controller import tren_blueprint
from controllers.estacion_controller import estacion_blueprint
from apscheduler.schedulers.background import BackgroundScheduler
from classes import db
from flask_cors import CORS

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"], "allow_headers": ["Content-Type", "Authorization"]}})

# Configurar la base de datos SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

app.register_blueprint(estacion_blueprint)
app.register_blueprint(tren_blueprint)

# Crear un planificador de tareas de fondo
scheduler = BackgroundScheduler()

# Función para actualizar las estaciones
def update_estaciones():
    with app.app_context():
        from controllers.estacion_controller import update_estaciones as update_estaciones_func
        update_estaciones_func()

# Función para actualizar los trenes
def update_trenes():
    with app.app_context():
        from controllers.tren_controller import update_trenes as update_trenes_func
        update_trenes_func()

# Agregar la tarea de actualización al planificador para que se ejecute cada minuto
scheduler.add_job(update_trenes, 'interval', seconds=9)
scheduler.add_job(update_estaciones, 'interval', seconds=9)


# Iniciar el planificador
scheduler.start()

# Ruta de prueba
@app.route('/')
def hello_world():
    return 'Hello world!'

# Iniciar la aplicación Flask

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)