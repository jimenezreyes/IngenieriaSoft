from alchemyClasses.Torneo import Torneo

def get_all_torneos():
    return Torneo.query.all()

def get_torneo_by_id(id):
    return Torneo.query.filter(Torneo.idTorneo == id).first()

def get_torneo_by_name(name):
    return Torneo.query.filter(Torneo.nombre == name).first()