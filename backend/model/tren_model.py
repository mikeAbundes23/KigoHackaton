from classes.Tren import Tren

def get_all_trenes():
    return Tren.query.all()

def get_tren_by_id(id):
    return Tren.query.filter(Tren.idTren == id)

def get_tren_by_matricula(matricula):
    return Tren.query.filter(Tren.matricula == matricula)

