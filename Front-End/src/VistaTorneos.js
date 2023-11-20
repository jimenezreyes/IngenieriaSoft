import React from "react";
import "./CRUDTorneo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import iconoJuego1 from "./iconos/iconoJuego1.png";
import iconoJuego2 from "./iconos/iconoJuego2.png";

class VistaTorneos extends React.Component {
  state = {
    data: [],
    dataFiltrada: [],
    busqueda: "",
  };

  componentDidMount() {
    fetch("http://127.0.0.1:5000/torneo/readtorneos")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data, dataFiltrada: data });
      })
      .catch((error) => {
        alert("Error al obtener datos del servidor:", error);
      });
  }

  handleChangeBuscar = async (e) => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    this.filtrarElementos();
  }

  filtrarElementos = () => {
    var search = this.state.dataFiltrada.filter(item => {
      return (
        item.id.toString().includes(this.state.busqueda) ||
        item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda.toLowerCase()) ||
        item.fechahora.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(this.state.busqueda.toLowerCase())
      );
    });
    this.setState({ data: search });
  }

  render() {
    return (
      <>
      <h1>  
        <img src={iconoJuego1} alt="Icono de juegos" style={{ height: '100px', marginRight: '20px' }} />
        Torneos Registrados 
        <img src={iconoJuego2} alt="Icono de juegos" style={{ height: '100px', marginLeft: '10px' }} /></h1>

        <Container className="CRUDAdmin">
          <br />
          <div className="barraBusqueda">
          <img src="lupa.png" alt="Ícono de búsqueda" style={{ height: '26px' }}/>{" "}
            <input
              type="text"
              placeholder="Buscar"
              className="textField"
              name="busqueda"
              value={this.state.busqueda}
              onChange={this.handleChangeBuscar}
            />
          </div>
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha y Hora</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.fechahora}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </>
    );
  }

}

export default VistaTorneos;