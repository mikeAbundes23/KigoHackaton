from flask import Blueprint, request, jsonify, json, make_response
from flask_cors import cross_origin
from classes.Tren import Tren
from classes import db
from datetime import datetime
from model.tren_model import get_all_trenes, get_tren_by_id, get_tren_by_matricula
from apscheduler.schedulers.background import BackgroundScheduler
import random

tren_controller = Blueprint('tren_controller', __name__)

# Crea un planificador de tareas de fondo
scheduler = BackgroundScheduler()

@tren_controller.route('/api/auth/trenes', methods=['GET'])
@cross_origin()
def get_all_trenes():
    trenes_query = get_all_trenes()
    trenes = []

    for tren in trenes_query:
        trenes.append({
            'idTren': tren.idTren,
            'linea': tren.linea,
            'estacion': tren.estacion,
            'concurrencia': tren.concurrencia,
            'fecha': tren.fecha,
            'capacidad': tren.capacidad,
            'matricula': tren.matricula,
            'sentido': tren.sentido
        })
    if not trenes:
        return make_response('No hay trenes', 404)

    return jsonify(trenes)

@tren_controller.route('/api/auth/tren/id/<id>', methods=['GET'])
@cross_origin()
def tren_by_id(id):
    tren = get_tren_by_id(id)

    return jsonify(tren)

@tren_controller.route('/api/auth/tren/matricula/<str:matricula>', methods=['GET'])
@cross_origin()
def get_tren_by_matricula(matricula):
    tren = get_tren_by_matricula(matricula)

    return jsonify(tren)

def update_trenes():
    # Obtener todos los trenes
    trenes_query = get_all_trenes()
    trenes = []

    for tren in trenes_query:
        trenes.append({
            'idTren': tren.idTren,
            'linea': tren.linea,
            'estacion': tren.estacion,
            'concurrencia': tren.concurrencia,
            'fecha': tren.fecha,
            'capacidad': tren.capacidad,
            'matricula': tren.matricula,
            'sentido': tren.sentido
        })

    for tren in trenes:
        if(tren.estacion == 5) :
            tren.sentido = 'R'
        elif(tren.estacion == 1):
            tren.sentido = 'I'

        if(tren.sentido == 'R'):
            tren.estacion -= 1
        else:
            tren.estacion += 1

        if(tren.concurrencia < tren.capacidad):
            lugares = tren.capacidad - tren.concurrencia
            variable += random.randint(-60, 60)
            
            if (tren.concurrencia > 0 and variable < 0 and tren.concurrenica + variable  >= 0):
                tren.concurrecia += variable
            elif(variable >= 0 and lugares >= variable):
                tren.concurrencia += variable
    
    db.session.commit()

""" # Agrega la tarea de actualización al planificador para que se ejecute cada minuto
scheduler.add_job(update_trenes, 'interval', minutes=1)

# Inicia el planificador
scheduler.start() """
        

@tren_controller.route('/api/auth/tren/<int:id>', methods=['POST'])
@cross_origin()
def create_tren():
    data = request.json
    tren = Tren(
        linea=data['linea'],
        estacion=data['estacion'],
        concurrencia=data['concurrencia'],
        fecha=datetime.strptime(data['fecha'], '%Y-%m-%d'),
        capacidad=data['capacidad'],
        matricula=data['matricula']
    )

    db.session.add(tren)
    db.session.commit()

    return jsonify({'message': 'Tren creado correctamente'})