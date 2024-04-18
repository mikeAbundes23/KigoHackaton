from classes import db
from sqlalchemy import Column, Integer, String, Date

class Tren(db.Model):

    __tablename__ = 'tren'
    idTren = Column(Integer, primary_key=True)
    linea = Column(Integer)
    estacion = Column(Integer)
    concurrencia = Column(Integer)
    fecha = Column(Date)
    capacidad = Column(Integer)
    matricula = Column(String, unique=True)
    sentido = Column(String(1))

    def __init__(self, linea, estacion, concurrencia, fecha, capacidad, matricula, sentido):
        self.linea = linea
        self.estacion = estacion
        self.concurrencia = concurrencia
        self.fecha = fecha
        self.capacidad = capacidad
        self.matricula = matricula
        self.sentido = sentido
        
    def __str__(self):
        return f'id: {self.idTren}\nlinea: {self.linea}\nestacion: {self.estacion}\nconcurrencia: {self.concurrencia}\nfecha: {self.fecha}\ncapacidad: {self.capacidad}\nmatricula: {self.matricula}\nsentido: {self.sentido}'