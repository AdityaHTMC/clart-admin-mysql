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

const PermissionList = () => {
  const navigate = useNavigate();

  const {
    getpermissionList,permissionList,addPermission,
    getDropDownRoleList,
    dropdownRoleList,
    getDropDownMenuList,
    dropdownMenuList,editpermissionList,Deletepermission
  } = useMasterContext();

  const [formData, setFormData] = useState({
    role_id: "",
    menu_id: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
  permissionList?.total && Math.ceil(permissionList?.total / itemperPage);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    role_id: "",
    menu_id: "",
    id:"",
  });

  useEffect(() => {
    getDropDownRoleList();
    getDropDownMenuList();
  }, []);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getpermissionList(dataToSend);
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
        role_id: "",
        menu_id: "",
        id: "",
    });
  };

  console.log(selectedvarity, 'edit')

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
      role_id: "",
      menu_id: "",
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
     role_id: selectedvarity.role_id, 
     menu_id: selectedvarity.menu_id,
    };
    editpermissionList(selectedvarity.id, dataToSend);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
     Deletepermission(id);
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
    addPermission(formData);
    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Permission Management" />
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
                        <th>Menu Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissionList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : permissionList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        permissionList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.role_name}</td>
                            <td>{product.menu_name}</td>
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
            <FormGroup className="col-md-6">
              <Label htmlFor="menu_id" className="col-form-label">
                Menu:
              </Label>
              <Input
                type="select"
                name="menu_id"
                value={formData.menu_id}
                onChange={handleInputChange}
                id="menu_id"
              >
                <option value="">Select Menu</option>
                {dropdownMenuList?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </Input>
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
            <FormGroup className="col-md-6">
              <Label htmlFor="menu_id" className="col-form-label">
                Menu:
              </Label>
              <Input
                type="select"
                name="menu_id"
                value={selectedvarity.menu_id}
                onChange={handleInputChanges}
                id="menu_id"
              >
                <option value="">Select Menu</option>
                {dropdownMenuList?.data?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </Input>
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

export default PermissionList;
