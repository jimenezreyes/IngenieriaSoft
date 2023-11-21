from flask import Blueprint, request, jsonify
from alchemyClasses.Participante import Participante
from alchemyClasses import db
from models import model_participante
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher 


@app.route("/editarPerfil", methods=["PUT"])
def edit_profile():
    if request.method == 'PUT':
        participante_id = request.json.get('idParticipante')  
        try:
            # Obtén el participante que deseas editar según el ID proporcionado
            participante = get_participante_by_id(participante_id)

            if participante:
                # Actualiza los campos según lo que recibiste en la solicitud
                nombre = request.json.get('nombre')
                if nombre:
                    participante.nombre = nombre

                apellido = request.json.get('apellido')
                if apellido:
                    participante.apellido = apellido

                contrasena = request.json.get('contrasena')
                if contrasena:
                    participante.psswd = sha256(cipher(contrasena)).hexdigest()

                foto = request.json.get('foto')  # Ajusta según la lógica para manejar la foto
                if foto:
                    participante.foto = foto

                db.session.commit()

                return jsonify({'message': 'Perfil actualizado exitosamente'})
            else:
                return jsonify({'error': 'Participante no encontrado'}), 404
        except Exception as e:
            db.session.rollback()  # Revertir cambios en caso de error
            print(f"Error: {str(e)}")
            return jsonify({'error': 'Error al actualizar el perfil'}), 500

    return jsonify({'message': 'Método no permitido'}), 405