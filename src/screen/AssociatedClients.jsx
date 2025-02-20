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
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useCommonContext } from "../helper/CommonProvider";

const AssociatedClients = () => {
  const navigate = useNavigate();

  const {
    addAssociatedClients,
    editAssociatedClients,
    getAssociatedCients,
    associatedClientsList,
  } = useCommonContext();

  const [formData, setFormData] = useState({
    organization_name: "",
    logo: "",
    weblink: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages = associatedClientsList?.total && Math.ceil(associatedClientsList?.total / itemperPage);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    organization_name: "",
    logo: "",
    weblink: "",
    id: "",
  });

  useEffect(() => {
    getAssociatedCients();
  }, []);

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
    setSelectedvarity({
      name: "",
      collection_center_id: "",
      registration_number: "",
      id: "",
    });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
      name: "",
      collection_center_id: "",
      registration_number: "",
      id: "",
    });
  };

  // Handle form input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedvarity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      logo: e.target.files[0], // Store file object
    }));
  };

  // Handle submit for updating the brand
  const handleSubmits = () => {
    const dataToSend = {
      name: selectedvarity.name,
      collection_center_id: selectedvarity.collection_center_id,
      registration_number: selectedvarity.registration_number,
      id: selectedvarity.id,
    };
    editAssociatedClients(dataToSend);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // DeleteDoc(id);
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
    const formDataToSend = new FormData();

    formDataToSend.append("organization_name", formData.organization_name);
    formDataToSend.append("logo", formData.logo);
    formDataToSend.append("weblink", formData.weblink);

    addAssociatedClients(formDataToSend);
    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Associated Clients List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Logo</th>
                        <th>organization_name </th>
                    
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {associatedClientsList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : associatedClientsList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        associatedClientsList?.data?.map((product, index) => (
                          <tr key={index}>
                             <th>
                              {" "}
                              <img
                                src={product.logo}
                                alt="img"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />{" "}
                            </th>
                            <td>{product.organization_name}</td>
                           
                            
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

      <Modal isOpen={open} toggle={onCloseModal} className="modal-xg">
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <FormGroup>
              <Label htmlFor="organization_name" className="col-form-label">
               Organization Name
              </Label>
              <Input
                type="text"
                name="organization_name"
                value={formData.organization_name}
                onChange={handleInputChange}
                id="organization_name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="weblink" className="col-form-label">
               Weblink
              </Label>
              <Input
                type="number"
                name="weblink"
                value={formData.weblink}
                onChange={handleInputChange}
                id="weblink"
              />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="logo" className="col-form-label">
                  Upload Image
                </Label>
                <Input
                  id="logo"
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                />
              </FormGroup>
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

      <Modal isOpen={modalOpen} toggle={onCloseModal2} className="modal-xg">
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
            <FormGroup>
              <Label htmlFor="organization_name" className="col-form-label">
              Organization Name:
              </Label>
              <Input
                type="text"
                name="organization_name"
                value={selectedvarity.organization_name}
                onChange={handleInputChanges}
                id="organization_name"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="weblink" className="col-form-label">
               Weblink
              </Label>
              <Input
                type="text"
                name="weblink"
                value={selectedvarity.weblink}
                onChange={handleInputChanges}
                id="weblink"
              />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="logo" className="col-form-label">
                  Upload Image
                </Label>
                <Input
                  id="logo"
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                />
              </FormGroup>
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

export default AssociatedClients;
