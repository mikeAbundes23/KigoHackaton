from classes import db
from sqlalchemy import Column, Integer, String, Date
from datetime import datetime

class Tren(db.Model):

    __tablename__ = 'tren'
    idtren = Column(Integer, primary_key=True, autoincrement=True)
    linea = Column(Integer)
    estacion = Column(Integer)
    concurrencia = Column(Integer)
    fecha = Column(Date, default=datetime.now, onupdate=datetime.now)
    capacidad = Column(Integer)
    matricula = Column(String, unique=True)
    sentido = Column(String(1))

    def __init__(self, linea, estacion, concurrencia, capacidad, matricula, sentido):
        self.linea = linea
        self.estacion = estacion
        self.concurrencia = concurrencia
        self.capacidad = capacidad
        self.matricula = matricula
        self.sentido = sentido
        
    def __str__(self):
        return f'id: {self.idtren}\nlinea: {self.linea}\nestacion: {self.estacion}\nconcurrencia: {self.concurrencia}\nfecha: {self.fecha}\ncapacidad: {self.capacidad}\nmatricula: {self.matricula}\nsentido: {self.sentido}'