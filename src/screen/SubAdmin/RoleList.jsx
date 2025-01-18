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
  
  const RoleList = () => {
    const navigate = useNavigate();
  
    const { getRoleList,roleList,addRole,editRoleList} =
      useMasterContext();
  

  
    const [formData, setFormData] = useState({
      role: "",
    });
  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;
  
    const totalPages = roleList?.total && Math.ceil(roleList?.total / itemperPage);
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
  
    const [selectedvarity, setSelectedvarity] = useState({
      role: "",
      id: "",
    });
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getRoleList(dataToSend);
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
      setSelectedvarity({
        role: "",
        id: "",
      });
    };
  
    const onCloseModal = () => {
      setOpen(false);
      setFormData({
        role: "",
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
  
    // Handle submit for updating the brand
    const handleSubmits = () => {
      const dataToSend = {
        role: selectedvarity.role,
      }
      editRoleList(selectedvarity.id,dataToSend);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // DeleteParameterGr(id);
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
        addRole(formData);
      onCloseModal();
    };
  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Roles Management" />
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
                          <th>Role Name </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roleList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : roleList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            roleList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.role}</td>
                              <td>
                                <div className="circelBtnBx">
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => onOpenModal2(product)}
                                  >
                                    <FaEdit />
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
          className="modal-xg" 
        >
          <ModalHeader toggle={onCloseModal}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Add
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label htmlFor="role" className="col-form-label">
                  Role Name
                </Label>
                <Input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  id="role"
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
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label htmlFor="role" className="col-form-label">
                 Role Name:
                </Label>
                <Input
                  type="text"
                  name="role"
                  value={selectedvarity.role}
                  onChange={handleInputChanges}
                  id="role"
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
  
  export default RoleList;
  