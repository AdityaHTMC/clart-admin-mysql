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
import { useCmsContext } from "../helper/CmsProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingComponent } from "../component/common/loading";
const CmsList = () => {
  const navigate = useNavigate();

  const { getCmsList, cmsList, addCms, deleteCms, editcms } = useCmsContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    title: "",
    description: "",
    status: "",
    _id: "",
  });

  useEffect(() => {
    getCmsList();
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
    setSelectedvarity({ title: "", image: "", _id: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    // await switchBagtype(product._id, newStatus); // Your API call here
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
    editcms(selectedvarity._id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      deleteCms(id);
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

  const handleDescriptionChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Send formData to the backend
    addCms(formData);
    onCloseModal(); // Close modal after saving
  };

  return (
    <>
      <CommonBreadcrumb title="CMS List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add CMS
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table responsive hover borderless align="center">
                    <thead className="border-bottom border-top py-4" >
                      <tr>
                        <th>Title</th>
                        {/* <th>Description</th> */}
                        {/* <th>status</th> */}
                        <th className="text-start">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmsList?.data?.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <Badge color="danger">{product.title}</Badge>
                          </td>
                          <td>
                            <div className="d-flex justify-content-start align-items-center gap-2">
                              <Badge 
                                onClick={() => onOpenModal2(product)}
                                style={{
                                  cursor: "pointer",
                                }}>
                                <FaEdit
                                  size={16}
                                />
                              </Badge>
                              <Badge color="warning" onClick={() => handleDelete(product._id)} style={{ cursor: "pointer" }}>
                                <AiOutlineDelete
                                  size={16}
                                />
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))
                      }
                    </tbody>

                  </Table>
                  {!cmsList.loading && cmsList?.data?.length === 0 && (
                    <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                  )}

                  {cmsList.loading && <LoadingComponent />}
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
            Add CMS
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
              <div className="mb-4">
                <label htmlFor="description" className="form-label mb-1">
                  Description:
                </label>
                <ReactQuill
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  theme="snow"
                  placeholder="Enter a detailed description"
                  style={{
                    borderRadius: "8px",
                    height: "200px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                  }}
                />
                <small className="form-text text-muted">
                  Describe your content in detail to attract viewers.
                </small>
              </div>
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

      <Modal isOpen={modalOpen} toggle={onCloseModal2} className="modal-lg" style={{ maxWidth: "800px" }} >
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit CMS
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
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
              <div className="mb-4" >
                <label htmlFor="description" className="form-label mb-1">
                  Description:
                </label>
                <ReactQuill
                  id="description"
                  name="description"
                  value={selectedvarity.description}
                  onChange={(value) =>
                    setSelectedvarity({ ...selectedvarity, description: value })
                  }
                  theme="snow"
                  className="form-control"
                  placeholder="Enter a detailed description"
                  style={{
                    borderRadius: "8px",
                    height: "300px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                  }}
                />
                <small className="form-text text-muted">
                  Describe your content in detail to attract viewers.
                </small>
              </div>
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

export default CmsList;
