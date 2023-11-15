import React from "react";
import "./CRUDTorneo.css";
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

class CRUDTorneo extends React.Component {
  state = {
    data: [],
    dataFiltrada: [],
    modalActualizar: false,
    modalInsertar: false,
    modalEliminar: false,
    formInsertar: {
      nombre: "",
      fecha: "",
      hora: "",
    },
    formActualizar: {
      id: null,
      nombre: "",
      fecha: "",
      hora: "",
    },
    torneoAEliminar: null,
    busqueda: "",
  };

  componentDidMount() {
    this.obtenerTorneos();
  }

  obtenerTorneos = () => {
    fetch("http://127.0.0.1:5000/torneo/readtorneos")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data, dataFiltrada: data });
      })
      .catch((error) => {
        alert("Error al obtener datos del servidor:", error);
      });
  };

  mostrarTodosTorneos = () => {
    // Realiza la redirección a la nueva página
    window.location.href = "http://localhost:5000/torneo/readtorneos";
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      formActualizar: { ...dato },
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      formInsertar: {
        nombre: "",
        fecha: "",
        hora: "",
      },
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEliminar = (dato) => {
    this.setState({
      modalEliminar: true,
      torneoAEliminar: dato.id,
    });
  };

  cerrarModalEliminar = () => {
    this.setState({ modalEliminar: false });
  };

  editar = () => {
    const { formActualizar } = this.state;
    fetch(`http://127.0.0.1:5000/torneo/updatetorneo/${formActualizar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formActualizar),
    })
      .then((response) => response.json())
      .then(() => {
        this.obtenerTorneos();
        this.cerrarModalActualizar();
      })
      .catch((error) => {
        alert("Error al actualizar el torneo:", error);
      });
  };

  eliminar = () => {
    const { torneoAEliminar } = this.state;
    fetch(`http://127.0.0.1:5000/torneo/deletetorneo/${torneoAEliminar}`, {
      method: "DELETE",
    })
      .then(() => {
        this.obtenerTorneos();
        this.cerrarModalEliminar();
      })
      .catch((error) => {
        alert("Error al eliminar el torneo:", error);
      });
  };

  insertar = () => {
    const { formInsertar } = this.state;
    fetch("http://127.0.0.1:5000/torneo/createtorneo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInsertar),
    })
      .then((response) => response.json())
      .then(() => {
        this.obtenerTorneos();
        this.cerrarModalInsertar();
      })
      .catch((error) => {
        alert("Error al insertar el torneo:", error);
      });
  };

  handleChangeInsertar = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formInsertar: {
        ...prevState.formInsertar,
        [name]: value,
      },
    }));
  };

  handleChangeActualizar = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formActualizar: {
        ...prevState.formActualizar,
        [name]: value,
      },
    }));
  };

  handleChangeBuscar = (e) => {
    const { value } = e.target;
    this.setState({ busqueda: value }, () => {
      this.filtrarElementos();
    });
  };

  filtrarElementos = () => {
    const { data, busqueda } = this.state;
    const dataFiltrada = data.filter(
      (elemento) =>
        elemento.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.fecha.toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.hora.toLowerCase().includes(busqueda.toLowerCase())
    );
    this.setState({ dataFiltrada });
  };

  render() {
    const {
      dataFiltrada,
      modalActualizar,
      modalInsertar,
      modalEliminar,
      formInsertar,
      formActualizar,
    } = this.state;

    return (
      <Container className="CRUDTorneo">
        <br />
        <div className="d-flex justify-content-between">
          <Button
            style={{ marginRight: '10px' }}
            color="success"
            onClick={() => this.mostrarModalInsertar()}
          >
            Nuevo Torneo
          </Button>
          <Button
            style={{ marginRight: '10px' }}
            color="success"
            onClick={() => this.mostrarTodosTorneos()}
          >
            Ver Torneos Actuales
          </Button>
        </div>
        <div className="barraBusqueda">
          <input
            type="text"
            placeholder="Buscar"
            className="textField"
            name="busqueda"
            value={this.state.busqueda}
            onChange={this.handleChangeBuscar}
          />
          <Button className="btnBuscar" color="primary">
            Buscar
          </Button>
        </div>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {dataFiltrada.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.nombre}</td>
                <td>{dato.fecha}</td>
                <td>{dato.hora}</td>
                <td>
                  <Button
                    color="primary"
                    onClick={() => this.mostrarModalActualizar(dato)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    color="danger"
                    onClick={() => this.mostrarModalEliminar(dato)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* ... Modales ... */}
        <Modal isOpen={modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Actualizar Torneo</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChangeActualizar}
                value={formActualizar.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha:</label>
              <input
                className="form-control"
                name="fecha"
                type="text"
                onChange={this.handleChangeActualizar}
                value={formActualizar.fecha}
              />
            </FormGroup>
            <FormGroup>
              <label>Hora:</label>
              <input
                className="form-control"
                name="hora"
                type="text"
                onChange={this.handleChangeActualizar}
                value={formActualizar.hora}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editar()}>
              Actualizar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Torneo</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChangeInsertar}
                value={formInsertar.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha:</label>
              <input
                className="form-control"
                name="fecha"
                type="text"
                onChange={this.handleChangeInsertar}
                value={formInsertar.fecha}
              />
            </FormGroup>
            <FormGroup>
              <label>Hora:</label>
              <input
                className="form-control"
                name="hora"
                type="text"
                onChange={this.handleChangeInsertar}
                value={formInsertar.hora}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalHeader>
            <div>
              <h3>Eliminar Torneo</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <p>¿Estás seguro que deseas eliminar el torneo?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.eliminar()}>
              Confirmar
            </Button>
            <Button color="secondary" onClick={() => this.cerrarModalEliminar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default CRUDTorneo;