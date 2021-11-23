import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

const baseUrl = "https://localhost:5001/api/teammates";

function TeamMates() {
    const [teammates, setTeammates] = useState([]);
    const [createData, setCreateData] = useState({});
    const [modalCreate, setModalCreate] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [modalUpdate, setModalUpdate] = useState(false);
  
    const toggleModalCreate = () => {
      setModalCreate(!modalCreate);
    };
  
    const toggleModalUpdate = () => {
      setModalUpdate(!modalUpdate);
    };
  
    const loadTeammates = () => {
      axios.get(baseUrl).then((res) => {
        setTeammates(res.data);
      });
    };
  
    const createTeammate = () => {
      axios.post(baseUrl, createData).then(() => {
        loadTeammates();
        toggleModalCreate();
      });
    };
  
    const updateTeammate = () => {
      axios.put(baseUrl, updateData).then(() => {
        loadTeammates();
        toggleModalUpdate();
      });
    };
  
    const deleteTeammate = (id) => {
      axios.delete(`${baseUrl}/${id}`).then(() => {
        setTeammates(
          teammates.filter((value, index, arr) => value.Id !== id)
        );
      });
    };
  
    useEffect(() => {
      loadTeammates();
    }, []);
  
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Nombre</th>
                        <th>Hogar</th>
                        <th>Nacionalidad</th>
                        <th>Equipo</th>
                        <th>
                          <Button color="link" onClick={toggleModalCreate}>
                            <i className="tim-icons icon-simple-add" />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {teammates.map((teammate) => (
                        <tr key={teammate.Id}>
                          <td>{teammate.Name}</td>
                          <td>{teammate.Home}</td>
                          <td>{teammate.Nationality}</td>
                          <td>{teammate.Team}</td>
                          <td>
                            <Button
                              color="link"
                              onClick={() => {
                                setUpdateData(teammate);
                                toggleModalUpdate();
                              }}
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                          </td>
                          <td>
                            <Button
                              color="link"
                              onClick={() => deleteTeammate(teammate.Id)}
                            >
                              <i className="tim-icons icon-trash-simple" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        {/* Create Modal */}
        <Modal
          modalClassName="modal-search"
          isOpen={modalCreate}
          toggle={toggleModalCreate}
        >
          <ModalHeader>Crear compañero de equipo</ModalHeader>
          <ModalBody>
            <Form>
              {/* Name Field */}
              <FormGroup>
                <label>Nombre</label>
                <Input
                  placeholder="Tony Stark"
                  onChange={(event) => {
                    setCreateData({
                      ...createData,
                      Name: event.target.value,
                    });
                  }}
                />
              </FormGroup>
  
              {/* Home Field */}
              <FormGroup>
                <label>Hogar</label>
                <Input
                  placeholder="Avengers Tower"
                  onChange={(event) => {
                    setCreateData({
                      ...createData,
                      Home: event.target.value,
                    });
                  }}
                />
              </FormGroup>
  
              {/* Nationality Field */}
              <FormGroup>
                <label>Nacionalidad</label>
                <Input
                  placeholder="Estados Unidos"
                  onChange={(event) => {
                    setCreateData({
                      ...createData,
                      Nationality: event.target.value,
                    });
                  }}
                />
              </FormGroup>
  
              {/* Team Field */}
              <FormGroup>
                <label>Equipo</label>
                <Input
                  onChange={(event) => {
                    setCreateData({
                      ...createData,
                      Team: event.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Form>
            <Button color="danger" outline onClick={toggleModalCreate}>
              Cancelar
            </Button>
            <Button color="success" onClick={createTeammate}>
              Aceptar
            </Button>
          </ModalBody>
        </Modal>
  
        {/* Update Modal */}
        <Modal
          modalClassName="modal-search"
          isOpen={modalUpdate}
          toggle={toggleModalUpdate}
        >
          <ModalHeader>Actualizar compañeros de equipo</ModalHeader>
          <ModalBody>
            <Form>
              {/* Name Field */}
              <FormGroup>
                <label>Nombre</label>
                <Input
                  defaultValue={updateData.Name}
                  placeholder="Tony Stark"
                  onChange={(event) => {
                    setUpdateData({
                      ...updateData,
                      Name: event.target.value,
                    });
                  }}
                />
              </FormGroup>
  
              {/* Home Field */}
              <FormGroup>
                <label>Hogar</label>
                <Input
                  defaultValue={updateData.Home}
                  placeholder="Avengers Tower"
                  onChange={(event) => {
                    setUpdateData({
                      ...updateData,
                      Home: event.target.value,
                    });
                  }}
                />
              </FormGroup>
  
              {/* Nationality Field */}
              <FormGroup>
                <label>Nacionalidad</label>
                <Input
                  defaultValue={updateData.Nationality}
                  placeholder="Estados Unidos"
                  onChange={(event) => {
                    setUpdateData({
                      ...updateData,
                      Nationality: event.target.value,
                    });
                  }}
                />
              </FormGroup>
  
              {/* Team Field */}
              <FormGroup>
                <label>Equipo</label>
                <Input
                  defaultValue={updateData.Team}
                  onChange={(event) => {
                    setUpdateData({
                      ...updateData,
                      Team: event.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Form>
            <Button color="danger" outline onClick={toggleModalUpdate}>
              Cancelar
            </Button>
            <Button color="success" onClick={updateTeammate}>
              Aceptar
            </Button>
          </ModalBody>
        </Modal>
      </>
    );
}

export default TeamMates;
