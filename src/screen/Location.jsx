/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import CommonBreadcrumb from "../component/common/bread-crumb";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
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
import { useCategoryContext } from "../helper/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale
);

import { Spinner } from "reactstrap";
import { useCommonContext } from "../helper/CommonProvider";
import { BsFillEyeFill } from "react-icons/bs";
import { LoadingComponent } from "../component/common/loading";

const Location = () => {
  const navigate = useNavigate();

  const { countryList, getCountryList } = useCommonContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Fetch country list on component mount
  useEffect(() => {
    getCountryList();
  }, []);

  // location logic end

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    title: "",
    description: "",
    status: "",
    _id: "",
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
    setSelectedvarity({ title: "", image: "", _id: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    // await switchUnittype(product._id, newStatus); // Your API call here
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
    //   editpack(selectedvarity._id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      // unitDelete(id)
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

  const handlestate = (id) => {
    navigate(`/state-list/${id}`);
  }

  // Handle form submission
  const handleSubmit = () => {
    // Send formData to the backend
    //   addUnitSize(formData);
    onCloseModal(); // Close modal after saving
  };

  return (
    <>
      <CommonBreadcrumb title="Country List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button className="mb-3" color="primary" onClick={onOpenModal}>
                    Add Country
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div
                  id="basicScenario"
                  className="product-physical"
                  style={{
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                  }}
                >
                  <Table
                    striped
                    responsive
                    bordered
                    hover
                    style={{ backgroundColor: "white", borderRadius: "10px" }}
                  >
                    <thead
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        textAlign: "center",
                      }}
                    >
                      <tr>
                        <th style={{ padding: "12px" }}>Country Name</th>
                        <th style={{ padding: "12px" }}>Short Code</th>
                        <th style={{ padding: "12px" }}>Currency</th>
                        <th style={{ padding: "12px" }}>Serviceable</th>
                        <th style={{ padding: "12px" }}>Courier Charge</th>
                        <th style={{ padding: "12px" }}>Status</th>
                        <th style={{ padding: "12px" }}>View State</th>
                        <th style={{ padding: "12px" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countryList?.data?.map((product, index) => (
                        <tr key={index} style={{ textAlign: "center" }}>
                          <td style={{ padding: "10px" }}>{product.title}</td>
                          <td style={{ padding: "10px" }}>
                            {product.short_code}
                          </td>
                          <td style={{ padding: "10px" }}>
                            {product.default_currency}
                          </td>
                          <td style={{ padding: "10px" }}>
                            {product.serviceable ? "Yes" : "No"}
                          </td>
                          <td style={{ padding: "10px" }}>
                            {product.default_courier_charge}
                          </td>
                          <td style={{ padding: "10px" }}>
                            <div
                              className="form-check form-switch"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={`flexSwitchCheckChecked-${index}`}
                                checked={product.status === "Active"}
                                onChange={() => handleStatusToggle(product)}
                                style={{ cursor: "pointer" }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`flexSwitchCheckChecked-${index}`}
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                  color:
                                    product.status === "Active"
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {product.status}
                              </label>
                            </div>
                          </td>
                          <td>
                            {" "}
                            <BsFillEyeFill
                              style={{
                                marginLeft: "5px",
                                color: "#007bff",
                                cursor: "pointer",
                                fontSize: '18px'
                              }}
                              onClick={() => handlestate(product._id)}
                            />{" "}
                          </td>
                          <td
                            style={{
                              padding: "14px",
                              display: "flex",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                          >
                            <FaEdit
                              size={20}
                              onClick={() => onOpenModal2(product)}
                              style={{ cursor: "pointer", color: "#007bff" }}
                            />
                            <AiOutlineDelete
                              size={20}
                              onClick={() => handleDelete(product._id)}
                              style={{ cursor: "pointer", color: "red" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </Table>
                  {!countryList.loading && countryList?.data?.length === 0 && (
                    <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No data found</p>
                  )}
                  {countryList.loading && <LoadingComponent />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        isOpen={open}
        toggle={onCloseModal}
        className="modal-lg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Unit Size
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Title :
              </Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                id="title"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Description :
              </Label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                id="description"
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

      <Modal isOpen={modalOpen} toggle={onCloseModal2}>
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Unit Master
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Title:
              </Label>
              <Input
                type="text"
                name="title"
                value={selectedvarity.title}
                onChange={handleInputChanges}
                id="title"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Description:
              </Label>
              <Input
                type="text"
                name="description"
                value={selectedvarity.description}
                onChange={handleInputChanges}
                id="description"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Status:
              </Label>
              <div className="d-flex justify-content-start mt-2">
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={selectedvarity.status === "Active"} // Check if the value matches 'Active'
                      onChange={handleInputChanges}
                    />
                    Active
                  </Label>
                </FormGroup>
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={selectedvarity.status === "Inactive"}
                      onChange={handleInputChanges}
                    />
                    Inactive
                  </Label>
                </FormGroup>
              </div>
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

export default Location;
