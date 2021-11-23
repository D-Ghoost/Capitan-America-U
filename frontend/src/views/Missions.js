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

const baseUrl = "https://localhost:5001/api/Missions";

function Missions() {
  const [missions, setMissions] = useState([]);
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

  const loadMissions = () => {
    axios.get(baseUrl).then((res) => {
      setMissions(res.data);
    });
  };

  const createMission = () => {
    axios.post(baseUrl, createData).then(() => {
      loadMissions();
      toggleModalCreate();
    });
  };

  const updateMission = () => {
    axios.put(baseUrl, updateData).then(() => {
      loadMissions();
      toggleModalUpdate();
    });
  };

  const deleteMissions = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(() => {
      setMissions(missions.filter((value, index, arr) => value.Id !== id));
    });
  };

  useEffect(() => {
    loadMissions();
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
                      <th>Descripción</th>
                      <th>Lugar</th>
                      <th>Fecha</th>
                      <th>
                        <Button color="link" onClick={toggleModalCreate}>
                          <i className="tim-icons icon-simple-add" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {missions.map((mission) => (
                      <tr key={mission.Id}>
                        <td>{mission.Description}</td>
                        <td>{mission.Place}</td>
                        <td>{mission.MissionDate}</td>
                        <td>
                          <Button
                            color="link"
                            onClick={() => {
                              setUpdateData(mission);
                              toggleModalUpdate();
                            }}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                        </td>
                        <td>
                          <Button
                            color="link"
                            onClick={() => deleteMissions(mission.Id)}
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
        <ModalHeader>Crear misión</ModalHeader>
        <ModalBody>
          <Form>
            {/* Place Field */}
            <FormGroup>
              <label>Lugar</label>
              <Input
                placeholder="Wakanda"
                onChange={(event) => {
                  setCreateData({
                    ...createData,
                    Place: event.target.value,
                  });
                }}
              />
            </FormGroup>

            {/* Date Field */}
            <FormGroup>
              <label>Fecha</label>
              <Input
                type="date"
                onChange={(event) => {
                  setCreateData({
                    ...createData,
                    MissionDate: event.target.value,
                  });
                }}
              />
            </FormGroup>

            {/* Description Field */}
            <FormGroup>
              <label>Descripción</label>
              <Input
                placeholder="Salvar a Peggie"
                onChange={(event) => {
                  setCreateData({
                    ...createData,
                    Description: event.target.value,
                  });
                }}
              />
            </FormGroup>
          </Form>
          <Button color="danger" outline onClick={toggleModalCreate}>
            Cancelar
          </Button>
          <Button color="success" onClick={createMission}>
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
        <ModalHeader>Actualizar misión</ModalHeader>
        <ModalBody>
          <Form>
            {/* Place Field */}
            <FormGroup>
              <label>Lugar</label>
              <Input
                defaultValue={updateData.Place}
                onChange={(event) => {
                  setUpdateData({
                    ...updateData,
                    Place: event.target.value,
                  });
                }}
              />
            </FormGroup>

            {/* Date Field */}
            <FormGroup>
              <label>Fecha</label>
              <Input
                type="date"
                onChange={(event) => {
                  setUpdateData({
                    ...updateData,
                    MissionDate: event.target.value,
                  });
                }}
              />
            </FormGroup>

            {/* Description */}
            <FormGroup>
              <label>Descripción</label>
              <Input
                defaultValue={updateData.Description}
                onChange={(event) => {
                  setUpdateData({
                    ...updateData,
                    Description: event.target.value,
                  });
                }}
              />
            </FormGroup>

          </Form>
          <Button color="danger" outline onClick={toggleModalUpdate}>
            Cancelar
          </Button>
          <Button color="success" onClick={updateMission}>
            Aceptar
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Missions;
