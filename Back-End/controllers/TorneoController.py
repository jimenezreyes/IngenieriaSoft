from flask import Blueprint, request, jsonify
from alchemyClasses.Torneo import Torneo
from alchemyClasses import db

from model.model_torneo import get_all_torneos, get_torneo_by_id
from datetime import datetime

torneo = Blueprint('torneo', __name__, url_prefix='/torneo')

@torneo.route("/readtorneos", methods=["GET"])
def read_torneos():
    torneos = get_all_torneos()
    torneos_list = []
    for torneo in torneos:
        torneo_data = {
            "id": torneo.idTorneo,
            "nombre": torneo.nombre,
            "fecha": torneo.fecha.strftime("%Y-%m-%d"),
            "hora":torneo.hora.strftime("%H:%M:%S"),
            "idAdministrador": torneo.idAdministrador
        }
        torneos_list.append(torneo_data)
    return jsonify(torneos_list)


@torneo.route("/inserttorneo", methods=["POST"])
def insert_torneo():
    if request.method == "POST":
        datos_json = request.get_json()
        nombre = datos_json["nombre"]
        fecha = datetime.strptime(datos_json["fecha"], "%Y-%m-%d")
        hora = datetime.strptime(datos_json["hora"], "%H:%M:%S")
        id_administrador = datos_json["idAdministrador"]

        nuevo_torneo = Torneo(fecha, nombre, hora, id_administrador)
        try:
            db.session.add(nuevo_torneo)
            db.session.commit()
            return jsonify({"message": "Torneo insertado correctamente"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

@torneo.route("/updatetorneo", methods=["PUT"])
def update_torneo():
    if request.method == "PUT":
        datos_json = request.get_json()
        id_torneo = datos_json["id"]
        nombre = datos_json["nombre"]
        fecha = datetime.strptime(datos_json["fecha"], "%Y-%m-%d")
        hora = datetime.strptime(datos_json["hora"], "%H:%M:%S")
        id_administrador = datos_json["idAdministrador"]

        torneo = get_torneo_by_id(id_torneo)

        torneo.nombre = nombre
        torneo.fecha = fecha
        torneo.hora = hora
        torneo.idAdministrador = id_administrador

        try:
            db.session.commit()
            return jsonify({"message": "Torneo editado correctamente"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

@torneo.route("/deletetorneo", methods=["DELETE"])
def delete_torneo():
    if request.method == "DELETE":
        datos_json = request.get_json()
        id_torneo = datos_json.get("id")  
        torneo = get_torneo_by_id(id_torneo)

        if not torneo:
            return jsonify({"error": f"No se encontró un torneo con ID {id_torneo}"}), 404

        try:
            db.session.delete(torneo)
            db.session.commit()
            return jsonify({"message": "Torneo eliminado correctamente"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500


    
    
    