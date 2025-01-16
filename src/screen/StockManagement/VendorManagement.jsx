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
  
  const VendorManagement = () => {
    const navigate = useNavigate();
  
    const { getvendorList, addVendor, editVendor, deletevendor, vendorList } =
    useMasterContext();
  
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemperPage = 8;
  
    const totalPages =
      vendorList?.total && Math.ceil(vendorList?.total / itemperPage);
  
    useEffect(() => {
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getvendorList(dataToSend);
    }, [currentPage]);
  
    const [formData, setFormData] = useState({
      name: "",
      contact_person: "",
      mobile: "",
      address: "",
      email: "",
      state: "",
      district: "",
      pincode: "",
      GSTIN: "",
      PAN: "",
    });
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const [selectedvarity, setSelectedvarity] = useState({
      name: "",
      contact_person: "",
      mobile: "",
      address: "",
      email: "",
      state: "",
      district: "",
      pincode: "",
      GSTIN: "",
      PAN: "",
    });
  
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
        contact_person: "",
        mobile: "",
        address: "",
        email: "",
        state: "",
        district: "",
        pincode: "",
        id: "",
        GSTIN: "",
        PAN: "",
      });
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
      editVendor(selectedvarity.id, selectedvarity);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        deletevendor(id);
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
    const handleSubmit = async () => {
      const newErrors = {};
      // Validate required fields
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.contact_person)
        newErrors.contact_person = "Contact Person is required.";
      if (!formData.mobile) newErrors.mobile = "Mobile is required.";
      if (!formData.GSTIN) newErrors.GSTIN = "GSTIN is required.";
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors); // Set errors to display
        return; // Stop form submission
      }
  
      try {
        setIsLoading(true);
        await addVendor(formData);
      } catch (error) {
        console.error("Error submitting the form:", error);
      } finally {
        setIsLoading(false);
      }
  
      onCloseModal();
    };
  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Vendor Management" />
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
                          <th>Vendor Name</th>
                          <th>Contact Person Name</th>
                          <th>Mobile</th>
                          <th>District</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorList?.loading ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : vendorList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          vendorList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product?.name}</td>
                              <td>{product?.contact_person}</td>
                              <td>{product?.mobile}</td>
                              <td>{product?.district}</td>
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
  
        <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
          <ModalHeader toggle={onCloseModal}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Add Vendor
            </h5>
          </ModalHeader>
          <ModalBody>
            <Form>
              <div className="row">
                <FormGroup className="col-md-6">
                  <Label htmlFor="name" className="col-form-label">
                    Name:
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    id="name"
                    required
                  />
                  {errors.name && <span className="text-danger">{errors.name}</span>}
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
                    required   
                  />
                  {errors.contact_person && (
                    <span className="text-danger">{errors.contact_person}</span>
                  )}
                </FormGroup>
              </div>
  
              <div className="row">
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
                    required
                  />
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label htmlFor="mobile" className="col-form-label">
                    Mobile:
                  </Label>
                  <Input
                    type="number"
                    name="mobile"
                    min={0}
                    value={formData.mobile}
                    onChange={handleInputChange}
                    id="mobile"
                    required
                  />
                  {errors.mobile && <span className="text-danger">{errors.mobile}</span>}
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
              </div>
  
              <div className="row">
                <FormGroup className="col-md-6">
                  <Label htmlFor="district" className="col-form-label">
                    District:
                  </Label>
                  <Input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    id="district"
                  />
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label htmlFor="pincode" className="col-form-label">
                    Pincode:
                  </Label>
                  <Input
                    type="number"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    id="pincode"
                    required
                  />
                </FormGroup>
              </div>
  
              <div className="row">
                <FormGroup className="col-md-6">
                  <Label htmlFor="GSTIN" className="col-form-label">
                    GSTIN :
                  </Label>
                  <Input
                    type="number"
                    name="GSTIN"
                    value={formData.GSTIN}
                    onChange={handleInputChange}
                    id="GSTIN"
                    required
                  />
                  {errors.GSTIN && <span className="text-danger">{errors.GSTIN}</span>}
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label htmlFor="PAN" className="col-form-label">
                    PAN :
                  </Label>
                  <Input
                    type="number"
                    name="PAN"
                    value={formData.PAN}
                    onChange={handleInputChange}
                    id="PAN"
                  />
                </FormGroup>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
  
          <Button
              type="submit"
              color="primary"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" /> Submitting...
                </>
              ) : (
                "Save"
              )}
            </Button>
            <Button color="secondary" onClick={onCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
  
        <Modal
          isOpen={modalOpen}
          toggle={onCloseModal2}
          className="modal-lg"
          style={{ maxWidth: "800px" }}
        >
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Edit Item
            </h5>
          </ModalHeader>
          <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form>
              <div className="row">
                <FormGroup className="col-md-6">
                  <Label htmlFor="name" className="col-form-label">
                    Name:
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
                  <Label htmlFor="contact_person" className="col-form-label">
                    Contact Person:
                  </Label>
                  <Input
                    type="text"
                    name="contact_person"
                    value={selectedvarity.contact_person}
                    onChange={handleInputChanges}
                    id="contact_person"
                  />
                </FormGroup>
              </div>
  
              <div className="row">
                <FormGroup className="col-md-6">
                  <Label htmlFor="email" className="col-form-label">
                    Email:
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
                    Mobile:
                  </Label>
                  <Input
                    type="number"
                    name="mobile"
                    min={0}
                    value={selectedvarity.mobile}
                    onChange={handleInputChanges}
                    id="mobile"
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
                    value={selectedvarity.address}
                    onChange={handleInputChanges}
                    id="address"
                  />
                </FormGroup>
                <FormGroup className="col-md-6">
                  <Label htmlFor="state" className="col-form-label">
                    State:
                  </Label>
                  <Input
                    type="text"
                    name="state"
                    value={selectedvarity.state}
                    onChange={handleInputChanges}
                    id="state"
                  />
                </FormGroup>
              </div>
  
              <div className="row">
                <FormGroup className="col-md-6">
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
                <FormGroup className="col-md-6">
                  <Label htmlFor="pincode" className="col-form-label">
                    Pincode:
                  </Label>
                  <Input
                    type="number"
                    name="pincode"
                    min={0}
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
  
  export default VendorManagement;
  