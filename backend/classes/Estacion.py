from classes import db
from sqlalchemy import Column, Integer, String

class Estacion(db.Model):

    __tablename__ = 'estacion'
    idEstacion = Column(Integer, primary_key=True)
    numero_estacion = Column(Integer)