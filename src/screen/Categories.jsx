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
import { BsFillEyeFill } from "react-icons/bs";
import { LoadingComponent } from "../component/common/loading";

const Categories = () => {
  const navigate = useNavigate();

  const { getCategoryList, category, categoryDelete, addCategory } = useCategoryContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: ''
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
    if(category?.data?.length === 0 && category?.loading === true){
      getCategoryList();
    }
  }, [category.data]);

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
      categoryDelete(id)
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

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Send formData to the backend
    addCategory(formData);
    onCloseModal(); // Close modal after saving
  };

  const handleSubcategory = (id) => {
    navigate(`/subcategory-List/${id}`);
  }

  return (
    <>
      <CommonBreadcrumb title="Category List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Category
                  </Button>
                </div>
                <div className="clearfix"></div>

                <Table
                  responsive hover borderless align="center"
                >
                  <thead className="border-bottom border-top py-4" >
                    <tr >
                      <th >Breed Name</th>
                      {/* <th
                          style={{ textAlign: "center", padding: "12px 15px" }}
                        >
                          View Sub Category
                        </th> */}
                      <th className="text-center">Status</th>
                      <th className="text-end" >Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!category.loading && category?.data?.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <Badge color="danger">
                            {item.title}
                          </Badge>
                        </td>
                        <td>
                          <div
                            className="form-check form-switch"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: 'center'
                            }}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={`flexSwitchCheckChecked-${i}`}
                              checked={item.status === "Active"}
                              onChange={() => handleStatusToggle(item)}
                              style={{ cursor: "pointer" }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexSwitchCheckChecked-${i}`}
                              style={{
                                marginLeft: "8px",
                                cursor: "pointer",
                                color:
                                  item.status === "Active"
                                    ? "#28a745"
                                    : "#dc3545",
                              }}
                            >
                              {item.status === "Active"
                                ? "Active"
                                : "Inactive"}
                            </label>
                          </div>
                        </td>
                        <td className="d-flex gap-2 justify-content-end align-items-center">
                          <Badge
                            color="danger"
                            style={{ cursor: 'pointer' }}
                            onClick={() => onOpenModal2(item)}
                          >
                            <FaEdit style={{ fontSize: 14 }} />
                          </Badge>
                          <Badge
                            color="warning"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDelete(item._id)}
                          >
                            <AiOutlineDelete
                              size={14}
                            />
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {!category.loading && category?.data?.length === 0 && (
                  <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No data found</p>
                )}
                {category.loading && <LoadingComponent />}

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
            Add Category
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Category Name :
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
                Category Description :
              </Label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                id="description"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="banner-image" className="col-form-label">
                Category Image :
              </Label>
              <Input
                id="category-image"
                type="file"
                name="image"
                onChange={handleFileChange}
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
            Edit Category
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

export default Categories;
