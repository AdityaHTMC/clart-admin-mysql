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

import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";

const ShippingAgency = () => {
  const navigate = useNavigate();
  const {
    getShippingAgencyList,ShippingAgencyList,AddShipping_agency,editShippingAgencyList,deleteShippingAgency
  } = useMasterContext();

  const [formData, setFormData] = useState({
    agency_name: "",
    contact_person: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({
    agency_name: "",
    contact_person: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    id: "",
  });

  useEffect(() => {
    getShippingAgencyList();
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
    setEditFormData({ title: "", description: "", status: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
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
    AddShipping_agency(formData);
    onCloseModal();
  };

  const handleSubmits = () => {
    editShippingAgencyList(editFormData.id, editFormData);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
     deleteShippingAgency(id);
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Shipping List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Shipping Agency
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Agency Name</th>
                        <th>Contact Person</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pincode</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ShippingAgencyList?.loading ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : ShippingAgencyList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        ShippingAgencyList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.agency_name}</td>
                            <td>{product.contact_person}</td>
                            <td>{product.phone_number}</td>
                            <td>{product.email}</td>
                            <td>{product.address}</td>
                            <td>{product.city}</td>
                            <td>{product.state}</td>
                            <td>{product.pincode}</td>
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
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Shipping Agency
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="agency_name" className="col-form-label">
               Agency Name:
              </Label>
              <Input
                type="text"
                name="agency_name"
                value={formData.agency_name}
                onChange={handleInputChange}
                id="agency_name"
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="contact_person" className="col-form-label">
               Contact Person:
              </Label>
              <Input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleInputChange}
                id="contact_person"
              />
            </FormGroup>
            </div>
           
            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="phone_number" className="col-form-label">
               Phone Number:
              </Label>
              <Input
                type="number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                id="phone_number"
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="email" className="col-form-label">
               Email:
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                id="email"
              />
            </FormGroup>
            </div>

            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="address" className="col-form-label">
              Address:
              </Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                id="address"
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="city" className="col-form-label">
              city:
              </Label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                id="city"
              />
            </FormGroup>
            </div>

            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="state" className="col-form-label">
              State:
              </Label>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                id="state"
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="pincode" className="col-form-label">
              pincode:
              </Label>
              <Input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                id="pincode"
              />
            </FormGroup>
            </div>

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
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
            Edit Shipping Agency
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="agency_name" className="col-form-label">
               Agency Name:
              </Label>
              <Input
                type="text"
                name="agency_name"
                value={editFormData.agency_name}
                onChange={handleEditInputChange}
                id="agency_name"
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="contact_person" className="col-form-label">
              Contact Person:
              </Label>
              <Input
                type="text"
                name="contact_person"
                value={editFormData.contact_person}
                onChange={handleEditInputChange}
                id="contact_person"
              />
            </FormGroup>
            </div>
           
            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="phone_number" className="col-form-label">
               Phone Number:
              </Label>
              <Input
                type="number"
                name="phone_number"
                value={editFormData.phone_number}
                onChange={handleEditInputChange}
                id="phone_number"
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="email" className="col-form-label">
               Email:
              </Label>
              <Input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditInputChange}
                id="email"
              />
            </FormGroup>
            </div>

            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="address" className="col-form-label">
               Address:
              </Label>
              <Input
                type="text"
                name="address"
                value={editFormData.address}
                onChange={handleEditInputChange}
                id="address"
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="city" className="col-form-label">
               City:
              </Label>
              <Input
                type="text"
                name="city"
                value={editFormData.city}
                onChange={handleEditInputChange}
                id="city"
              />
            </FormGroup>
            </div>

            <div className="row">
            <FormGroup className="col-md-6">
              <Label htmlFor="state" className="col-form-label">
               State:
              </Label>
              <Input
                type="text"
                name="state"
                value={editFormData.state}
                onChange={handleEditInputChange}
                id="state"
              />
            </FormGroup>
            <FormGroup className="col-md-6">
              <Label htmlFor="pincode" className="col-form-label">
               Pincode:
              </Label>
              <Input
                type="text"
                name="pincode"
                value={editFormData.pincode}
                onChange={handleEditInputChange}
                id="pincode"
              />
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

export default ShippingAgency;
