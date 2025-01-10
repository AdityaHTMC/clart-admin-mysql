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
  import { useNavigate, useParams } from "react-router-dom";
  import { FaEdit } from "react-icons/fa";
  import { FaTrashAlt } from "react-icons/fa";
  import { FaArrowLeft } from "react-icons/fa";
  import { Spinner } from "reactstrap";
  import ReactQuill from "react-quill";
  import "react-quill/dist/quill.snow.css";

import { Pagination, Stack } from "@mui/material";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";


  const CityList = () => {
    const navigate = useNavigate();

    const {id} = useParams();
  
    const { getCityList,cityList,addCity,editCity,cityDelete} = useMasterContext();

    
  
    const [formData, setFormData] = useState({
     title: "",
    });
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 15;

    const totalPages = cityList?.total && Math.ceil(cityList?.total / itemperPage);
  
    const [selectedvarity, setSelectedvarity] = useState({
      title: "",
      id: "",
    });
  
    useEffect(() => {
      if(id){
        const dataTosend ={
          state_id: id,
          page: currentPage,
          limit: itemperPage,
        }
        getCityList(dataTosend);
      }
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
      setSelectedvarity({ title: "", id: "" });
    };
  
    const onCloseModal = () => {
      setOpen(false);
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
      const dataToSend ={
        state_id: id,
        title:selectedvarity.title,
        city_id: selectedvarity.id,
      }
      editCity(dataToSend);
      onCloseModal2();
    };
  
    const handleDelete = (city_id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        const dataToDelete = {
          state_id: id,
          city_id: city_id,
        }
        cityDelete(dataToDelete);
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
      const dataToSend ={
        state_id: id,
        title:formData.title
      }
      addCity(dataToSend);
      onCloseModal(); 
    };

    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
  
    return (
      <>
        <CommonBreadcrumb title="City List"  />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(-1)} 
                  >
                    <FaArrowLeft size={20} color="#007bff" />
                    <span style={{ marginLeft: "5px", color: "#007bff" }}>
                      Back
                    </span>
                  </div>

                  <div className="mb-2">
                    <Button color="primary" onClick={onOpenModal}>
                    Add City
                    </Button>
                  </div>
                </div>
                  
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>City List</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cityList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : cityList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            cityList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.title}</td>
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
             Add City
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form>
              <FormGroup>
                <Label htmlFor="title" className="col-form-label">
                City
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  id="title"
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
  
        <Modal
          isOpen={modalOpen}
          toggle={onCloseModal2}
          className="modal-xg"

        >
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Edit City
            </h5>
          </ModalHeader>
          <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form>
              <FormGroup>
                <Label htmlFor="title" className="col-form-label">
                City:
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={selectedvarity.title}
                  onChange={handleInputChanges}
                  id="title"
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
  
  export default CityList;
  