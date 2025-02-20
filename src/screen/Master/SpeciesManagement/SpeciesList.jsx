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
import { useMasterContext } from "../../../helper/MasterProvider";
import CommonBreadcrumb from "../../../component/common/bread-crumb";

  const SpeciesList = () => {
    const navigate = useNavigate();
  
    const {  getSpeciesMasterList,speciesMasterList,addSpeciesMasterList,editSpeciesMasterList,DeleteSpecies,allspecies } = useMasterContext();
   
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;
  
    const totalPages =
    speciesMasterList?.total && Math.ceil(speciesMasterList?.total / itemperPage);

    const [formData, setFormData] = useState({
      species: "",
      type: "",
    });
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
  
    const [selectedvarity, setSelectedvarity] = useState({
      species: "",
      type: "",
      id: "",
    });
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
    getSpeciesMasterList(dataToSend);
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
      setSelectedvarity({ species: "", type: "", id: "", });
    };
  
    const onCloseModal = () => {
      setOpen(false);
      setFormData({ species: "" , type:""  });
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
      editSpeciesMasterList(selectedvarity.id, selectedvarity);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        DeleteSpecies(id);
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
      addSpeciesMasterList(formData);
      onCloseModal(); // Close modal after saving
    };

    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Breed List"  />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add Breed
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Breed</th>
                          
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {speciesMasterList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : speciesMasterList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            speciesMasterList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.species}</td>
                              
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
              Add Species
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="species" className="col-form-label">
                  Species Name :
                </Label>
                <Input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={handleInputChange}
                  id="species"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="type" className="col-form-label">
                  Type :
                </Label>
                <Input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  id="type"
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
                <Label htmlFor="species" className="col-form-label">
                  Species
                </Label>
                <Input
                  type="text"
                  name="species"
                  value={selectedvarity.species}
                  onChange={handleInputChanges}
                  id="species"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="type" className="col-form-label">
                  Type :
                </Label>
                <Input
                  type="text"
                  name="type"
                  value={selectedvarity.type}
                  onChange={handleInputChanges}
                  id="type"
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
  
  export default SpeciesList;
  