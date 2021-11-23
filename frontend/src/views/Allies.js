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

const baseUrl = "https://localhost:5001/api/Supers";

function Allies() {
  const [allies, setAllies] = useState([]);
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

  const loadAllies = () => {
    axios.get(`${baseUrl}/allies`).then((res) => {
      setAllies(res.data);
    });
  };

  const createAlly = () => {
    createData.IsAlly = true;
    createData.IsEnemy = false;
    axios.post(baseUrl, createData).then(() => {
      loadAllies();
      toggleModalCreate();
    });
  };

  const updateAlly = () => {
    axios.put(baseUrl, updateData).then(() => {
      loadAllies();
      toggleModalUpdate();
    });
  };

  const deleteAlly = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(() => {
      setAllies(allies.filter((value, index, arr) => value.Id !== id));
    });
  };

  useEffect(() => {
    loadAllies();
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
                      <th>Descripción</th>
                      <th>
                        <Button color="link" onClick={toggleModalCreate}>
                          <i className="tim-icons icon-simple-add" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allies.map((ally) => (
                      <tr key={ally.Id}>
                        <td>{ally.Name}</td>
                        <td>{ally.Home}</td>
                        <td>{ally.Nationality}</td>
                        <td>{ally.Description}</td>
                        <td>
                          <Button
                            color="link"
                            onClick={() => {
                              setUpdateData(ally);
                              toggleModalUpdate();
                            }}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                        </td>
                        <td>
                          <Button
                            color="link"
                            onClick={() => deleteAlly(ally.Id)}
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
        <ModalHeader>Crear aliado</ModalHeader>
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

            {/* Description Field */}
            <FormGroup>
              <label>Descripción</label>
              <Input
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
          <Button color="success" onClick={createAlly}>
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
        <ModalHeader>Actualizar aliado</ModalHeader>
        <ModalBody>
          <Form>
            {/* Name Field */}
            <FormGroup>
              <label>Nombre</label>
              <Input
                defaultValue={updateData.Name}
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
                onChange={(event) => {
                  setUpdateData({
                    ...updateData,
                    Nationality: event.target.value,
                  });
                }}
              />
            </FormGroup>

            {/* Description Field */}
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
          <Button color="success" onClick={updateAlly}>
            Aceptar
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Allies;
