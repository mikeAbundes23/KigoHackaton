from classes import db
from sqlalchemy import Column, Integer, String, Date

class Metro(db.Model):

    __tablename__ = 'metro'
    idMetro = Column(Integer, primary_key=True)
    linea = Column(Integer)
    estacion = Column(Integer)
    concurrencia = Column(Integer)
    fecha = Column(Date)
    capacidad = Column(Integer)

    def __init__(self, linea, estacion, concurrencia, fecha, capacidad):
        self.linea = linea
        self.estacion = estacion
        self.concurrencia = concurrencia
        self.fecha = fecha
        self.capacidad = capacidad

    def __str__(self):
        return f'id: {self.idMetro}\nlinea: {self.linea}\nestacion: {self.estacion}\nconcurrencia: {self.concurrencia}\nfecha: {self.fecha}\ncapacidad: {self.capacidad}'