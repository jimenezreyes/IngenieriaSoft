from flask import Blueprint, request, jsonify
from alchemyClasses.Administrador import Administrador
from alchemyClasses import db
from model.model_administrador import get_all_admins

admin = Blueprint('admin', __name__, url_prefix='/admin')

@admin.route('/read', methods=['GET'])
def read_admin():
    admins = get_all_admins()
    admins_list = []
    for admin in admins:
        admin_data = {
            'id': admin.idAdministrador,
            'nombre': admin.nombre,
            'apellido': admin.apellido,
            'email': admin.correo,
        }
        admins_list.append(admin_data)
    return jsonify(admins_list)

@admin.route('/insert', methods=['POST'])
def insert_admin():
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    email = data.get('email')
    
    nuevo_admin = Administrador(nombre, apellido, email, psswd)
    
    try:
        db.session.add(nuevo_admin)
        db.session.commit()
        return jsonify({"message": "Administrador insertado correctamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500