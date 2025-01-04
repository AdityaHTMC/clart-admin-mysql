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
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Pagination, Stack } from "@mui/material";

const Organization = () => {
  const navigate = useNavigate();
  const {
    getAllOrgTypeList,
    allorgtypeList,
    addOrg,
    getOrgList,
    orgList,
    editOrg,
    deleteOrg,
  } = useMasterContext();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    org_type: "",
    affiliation_by: "",
    roc: "",
    affiliation_certificate: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 15;

  const totalPages = orgList?.total && Math.ceil(orgList?.total / itemperPage);

  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    org_type: "",
    affiliation_by: "",
    roc: "",
    affiliation_certificate: "",
    status: "",
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      keyword_search: searchTerm,
    };
    getAllOrgTypeList();
    getOrgList(dataToSend);
  }, [currentPage, searchTerm]);

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

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      affiliation_certificate: e.target.files[0],
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
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("org_type", formData.org_type);
    formDataToSend.append("affiliation_by", formData.affiliation_by);
    formDataToSend.append("roc", formData.roc);
    if (formData.affiliation_certificate) {
      formDataToSend.append(
        "affiliation_certificate",
        formData.affiliation_certificate
      );
    }
    addOrg(formDataToSend);

    onCloseModal();
  };

  const handleSubmits = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", editFormData.name);
    formDataToSend.append("description", editFormData.description);
    formDataToSend.append("org_type", editFormData.org_type);
    formDataToSend.append("affiliation_by", editFormData.affiliation_by);
    formDataToSend.append("roc", editFormData.roc);
    if (editFormData.affiliation_certificate) {
      formDataToSend.append(
        "affiliation_certificate",
        editFormData.affiliation_certificate
      );
    }
    formDataToSend.append("status", editFormData.status);
    editOrg(editFormData.id, formDataToSend);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteOrg(id);
    }
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Organization List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Organization
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Affiliation By</th>
                        <th>ROC</th>
                        <th> Organization Type </th>
                        <th>status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orgList?.loading ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : orgList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        orgList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.affiliation_by || "NA"}</td>
                            <td>{product.roc || "NA"}</td>
                            <td>{product.organization_type || "NA"}</td>
                            <td>
                              <Badge
                                color={
                                  product.status === "Approved"
                                    ? "success"
                                    : product.status === "Not Approved"
                                    ? "danger"
                                    : product.status === "Pending"
                                    ? "warning"
                                    : "secondary" // default color if none match
                                }
                              >
                                {product.status || "NA"}
                              </Badge>
                            </td>
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
                    <Stack className="rightPagination mt10" spacing={2}>
                      <Pagination
                        color="primary"
                        count={totalPages}
                        page={currentPage}
                        shape="rounded"
                        onChange={(event, value) => handlepagechange(value)}
                      />
                    </Stack>
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
                <Label htmlFor="name" className="form-label">
                  Name:
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  id="name"
                  className="form-control"
                  placeholder="Enter name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="description" className="form-label">
                  Description:
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  id="description"
                  className="form-control"
                  placeholder="Enter description"
                />
              </FormGroup>
            </div>
            <div className="row gy-3">
              <FormGroup className="col-md-6">
                <Label htmlFor="org_type" className="col-form-label">
                  Org Type:
                </Label>
                <Input
                  type="select"
                  name="org_type"
                  value={formData.org_type}
                  onChange={handleInputChange}
                  id="org_type"
                >
                  <option value="">Select Org Type</option>
                  {allorgtypeList?.data?.map((variety) => (
                    <option key={variety.id} value={variety.id}>
                      {variety.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="affiliation_by" className="form-label">
                  Affiliation By:
                </Label>
                <Input
                  type="text"
                  name="affiliation_by"
                  value={formData.affiliation_by}
                  onChange={handleInputChange}
                  id="affiliation_by"
                  className="form-control"
                  placeholder="Enter affiliation by"
                />
              </FormGroup>
            </div>
            <div className="row gy-3">
              <FormGroup className="col-md-6">
                <Label htmlFor="roc" className="form-label">
                  ROC:
                </Label>
                <Input
                  type="text"
                  name="roc"
                  value={formData.roc}
                  onChange={handleInputChange}
                  id="roc"
                  className="form-control"
                  placeholder="Enter roc by"
                />
              </FormGroup>
              <div className="col-md-6">
                <FormGroup>
                  <Label
                    htmlFor="affiliation_certificate"
                    className="col-form-label"
                  >
                    Upload Affiliation Certificate :
                  </Label>
                  <Input
                    id="affiliation_certificate"
                    type="file"
                    name="affiliation_certificate"
                    onChange={handleFileChange}
                  />
                </FormGroup>
              </div>
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
                <Label htmlFor="name" className="form-label">
                  Name:
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  id="name"
                  className="form-control"
                  placeholder="Enter name"
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="description" className="form-label">
                  Description:
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditInputChange}
                  id="description"
                  className="form-control"
                  placeholder="Enter description"
                />
              </FormGroup>
            </div>

            <div className="row gy-3">
              <FormGroup className="col-md-6">
                <Label htmlFor="org_type" className="col-form-label">
                  Org Type:
                </Label>
                <Input
                  type="select"
                  name="org_type"
                  value={editFormData.org_type}
                  onChange={handleEditInputChange}
                  id="org_type"
                >
                  <option value="">Select Org Type</option>
                  {allorgtypeList?.data?.map((variety) => (
                    <option key={variety.id} value={variety.id}>
                      {variety.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="affiliation_by" className="form-label">
                  Affiliation By:
                </Label>
                <Input
                  type="text"
                  name="affiliation_by"
                  value={editFormData.affiliation_by}
                  onChange={handleEditInputChange}
                  id="affiliation_by"
                  className="form-control"
                  placeholder="Enter affiliation by"
                />
              </FormGroup>
            </div>

            <div className="row gy-3">
              <FormGroup className="col-md-6">
                <Label htmlFor="roc" className="form-label">
                  ROC:
                </Label>
                <Input
                  type="text"
                  name="roc"
                  value={editFormData.roc}
                  onChange={handleEditInputChange}
                  id="roc"
                  className="form-control"
                  placeholder="Enter roc by"
                />
              </FormGroup>
              <div className="col-md-6">
                <FormGroup>
                  <Label
                    htmlFor="affiliation_certificate"
                    className="col-form-label"
                  >
                    Upload Affiliation Certificate :
                  </Label>
                  <Input
                    id="affiliation_certificate"
                    type="file"
                    name="affiliation_certificate"
                    onChange={handleFileChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row gy-3">
              <FormGroup className="col-md-6">
                <Label htmlFor="status" className="col-form-label">
                  Status:
                </Label>
                <Input
                  type="select"
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditInputChange}
                  id="status"
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Not Approved">Not Approved</option>
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

export default Organization;
