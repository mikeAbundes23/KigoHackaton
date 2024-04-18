from flask import Blueprint, request, jsonify, json, make_response
from flask_cors import cross_origin
from classes.Estacion import Estacion
from classes import db
from datetime import datetime
from model.estacion_model import get_estacion_by_numero_estacion, get_estacion_by_id

estacion_controller = Blueprint('estacion_controller', __name__)

@estacion_controller.route('api/auth/estacion/numero/<int:num_estacion>', methods=['GET'])
@cross_origin()
def get_estacion_by_numero(num_estacion):
    estacion = get_estacion_by_numero_estacion(num_estacion)

    return jsonify(estacion)

@estacion_controller.route('api/auth/estacion/id/<int:id>', methods=['GET'])
@cross_origin()
def get_estacion_id(id):
    estacion = get_estacion_by_id(id)

    return jsonify(estacion)