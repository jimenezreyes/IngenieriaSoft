from alchemyClasses.Torneo import Torneo

def get_all_torneos():
    return Torneo.query.all()

def get_torneo_by_id(id):
    return Torneo.query.filter(Torneo.idTorneo == id).first()

def get_torneo_by_name(name):
    return Torneo.query.filter(Torneo.nombre == name).first()

def get_current_date():
    # Obtiene la fecha actual
    current_date = datetime.now().strftime("%Y-%m-%d")
    return current_date

def get_current_time():
    # Obtiene la hora actual
    current_time = datetime.now().strftime("%H:%M:%S")
    return current_time