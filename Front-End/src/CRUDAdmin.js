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
    dataFiltrada: [],
    modalActualizar: false,
    modalInsertar: false,
    formInsertar: {
      nombre: "",
      apellido: "",
      email: "",
      psswd: "",
    },
    formActualizar: {
      nombre: "",
      apellido: "",
      email: "",
    },
    busqueda: "",
  };

  componentDidMount() {
    fetch("http://127.0.0.1:5000/readadmin")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data, dataFiltrada: data });
      })
      .catch((error) => {
        alert("Error al obtener datos del servidor:", error);
      });
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      formActualizar: dato,
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

  editar = () => {
    const { nombre, apellido, email } = this.state.formActualizar;
    fetch("http://127.0.0.1:5000/updateadmin", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, apellido, email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ modalActualizar: false });
      })
      .catch(error => {
        console.error("Error al editar administrador:", error);
        alert("Error al editar administrador. Por favor, inténtalo nuevamente más tarde.");
        this.setState({ modalActualizar: false });
      });
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

  handleChangeActualizar = (e) => {
    this.setState({
      formActualizar: {
        ...this.state.formActualizar,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleChangeBuscar = async (e) => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    this.filtrarElementos();
  }

  filtrarElementos = () => {
    var search = this.state.dataFiltrada.filter(item => {
      if(item.id.toString().includes(this.state.busqueda) ||
      item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda.toLowerCase()) ||
      item.apellido.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda.toLowerCase()) ||
      item.email.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda.toLowerCase())){
        return item;
      }
    });
    this.setState({ data: search });
  }

  render() {

    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Nuevo administrador</Button>
          <div className="barraBusqueda">
            <input
              type="text"
              placeholder="Buscar"
              className="textField"
              name="busqueda"
              value={this.state.busqueda}
              onChange={this.handleChangeBuscar}
            />
            <Button className="btnBuscar" color="primary">Buscar</Button>
          </div>
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
                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Administrador</h3></div>
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
                onChange={this.handleChangeActualizar}
                value={this.state.formActualizar.nombre}
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
                onChange={this.handleChangeActualizar}
                value={this.state.formActualizar.apellido}
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
                onChange={this.handleChangeActualizar}
                value={this.state.formActualizar.email}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar()}
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
        </Modal>

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