from flask import Blueprint, request, jsonify, json, make_response
from flask_cors import cross_origin
from classes.Estacion import Estacion
from classes import db
from datetime import datetime
from model.estacion_model import get_estacion_by_numero_estacion, get_estacion_by_id, get_all_estaciones
import random

estacion_blueprint = Blueprint('estacion_blueprint', __name__)

@estacion_blueprint.route('/api/auth/estacion/all', methods=['GET'])
@cross_origin()
def all_estaciones():
    estaciones_query = get_all_estaciones()
    estaciones = []

    for estacion in estaciones_query:
        estaciones.append({
            'idestacion' : estacion.idestacion,
            'numero_estacion' : estacion.numero_estacion,
            'fecha' : estacion.fecha,
            'concurrencia' : estacion.concurrencia,
            'concurrencia_maxima' : estacion.concurrencia_maxima
        })

    if not estaciones:
        return make_response('No hay estaciones', 404)
    
    return jsonify(estaciones)


@estacion_blueprint.route('/api/auth/estacion/numero/<int:num_estacion>', methods=['GET'])
@cross_origin()
def get_estacion_by_numero(num_estacion):
    estacion = get_estacion_by_numero_estacion(num_estacion)

    return jsonify(estacion)

@estacion_blueprint.route('/api/auth/estacion/id/<int:id>', methods=['GET'])
@cross_origin()
def get_estacion_id(id):
    estacion = get_estacion_by_id(id)

    return jsonify(estacion)

@estacion_blueprint.route('/api/auth/estacion/add', methods=['POST'])
@cross_origin()
def create_estacion():
    numero_estacion = request.json.get('numero_estacion', None)
    concurrencia = request.json.get('concurrencia', None)
    concurrencia_maxima = request.json.get('concurrencia_maxima', None)
    #fecha = request.json.get('fecha', None)
    
    print(
        f'numero_estacion: {numero_estacion}\nconcurrencia: {concurrencia}\nconcurrencia_maxima: {concurrencia_maxima}'
    )

    new_estacion = Estacion(numero_estacion, concurrencia, concurrencia_maxima)

    try:
        db.session.add(new_estacion)
        db.session.commit()

        return make_response('Estacion creada', 201)
    except Exception as e:
        return make_response('No se creo la estacoin', 400)
    

def update_estaciones():
    # Obtener todos los estaciones
    estaciones = get_all_estaciones()

    for estacion in estaciones:

        if estacion.concurrencia < estacion.concurrencia_maxima:
            lugares = estacion.concurrencia_maxima - estacion.concurrencia
            variable = random.randint(-10, 10)

            if estacion.concurrencia > 0 and variable < 0 and estacion.concurrencia + variable >= 0:
                estacion.concurrencia += variable
            elif variable >= 0 and lugares >= variable:
                estacion.concurrencia += variable

    print("Actualizando estaciones")

    db.session.commit()
        