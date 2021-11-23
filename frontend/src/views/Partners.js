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

const baseUrl = "https://localhost:5001/api/Partners";

function Partners() {
  const [partners, setPartners] = useState([]);
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

  const loadData = () => {
    axios.get(baseUrl).then((res) => {
      setPartners(res.data);
    });
  };

  const createPartner = () => {
    axios.post(baseUrl, createData).then(() => {
      loadData();
      toggleModalCreate();
    });
  };

  const updatePartner = () => {
    axios.put(baseUrl, updateData).then(() => {
      loadData();
      toggleModalUpdate();
    });
  };

  const deletePartner = (id) => {
    axios.delete(`${baseUrl}/${id}`).then(() => {
      setPartners(partners.filter((value, index, arr) => value.Id !== id));
    });
  };

  useEffect(() => {
    loadData();
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
                      <th>Aporte</th>
                      <th>Hogar</th>
                      <th>Nacionalidad</th>
                      <th>
                        <Button color="link" onClick={toggleModalCreate}>
                          <i className="tim-icons icon-simple-add" />
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {partners.map((partner) => (
                      <tr key={partner.Id}>
                        <td>{partner.Name}</td>
                        <td>${partner.ProvidedResources}</td>
                        <td>{partner.Home}</td>
                        <td>{partner.Nationality}</td>
                        <td>
                          <Button
                            color="link"
                            onClick={() => {
                              setUpdateData(partner);
                              toggleModalUpdate();
                            }}
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                        </td>
                        <td>
                          <Button
                            color="link"
                            onClick={() => deletePartner(partner.Id)}
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
        <ModalHeader>Crear patrocinador</ModalHeader>
        <ModalBody>
          <Form>
            {/* Name Field */}
            <FormGroup>
              <label>Nombre</label>
              <Input
                placeholder="Steve Rogers"
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

            {/* Nationality */}
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

            {/* Provided Resources Field */}
            <FormGroup>
              <label>Aportes</label>
              <Input
                placeholder="$1000"
                type="number"
                onChange={(event) => {
                  setCreateData({
                    ...createData,
                    ProvidedResources: event.target.value,
                  });
                }}
              />
            </FormGroup>
          </Form>
          <Button color="danger" outline onClick={toggleModalCreate}>
            Cancelar
          </Button>
          <Button color="success" onClick={createPartner}>
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
        <ModalHeader>Actualizar patrocinador</ModalHeader>
        <ModalBody>
          <Form>
            {/* Name Field */}
            <FormGroup>
              <label>Nombre</label>
              <Input
                defaultValue={updateData.Name}
                placeholder="Steve Rogers"
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

            {/* Nationality */}
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

            {/* Provided Resources Field */}
            <FormGroup>
              <label>Aportes</label>
              <Input
                defaultValue={updateData.ProvidedResources}
                placeholder="$1000"
                type="number"
                onChange={(event) => {
                  setUpdateData({
                    ...updateData,
                    ProvidedResources: event.target.value,
                  });
                }}
              />
            </FormGroup>
          </Form>
          <Button color="danger" outline onClick={toggleModalUpdate}>
            Cancelar
          </Button>
          <Button color="success" onClick={updatePartner}>
            Aceptar
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Partners;
