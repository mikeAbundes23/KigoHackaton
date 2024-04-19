from flask import Blueprint, request, jsonify, json, make_response
from flask_cors import cross_origin
from classes.Tren import Tren
from classes import db
from datetime import datetime
from model.tren_model import get_all_trenes, get_tren_by_id, get_tren_by_matricula
import random

tren_blueprint = Blueprint('tren_blueprint', __name__)

@tren_blueprint.route('/api/auth/trenes', methods=['GET'])
@cross_origin()
def all_trenes():
    trenes_query = get_all_trenes()
    trenes = []

    for tren in trenes_query:
        trenes.append({
            'idtren': tren.idtren,
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

@tren_blueprint.route('/api/auth/tren/id/<id>', methods=['GET'])
@cross_origin()
def tren_by_id(id):
    tren = get_tren_by_id(id)

    return jsonify(tren)

@tren_blueprint.route('/api/auth/tren/matricula/<string:matricula>', methods=['GET'])
@cross_origin()
def get_tren_by_matricula(matricula):
    tren = get_tren_by_matricula(matricula)

    return jsonify(tren)

def update_trenes():
    # Obtener todos los trenes
    trenes = get_all_trenes()

    for tren in trenes:
        if tren.estacion == 5:
            tren.sentido = 'R'
        elif tren.estacion == 1:
            tren.sentido = 'I'

        if tren.sentido == 'R':
            tren.estacion -= 1
        else:
            tren.estacion += 1

        if tren.concurrencia < tren.capacidad:
            lugares = tren.capacidad - tren.concurrencia
            variable = random.randint(-60, 60)

            if tren.concurrencia > 0 and variable < 0 and tren.concurrencia + variable >= 0:
                tren.concurrencia += variable
            elif variable >= 0 and lugares >= variable:
                tren.concurrencia += variable

    print("Actualizando trenes")

    db.session.commit()
        

@tren_blueprint.route('/api/auth/tren', methods=['POST'])
@cross_origin()
def create_tren():
    linea = request.json.get('linea', None)
    estacion = request.json.get('estacion', None)
    concurrencia = request.json.get('concurrencia', None)
    capacidad = request.json.get('capacidad', None)
    matricula = request.json.get('matricula', None)
    sentido = request.json.get('sentido', None)

    print(
        f'linea: {linea}\nestacion: {estacion}\nconcurrencia: {concurrencia}\ncapacidad: {capacidad}\nmatricula: {matricula}'
    )

    new_tren = Tren(linea, estacion, concurrencia, capacidad, matricula, sentido)

    try:
        db.session.add(new_tren)
        db.session.commit()

        return make_response('Tren creado', 201)
    except Exception as e:
        return make_response('Error al crear el tren', 400)