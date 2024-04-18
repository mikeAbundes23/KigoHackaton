from classes import db
from sqlalchemy import Column, Integer, String, Date

class Estacion(db.Model):

    __tablename__ = 'estacion'
    idEstacion = Column(Integer, primary_key=True)
    numero_estacion = Column(Integer)
    hora = Column(Date)
    concurrencia = Column(Integer)
    concurrencia_maxima = Column(Integer)

    def __init__(self, linea, estacion, concurrencia, fecha, capacidad):
        self.linea = linea
        self.estacion = estacion
        self.concurrencia = concurrencia
        self.fecha = fecha
        self.capacidad = capacidad

    def __str__(self):
        return f'id: {self.idMetro}\nlinea: {self.linea}\nestacion: {self.estacion}\nconcurrencia: {self.concurrencia}\nfecha: {self.fecha}\ncapacidad: {self.capacidad}'