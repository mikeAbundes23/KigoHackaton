from classes import db
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

class Estacion(db.Model):

    __tablename__ = 'estacion'
    idestacion = Column(Integer, primary_key=True, autoincrement=True)
    numero_estacion = Column(Integer)
    fecha = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    concurrencia = Column(Integer)
    concurrencia_maxima = Column(Integer)

    def __init__(self, numero_estacion, concurrencia, concurrencia_maxima):
        self.numero_estacion = numero_estacion
        self.concurrencia = concurrencia
        self.concurrencia_maxima = concurrencia_maxima

    def __str__(self):
        return f'id: {self.idestacion}\nnumero_estacion: {self.numero_estacion}\nconcurrencia: {self.concurrencia}\nfecha: {self.fecha}\nconcurrencia_maxima: {self.concurrencia_maxima}'