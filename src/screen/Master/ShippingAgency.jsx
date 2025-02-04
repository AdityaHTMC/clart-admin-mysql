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
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { FaEdit } from "react-icons/fa";
  import { FaTrashAlt } from "react-icons/fa";
  import { Spinner } from "reactstrap";
import { Pagination, Stack } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";


  const ShippingAgency = () => {
    const navigate = useNavigate();
  
    const {  getShippingAgencyList, ShippingAgencyList, AddShipping_agency, editShippingAgencyList, deleteShippingAgency, } = useMasterContext();
   
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;
  
    const totalPages =
    ShippingAgencyList?.total && Math.ceil(ShippingAgencyList?.total / itemperPage);

    const [formData, setFormData] = useState({
        agency_name : '', contact_person :'', phone_number:'', email:'', address:'', city:'', state:'', pincode:''
    });
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
  
    const [selectedvarity, setSelectedvarity] = useState({
    agency_name : '', contact_person :'', phone_number:'', email:'', address:'', city:'', state:'', pincode:''
    });
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getShippingAgencyList(dataToSend);
    }, [currentPage]);
  
    const onOpenModal = () => {
      setOpen(true);
    };
    const onOpenModal2 = (product) => {
      setSelectedvarity(product);
      setModalOpen(true);
    };
  
    // Close the modal
    const onCloseModal2 = () => {
      setModalOpen(false);
      setSelectedvarity({ agency_name : '', contact_person :'', phone_number:'', email:'', address:'', city:'', state:'', pincode:''});
    };
  
    const onCloseModal = () => {
      setOpen(false);
      setFormData({ agency_name : '', contact_person :'', phone_number:'', email:'', address:'', city:'', state:'', pincode:''});
    };
  

  
    // Handle form input change
    const handleInputChanges = (e) => {
      const { name, value } = e.target;
      setSelectedvarity((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    // Handle submit for updating the brand
    const handleSubmits = () => {
        editShippingAgencyList(selectedvarity.id, selectedvarity);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        deleteShippingAgency(id);
      }
    };
  
    // Handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  

  
    // Handle form submission
    const handleSubmit = () => {
      // Send formData to the backend
      AddShipping_agency(formData);
      onCloseModal(); // Close modal after saving
    };

    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Shipping Agency List"  />
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
                    <Stack className="rightPagination mt10" spacing={2}>
                      <Pagination
                        color="primary"
                        count={totalPages}
                        page={currentPage}
                        shape="rounded"
                        onChange={(event, value) => handlepagechange(value)}
                      />
                    </Stack>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
  
        <Modal
          isOpen={open}
          toggle={onCloseModal}
          className="modal-xg" // Increases the width
        >
          <ModalHeader toggle={onCloseModal}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Add Shipping Agency
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="agency_name" className="col-form-label">
                 Agency Name :
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
                <Label htmlFor="type" className="col-form-label">
                 Contact Person :
                </Label>
                <Input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleInputChange}
                  id="type"
                />
              </FormGroup>
              </div>
              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="phone_number" className="col-form-label">
                 Phone Number :
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
                 email :
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
                 Address :
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
                city :
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
                state :
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
                Pincode :
                </Label>
                <Input
                  type="text"
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
  
        <Modal
          isOpen={modalOpen}
          toggle={onCloseModal2}
          className="modal-xg"
       
        >
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Edit Species
            </h5>
          </ModalHeader>
          <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form onSubmit={(e) => e.preventDefault()}>
             

              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="agency_name" className="col-form-label">
                 Agency Name :
                </Label>
                <Input
                  type="text"
                  name="agency_name"
                  value={selectedvarity.agency_name}
                  onChange={handleInputChanges}
                  id="agency_name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="type" className="col-form-label">
                 Contact Person :
                </Label>
                <Input
                  type="text"
                  name="contact_person"
                  value={selectedvarity.contact_person}
                  onChange={handleInputChanges}
                  id="type"
                />
              </FormGroup>
              </div>
              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="phone_number" className="col-form-label">
                 Phone Number :
                </Label>
                <Input
                  type="number"
                  name="phone_number"
                  value={selectedvarity.phone_number}
                  onChange={handleInputChanges}
                  id="phone_number"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="email" className="col-form-label">
                 email :
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={selectedvarity.email}
                  onChange={handleInputChanges}
                  id="email"
                />
              </FormGroup>
              </div>

              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="address" className="col-form-label">
                 Address :
                </Label>
                <Input
                  type="text"
                  name="address"
                  value={selectedvarity.address}
                  onChange={handleInputChanges}
                  id="address"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="city" className="col-form-label">
                city :
                </Label>
                <Input
                  type="text"
                  name="city"
                  value={selectedvarity.city}
                  onChange={handleInputChanges}
                  id="city"
                />
              </FormGroup>
              </div>

              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="state" className="col-form-label">
                state :
                </Label>
                <Input
                  type="text"
                  name="state"
                  value={selectedvarity.state}
                  onChange={handleInputChanges}
                  id="state"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="pincode" className="col-form-label">
                Pincode :
                </Label>
                <Input
                  type="text"
                  name="pincode"
                  value={selectedvarity.pincode}
                  onChange={handleInputChanges}
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
  