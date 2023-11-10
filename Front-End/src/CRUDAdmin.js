import React from "react";
import "./CRUDAdmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

class CRUDAdmin extends React.Component {
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    formInsertar: {
      nombre: "",
      apellido: "",
      email: "",
      psswd: "",
    },
  };

  componentDidMount() {
    fetch("http://127.0.0.1:5000/readadmin")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data });
      })
      .catch((error) => {
        alert("Error al obtener datos del servidor:", error);
      });
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].admin = dato.admin;
        arreglo[contador].email = dato.email;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("¿Estás segur@ de eliminar el elemento " + dato.id + "?");
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  // const res = await fetch(`http://127.0.0.1:5000/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password })
  //     });
  //     const data = await res.json();

  insertar = () => {
    const { nombre, apellido, email, psswd } = this.state.formInsertar;
    fetch("http://127.0.0.1:5000/insertadmin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, apellido, email, psswd }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ modalInsertar: false });
      })
      .catch(error => {
        console.error("Error al insertar administrador:", error);
        alert("Error al insertar administrador. Por favor, inténtalo nuevamente más tarde.");
        this.setState({ modalInsertar: false });
      });
  }

  // insertar= ()=>{
  //   var valorNuevo= {...this.state.form};
  //   valorNuevo.id=this.state.data.length+1;
  //   var lista= this.state.data;
  //   lista.push(valorNuevo);
  //   this.setState({ modalInsertar: false, data: lista });
  // }

  handleChangeInsertar = (e) => {
    this.setState({
      formInsertar: {
        ...this.state.formInsertar,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Nuevo administrador</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.apellido}</td>
                  <td>{dato.email}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               ID:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Administrador: 
              </label>
              <input
                className="form-control"
                name="admin"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.admin}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Email: 
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.email}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal> */}

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Administrador</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Nombre: 
              </label>
              
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChangeInsertar}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChangeInsertar}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Email: 
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={this.handleChangeInsertar}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Contraseña: 
              </label>
              <input
                className="form-control"
                name="psswd"
                type="password"
                onChange={this.handleChangeInsertar}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default CRUDAdmin;