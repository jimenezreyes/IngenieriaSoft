from alchemyClasses import db
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey


class Torneo(db.Model):
    
    __tablename__ = 'torneo'
    idTorneo = Column(Integer, primary_key=True)
    fechaHora = Column(DateTime())
    nombre = Column(String(100))
    idAdministrador = Column(Integer, ForeignKey('administrador.idAdministrador'))

    def __init__(self, fechaHora, nombre, idAdministrador):
        self.fechaHora = fechaHora
        self.nombre = nombre
        self.idAdministrador = idAdministrador

    def __str__(self):
        return f'idTorneo: {self.idTorneo}, fechaHora: {self.fechaHora}, nombre: {self.nombre}, idAdministrador: {self.idAdministrador}'