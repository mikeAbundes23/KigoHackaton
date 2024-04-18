from classes.Estacion import Estacion

def get_estacion_by_numero_estacion(num_estacion):
    return Estacion.query.filter(Estacion.numero_estacion == num_estacion)

def get_estacion_by_id(id):
    return Estacion.query.filter(Estacion.numero_id == id)

