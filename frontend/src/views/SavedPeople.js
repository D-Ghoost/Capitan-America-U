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

const baseUrl = "https://localhost:5001/api/savedpeople";

function SavedPeople() {
  const [savedPeople, setSavedPeople] = useState([]);
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

  const loadSavedPeople = () => {
    axios.get(baseUrl).then((res) => {
      setSavedPeople(res.data);
    });
  };

  const createSavedPeople = () => {
    axios.post(baseUrl, createData).then(() => {
      loadSavedPeople();
      toggleModalCreate();
    });
  };

  const updateSavedPeople = () => {
    axios.put(baseUrl, updateData).then(() => {
      loadSavedPeople();
      toggleModalUpdate();
    });
  };

  const deleteSavedPeople = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(() => {
      setSavedPeople(
        savedPeople.filter((value, index, arr) => value.Id !== id)
      );
    });
  };

  useEffect(() => {
    loadSavedPeople();
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
                      <th>Fecha de salvación</th>
                      <th>Lugar</th>
                      <th>
                        <Button color="link" onClick={toggleModalCreate}>
                          <i className="tim-icons icon-simple-add" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedPeople.map((savedPerson) => (
                      <tr key={savedPerson.Id}>
                        <td>{savedPerson.Name}</td>
                        <td>{savedPerson.Home}</td>
                        <td>{savedPerson.Nationality}</td>
                        <td>{savedPerson.SavedDate}</td>
                        <td>{savedPerson.SavedPlace}</td>
                        <td>
                          <Button
                            color="link"
                            onClick={() => {
                              setUpdateData(savedPerson);
                              toggleModalUpdate();
                            }}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                        </td>
                        <td>
                          <Button
                            color="link"
                            onClick={() => deleteSavedPeople(savedPerson.Id)}
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
        <ModalHeader>Crear persona salvada</ModalHeader>
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

            {/* Saved Date Field */}
            <FormGroup>
              <label>Fecha de salvación</label>
              <Input
                type="date"
                onChange={(event) => {
                  setCreateData({
                    ...createData,
                    SavedDate: event.target.value,
                  });
                }}
              />
            </FormGroup>

            {/* Saved Place Field */}
            <FormGroup>
              <label>Lugar de salvación</label>
              <Input
                onChange={(event) => {
                  setCreateData({
                    ...createData,
                    SavedPlace: event.target.value,
                  });
                }}
              />
            </FormGroup>
          </Form>
          <Button color="danger" outline onClick={toggleModalCreate}>
            Cancelar
          </Button>
          <Button color="success" onClick={createSavedPeople}>
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
        <ModalHeader>Actualizar persona salvada</ModalHeader>
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

            {/* Saved Date Field */}
            <FormGroup>
              <label>Fecha de salvación</label>
              <Input
                defaultValue={updateData.SavedDate}
                type="date"
                onChange={(event) => {
                  setUpdateData({
                    ...updateData,
                    SavedDate: event.target.value,
                  });
                }}
              />
            </FormGroup>

            {/* Saved Place Field */}
            <FormGroup>
              <label>Lugar de salvación</label>
              <Input
                defaultValue={updateData.SavedPlace}
                onChange={(event) => {
                  setUpdateData({
                    ...updateData,
                    SavedPlace: event.target.value,
                  });
                }}
              />
            </FormGroup>
          </Form>
          <Button color="danger" outline onClick={toggleModalUpdate}>
            Cancelar
          </Button>
          <Button color="success" onClick={updateSavedPeople}>
            Aceptar
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}

export default SavedPeople;
