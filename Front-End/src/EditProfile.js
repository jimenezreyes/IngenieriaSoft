import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import './EditProfile.css';

function EditProfile() {
  const [idParticipante, setIdParticipante] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [gamertag, setGamertag] = useState('');
  const [foto, setFoto] = useState(null);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => setModal(!modal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();

    // Aquí puedes enviar los datos al servidor para actualizar el perfil
    const datosActualizados = {
      idParticipante,
      nombre,
      apellido,
      correo,
      contrasena,
      gamertag,
      foto,      
    };

    console.log('Datos actualizados:', datosActualizados);

    // Luego, puedes realizar una solicitud al servidor para manejar la actualización del perfil.
    // Utiliza fetch o axios según tu preferencia.
    try {
      const res = await fetch(`http://127.0.0.1:5000/register`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify(datosActualizados),
      });

      const data = await res.json();
      console.log('Respuesta del servidor:', data);

      // Puedes manejar la respuesta del servidor según tus necesidades
      // Por ejemplo, cerrar el modal o mostrar un mensaje de éxito
      toggleModal();
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      // Puedes manejar los errores y proporcionar retroalimentación al usuario si es necesario
    }
  };

  const handleEliminarPerfil = () => {
    toggleDeleteModal();
  };

  const handleConfirmarEliminar = async () => {
    // Aquí puedes enviar la contraseña y el ID del usuario al servidor
    // para confirmar y realizar la eliminación del perfil.
    console.log('Confirmar eliminación con contraseña:', contrasena);
    // Lógica para eliminar el perfil en el servidor

    // Cerrar el modal después de realizar la acción
    toggleDeleteModal();
  };

  const handleClickVolver = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <div className="EditProfile">
      <h1>Editar perfil</h1>
      <form onSubmit={handleGuardarCambios}>

      <FormGroup>
          <Label for="idParticipante">ID participante:</Label>
          <Input
            type="number"
            id="idParticipante"
            value={idParticipante}
            onChange={(e) => setIdParticipante(e.target.value)}            
          />
        </FormGroup>

        <FormGroup>
          <Label for="nombre">Nombre:</Label>
          <Input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}            
          />
        </FormGroup>

        <FormGroup>
          <Label for="apellido">Apellido:</Label>
          <Input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}           
          />
        </FormGroup>

        <FormGroup>
          <Label for="correo">Correo:</Label>
          <Input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}            
          />
        </FormGroup>

        <FormGroup>
          <Label for="contrasena">Contraseña:</Label>
          <Input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}            
          />
        </FormGroup>
        

        <FormGroup>
          <Label for="gamertag">Gamertag:</Label>
          <Input
            type="text"
            id="gamertag"
            value={gamertag}
            onChange={(e) => setGamertag(e.target.value)}            
          />
        </FormGroup>

        <FormGroup className="d-flex flex-column align-items-center">
            <Label for="foto">Foto de perfil:</Label>      
            {/* Botón para abrir el explorador de archivos */}
            <Button color="primary" onClick={toggleModal}>
            Seleccionar foto
            </Button>
        </FormGroup>

        <FormGroup className="mb-3 text-center">
            <Button color="primary" type="submit" className="mr-2">
             Guardar cambios
            </Button>
            <Button color="primary" onClick={handleClickVolver}>
             Volver
            </Button>
            <Button color="danger" onClick={handleEliminarPerfil}>
            Eliminar perfil
          </Button>
        </FormGroup>        

        <FormGroup className="mb-3 text-center"> 
          <Button color="danger" onClick={handleEliminarPerfil}>
            Eliminar perfil
          </Button>        
        </FormGroup>
      </form>

      {/* Modal para la selección de foto */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccionar foto</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="fotoModal">Foto</Label>
              <Input type="file" id="fotoModal" onChange={handleFileChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Confirmar
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirmar eliminación</ModalHeader>
        <ModalBody>
          <p>¿Estás seguro de que deseas eliminar tu perfil?</p>
          <Form>
            <FormGroup>
              <Label for="contrasenaEliminar">Ingresa tu contraseña:</Label>
              <Input
                type="password"
                id="contrasenaEliminar"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleConfirmarEliminar}>
            Eliminar
          </Button>{' '}
          <Button color="secondary" onClick={toggleDeleteModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditProfile;