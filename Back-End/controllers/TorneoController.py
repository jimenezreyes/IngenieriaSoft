from flask import Blueprint, request, jsonify
from alchemyClasses.Torneo import Torneo
from alchemyClasses import db
from model.model_torneo import get_all_torneos, get_torneo_by_id

torneo = Blueprint('torneo', __name__, url_prefix='/torneo')

@torneo.route("/readtorneos", methods=["GET"])
def read_torneos():
    torneos = get_all_torneos()
    torneos_list = []
    for torneo in torneos:
        torneo_data = {
            "id": torneo.idTorneo,
            "nombre": torneo.nombre,
            "fechaHora": torneo.fechaHora,
            "idAdministrador": torneo.idAdministrador
        }
        torneos_list.append(torneo_data)
    return jsonify(torneos_list)


    
    
    