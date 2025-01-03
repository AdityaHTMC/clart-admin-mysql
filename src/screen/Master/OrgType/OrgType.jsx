/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
  Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useMasterContext } from "../../../helper/MasterProvider";
import CommonBreadcrumb from "../../../component/common/bread-crumb";

const OrgType = () => {
  const navigate = useNavigate();
  const {
    getOrgTypeList,
    orgTypeList,
    addOrgType,
    editOrgType,
    deleteOrgType,
  } = useMasterContext();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({
    title: "",
    type: "",
  });

  useEffect(() => {
    getOrgTypeList();
  }, []);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onOpenModal2 = (product) => {
    setEditFormData(product);
    setModalOpen(true);
  };

  const onCloseModal2 = () => {
    setModalOpen(false);
    setEditFormData({ title: "", type: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addOrgType(formData);
    onCloseModal();
  };

  const handleSubmits = () => {
    editOrgType(editFormData.id, editFormData);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteOrgType(id);
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Organization Type List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Organization Type
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orgTypeList?.loading ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : orgTypeList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        orgTypeList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.title}</td>
                            <td>{product.type}</td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => onOpenModal2(product)}
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => handleDelete(product.id)}
                                >
                                  <FaTrashAlt />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title fw-bold" id="exampleModalLabel2">
            Add Details
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="row gy-3">
              {/* Title Input */}
              <FormGroup className="col-md-6">
                <Label htmlFor="title" className="form-label">
                  Title:
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  id="title"
                  className="form-control"
                  placeholder="Enter title"
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label className="form-label">Type:</Label>
                <div className="d-flex flex-column gap-2">
                  <Label
                    check
                    className="form-check-label d-flex align-items-center gap-2"
                  >
                    <Input
                      type="radio"
                      name="type"
                      value="Government"
                      checked={formData.type === "Government"}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <span>Government</span>
                  </Label>
                  <Label
                    check
                    className="form-check-label d-flex align-items-center gap-2"
                  >
                    <Input
                      type="radio"
                      name="type"
                      value="Private"
                      checked={formData.type === "Private"}
                      onChange={handleInputChange}
                      className="form-check-input"
                    />
                    <span>Private</span>
                  </Label>
                </div>
              </FormGroup>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Button color="primary" onClick={handleSubmit} className="me-2">
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalOpen} toggle={onCloseModal2}>
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit 
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="row">
            <FormGroup className="col-md-6">
                <Label htmlFor="title" className="form-label">
                  Title:
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditInputChange}
                  id="title"
                  className="form-control"
                  placeholder="Enter title"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label className="form-label">Type:</Label>
                <div className="d-flex flex-column gap-2">
                  <Label
                    check
                    className="form-check-label d-flex align-items-center gap-2"
                  >
                    <Input
                      type="radio"
                      name="type"
                      value="Government"
                      checked={editFormData.type === "Government"}
                      onChange={handleEditInputChange}
                      className="form-check-input"
                    />
                    <span>Government</span>
                  </Label>
                  <Label
                    check
                    className="form-check-label d-flex align-items-center gap-2"
                  >
                    <Input
                      type="radio"
                      name="type"
                      value="Private"
                      checked={editFormData.type === "Private"}
                      onChange={handleEditInputChange}
                      className="form-check-input"
                    />
                    <span>Private</span>
                  </Label>
                </div>
              </FormGroup>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmits}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal2}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default OrgType;
