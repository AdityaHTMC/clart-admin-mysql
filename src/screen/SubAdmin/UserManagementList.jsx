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
    FormText,
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
  
  const UserManagementList = () => {
    const navigate = useNavigate();
  
    const {
      getDropDownRoleList,
      dropdownRoleList,
      getUserMagList,userMagList,addUserManagement,editUserMagList,DeleteUserMag
    } = useMasterContext();
  
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile:"",
        role_id: "",
        password: "",
    });
  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;
  
    const totalPages =
    userMagList?.total && Math.ceil(userMagList?.total / itemperPage);
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState("");
  
    const [selectedvarity, setSelectedvarity] = useState({
        name: "",
        email: "",
        mobile:"",
        role_id: "",
        password: "",
        id:"",
    });
  
    useEffect(() => {
      getDropDownRoleList();
    }, []);
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getUserMagList(dataToSend);
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
        name: "",
        email: "",
        mobile:"",
        role_id: "",
        password: "",
        id: "",
      });
    };

    const onCloseModal = () => {
      setOpen(false);
      setFormData({
        name: "",
        email: "",
        mobile:"",
        role_id: "",
        password: "",
      });
    };
  
    // Handle form input change
    const handleInputChanges = (e) => {
      const { name, value } = e.target;
      if (name === "mobile" && value.length > 10) {
        setError("Mobile number cannot exceed 10 digits"); // Set error message
        return;
      } else {
        setError(""); // Clear error message if valid
      }
      setSelectedvarity((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    // Handle submit for updating the brand
    const handleSubmits = () => {
      const dataToSend = {
        name: selectedvarity.name,
        email: selectedvarity.e,
        mobile:selectedvarity.mobile,
        role_id: selectedvarity.role_id,
      };
      if (selectedvarity.password) {
        dataToSend.password = selectedvarity.password;
      }
      editUserMagList(selectedvarity.id, dataToSend);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        DeleteUserMag(id);
      }
    };
  
    // Handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;

      if (name === "mobile" && value.length > 10) {
        setError("Mobile number cannot exceed 10 digits"); // Set error message
        return;
      } else {
        setError(""); // Clear error message if valid
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    // Handle form submission
    const handleSubmit = () => {
      addUserManagement(formData);
      onCloseModal();
    };
  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="User Management" />
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
                          <th>Name </th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userMagList?.loading ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : userMagList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          userMagList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.name || "NA"}</td>
                              <td>{product.mobile || "NA"}</td>
                              <td>{product.email || "NA"}</td>
                              <td> {product.role_name || "NA"} </td>
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
              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="name" className="col-form-label">
                 Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  id="name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="role_id" className="col-form-label">
                  Role:
                </Label>
                <Input
                  type="select"
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleInputChange}
                  id="role_id"
                >
                  <option value="">Select Role</option>
                  {dropdownRoleList?.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.role}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              </div>
              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="email" className="col-form-label">
                 Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  id="email"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="mobile" className="col-form-label">
                 Mobile
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                />
                {error && <FormText color="danger">{error}</FormText>}
              </FormGroup>
              </div>
              <div className="row">
                <FormGroup className="col-md-6">
                <Label htmlFor="password" className="col-form-label">
                 Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  id="password"
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
  
        <Modal isOpen={modalOpen} toggle={onCloseModal2} className="modal-xg">
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Edit
            </h5>
          </ModalHeader>
          <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form>
              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="name" className="col-form-label">
                 Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={selectedvarity.name}
                  onChange={handleInputChanges}
                  id="name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="role_id" className="col-form-label">
                  Role:
                </Label>
                <Input
                  type="select"
                  name="role_id"
                  value={selectedvarity.role_id}
                  onChange={handleInputChanges}
                  id="role_id"
                >
                  <option value="">Select Role</option>
                  {dropdownRoleList?.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.role}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              </div>
              <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="email" className="col-form-label">
                 Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={selectedvarity.email}
                  onChange={handleInputChanges}
                  id="email"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="mobile" className="col-form-label">
                 Mobile
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  value={selectedvarity.mobile}
                  onChange={handleInputChanges}
                  id="mobile"
                />
                {error && <FormText color="danger">{error}</FormText>}
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
  
  export default UserManagementList;
  