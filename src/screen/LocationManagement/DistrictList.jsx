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


  const DistrictList = () => {
    const navigate = useNavigate();

    const {id} = useParams();
  
    const {  addDistrict,editDistrict,getdistrictList,districtList,DistrictDelete} = useMasterContext();

    
  
    const [formData, setFormData] = useState({
      district: "",
    });
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 15;

    const totalPages = districtList?.total && Math.ceil(districtList?.total / itemperPage);
  
    const [selectedvarity, setSelectedvarity] = useState({
      district: "",
      id: "",
    });
  
    useEffect(() => {
      if(id){
        const dataTosend ={
          state_id: id,
          page: currentPage,
          limit: itemperPage,
        }
        getdistrictList(dataTosend);
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
      setSelectedvarity({ title: "", image: "", _id: "" });
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
        district:selectedvarity.district,
        district_id: selectedvarity.id,
      }
      editDistrict(dataToSend);
      onCloseModal2();
    };
  
    const handleDelete = (districtId) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        const dataToDelete = {
          state_id: id,
          district_id: districtId,
        }
        DistrictDelete(dataToDelete);
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
        district:formData.district
      }
      addDistrict(dataToSend);
      onCloseModal(); 
    };

    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
  
    return (
      <>
        <CommonBreadcrumb title="District List"  />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
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
                    Add District
                    </Button>
                  </div>
                </div>
                  
                   
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>District List</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {districtList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : districtList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            districtList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.district}</td>
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
             Add District
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form>
              <FormGroup>
                <Label htmlFor="district" className="col-form-label">
                District
                </Label>
                <Input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  id="district"
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
              Edit District
            </h5>
          </ModalHeader>
          <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form>
              <FormGroup>
                <Label htmlFor="district" className="col-form-label">
                 District:
                </Label>
                <Input
                  type="text"
                  name="district"
                  value={selectedvarity.district}
                  onChange={handleInputChanges}
                  id="district"
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
  
  export default DistrictList;
  