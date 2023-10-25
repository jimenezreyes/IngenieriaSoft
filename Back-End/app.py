import json
import os

from alchemyClasses import db
from alchemyClasses.Participante import Participante
from CryptoUtils.CryptoUtils import validate
from flask import Flask, render_template, request, flash, session, g, redirect, url_for

from controllers.JsonController import json_controller
from model.model_administrador import get_admin_by_email
from model.model_participante import get_participante_by_email
from model.model_superadmin import get_superadmin_by_email

from model.model_superadmin import get_superadmin_by_email
app = Flask(__name__)
app.register_blueprint(json_controller)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://michigames:michigames123@localhost:3306/proyecto"
app.config.from_mapping(
    SECRET_KEY='dev',
)
db.init_app(app)

@app.route('/', methods=['GET', 'POST'])
def main():
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        correo = request.form['correo']
        psswd = request.form['psswd']
        try:
            participante = Participante(nombre, apellido, correo, psswd)
            db.session.add(participante)
            db.session.commit()
        except Exception as e:
            db.session.rollback()  # Revertir cambios en caso de error
            print(f"Error: {str(e)}")
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if session.get("user", None) is not None and request.method == 'GET':
        return redirect(url_for('index'))
    if request.method == 'POST':
        try:
            email = request.form.get('email')
            passwd = request.form.get('passwd')
            participante_query = get_participante_by_email(email)
            if not (participante_query):
                flash('Ese correo no existe.')
                return render_template('login.html')
            user = participante_query[0]
            if not validate(passwd, user.psswd):
                flash('Contraseña incorrecta')
                return render_template('login.html')
            session.clear()
            session['user']= user.nombre
            session['email']= user.correo
            session.modified = True
            return render_template('index.html')
        except KeyError:
            flash('No fue enviado con éxito el correo y/o la contraseña')
            return render_template('login.html')
    return render_template('login.html')


@app.route('/index', methods=['GET', 'POST'])
def index():
    if session.get('user', None) is None:
        flash('Por favor primero inicie sesión.')
        return redirect(url_for('login'))
    return render_template('index.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    g.user = None
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run()
