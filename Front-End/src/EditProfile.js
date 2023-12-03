import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import './EditProfile.css';

function EditProfile() {
  const [formData, setFormData] = useState({
    idParticipante: '',
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    gamertag: '',
    foto: null,
  });

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [contrasenaEliminar, setContrasenaEliminar] = useState('');
  const [errors, setErrors] = useState({});
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleModal = () => setModal(!modal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    // Obtener el ID del localStorage
    const idParticipante = localStorage.getItem('id');
    setFormData({ ...formData, idParticipante });
  }, []);


  const datosValidos = () => {
    let errors = {};
    let isValid = true;

    // Validación del correo
    if(formData.correo){
      if (typeof formData.correo !== "undefined") {
        let lastAtPos = formData.correo.lastIndexOf('@');
        let lastDotPos = formData.correo.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formData.correo.indexOf('@@') === -1 && lastDotPos > 2 && (formData.correo.length - lastDotPos) > 2)) {
          isValid = false;
          errors["correo"] = "Correo inválido.";
        }
      }
    }      
    
    // Validación de la contraseña
    if(formData.contrasena){
      if (formData.contrasena.length < 8) {
        isValid = false;
        errors["contrasena"] = "La contraseña debe tener al menos 8 caracteres.";
      }
    }

     // Validación del gamertag
    if (formData.gamertag) {
      const regex = /^[a-zA-Z0-9]+$/; // Expresión regular para alfanuméricos sin caracteres especiales
      const startsWithAt = formData.gamertag.startsWith('@');
      const lengthValid = formData.gamertag.length >= 5;
      const containsOnlyAlphanumeric = regex.test(formData.gamertag.slice(1));

      if (!(startsWithAt && lengthValid && containsOnlyAlphanumeric)) {
        isValid = false;
        errors["gamertag"] = "Gamertag inválido. Debe comenzar con '@' y tener al menos 5 caracteres alfanuméricos.";
      }          
    } 

    setErrors(errors);
    return isValid;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      foto: file,
    });
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    if (!datosValidos()) {
      return;
    }
    console.log('Datos actualizados:', formData);
    
    try {
      const res = await fetch(`http://127.0.0.1:5000/participante/editarPerfil`, {
        method: 'PUT',
        headers: {            
            'Content-Type': 'application/json',
        },
          body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Respuesta del servidor:', data);
      if (data.message === 'Perfil actualizado exitosamente') {       
         // Verificar que los campos no estén vacíos
        if (formData.nombre) {
          localStorage.setItem('nombre', formData.nombre);
        }
        if (formData.apellido) {
          localStorage.setItem('apellido', formData.apellido);
        }

        if (formData.correo) {
          localStorage.setItem('email', formData.correo);
        }

        if (formData.contrasena) {
          localStorage.setItem('contrasena', formData.contrasena);
        }

        if (formData.gamertag) {
          localStorage.setItem('gamertag', formData.gamertag);
        }

        if (formData.foto) {
          localStorage.setItem('foto', formData.foto);
        }  
      } else if (data.error === 'Error, correo asociado a otra cuenta. Puede estar asociado a una cuenta no apta para participar.') {
        setErrors({correo: data.error });
      } else if (data.error === 'Error, tag ya asignado'){
        setErrors({gamertag: data.error});
      } else if (data.error) {
        // Mostrar el error en el modal
        setErrorMessage(data.error);
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        // Error de conexión rechazada (servidor no disponible)
        console.error('Error: El servidor no está disponible');
        // Mostrar el error en el modal
        setErrorMessage('Error: El servidor no está disponible, intenta más tarde');
        setIsErrorModalOpen(true);
      } else {
        // Otro tipo de error
        console.error('Error al enviar datos al servidor:', error);
        // Mostrar el error en el modal
        setErrorMessage('Error en el servidor, intenta más tarde');
        setIsErrorModalOpen(true);
      }
    }    
  };

  const handleEliminarPerfil = () => {
    toggleDeleteModal();
  };

  const handleConfirmarEliminar = async () => {
    // Lógica para eliminar el perfil en el servidor
    try {
      const res = await fetch(`http://127.0.0.1:5000/participante/eliminarPerfil`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idParticipante: formData.idParticipante,
          contrasenaEliminar: contrasenaEliminar,
        }),
      });
  
      const data = await res.json();
      console.log('Respuesta del servidor:', data); 
      
  
      // Cerrar el modal después de realizar la acción
      toggleDeleteModal();
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);      
    }
  };

  const handleCloseModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleClickVolver = () => {
    navigate('/participante'); // Navegar hacia atrás
  };

  return (
    <div className="EditProfile">
      <h1>Editar perfil</h1>
      <form onSubmit={handleGuardarCambios}>    

        <FormGroup>
          <Label for="nombre">Nombre:</Label>
          <Input
            type="text"
            id="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}            
          />
          {errors.nombre&& <div className="alert alert-danger">{errors.nombre}</div>}
        </FormGroup>

        <FormGroup>
          <Label for="apellido">Apellido:</Label>
          <Input
            type="text"
            id="apellido"
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}          
          />
          {errors.apellido&& <div className="alert alert-danger">{errors.apellido}</div>}
        </FormGroup>

        <FormGroup>
          <Label for="correo">Correo:</Label>
          <Input
            type="email"
            id="correo"
            value={formData.correo}
            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}           
          />
          {errors.correo&& <div className="alert alert-danger">{errors.correo}</div>}
        </FormGroup>

        <FormGroup>
          <Label for="contrasena">Contraseña:</Label>
          <Input
            type="password"
            id="contrasena"
            value={formData.contrasena}
            onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}            
          />
          {errors.contrasena&& <div className="alert alert-danger">{errors.contrasena}</div>}
        </FormGroup>
        

        <FormGroup>
          <Label for="gamertag">Gamertag:</Label>
          <Input
            type="text"
            id="gamertag"
            value={formData.gamertag}
            onChange={(e) => setFormData({ ...formData, gamertag: e.target.value })}            
          />
          {errors.gamertag&& <div className="alert alert-danger">{errors.gamertag}</div>}
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
             Volver a la vista de participante
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
                value={contrasenaEliminar}
                onChange={(e) => setContrasenaEliminar(e.target.value)}
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

      {isErrorModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;