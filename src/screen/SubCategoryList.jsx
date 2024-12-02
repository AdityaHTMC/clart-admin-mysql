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
  import { useNavigate, useParams } from "react-router-dom";
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
  
  const SubCategoryList = () => {
    const navigate = useNavigate();
    const { id} = useParams()
  
    const { getSubCategoryList, subcategory } = useCategoryContext();


    console.log(subcategory.loading,'subcategory')
  
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
    getSubCategoryList(id);
    }, [id]);
  
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
  
    // Handle form submission
    const handleSubmit = () => {
      // Send formData to the backend
      //   addUnitSize(formData);
      onCloseModal(); // Close modal after saving
    };
  
    return (
      <>
        <CommonBreadcrumb title="Sub Category List" parent="Physical" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add Sub Category
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                  <div
                    id="basicScenario"
                    className="product-physical"
                    style={{
                      padding: "20px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Table
                      striped
                      responsive
                      style={{
                        borderCollapse: "separate",
                        borderSpacing: "0 10px",
                      }}
                    >
                      <thead style={{ backgroundColor: "#f8f9fa" }}>
                        <tr style={{ fontWeight: "bold", color: "#333" }}>
                          <th style={{ padding: "12px 15px" }}>Sub Category Name</th>
                          <th style={{ padding: "12px 15px" }}>Total Product</th>
                          <th style={{ padding: "12px 15px" }}>Status</th>
                          <th style={{ padding: "12px 15px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subcategory.loading ? (
                          <tr>
                            <td
                              colSpan="4"
                              className="text-center"
                              style={{ padding: "20px" }}
                            >
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : subcategory?.data?.length === 0 ? (
                          <tr>
                            <td
                              colSpan="4"
                              className="text-center"
                              style={{ padding: "20px", color: "#999" }}
                            >
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            subcategory?.data?.map((product, index) => (
                            <tr
                              key={index}
                              style={{
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <td style={{ padding: "12px 15px" }}>
                                {product.title}
                              </td>
                              <td style={{ padding: "12px 15px" }}>
                                {product.total_products}
                              </td>
                              <td style={{ padding: "12px 15px" }}>
                                <div
                                  className="form-check form-switch"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
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
                                      marginLeft: "8px",
                                      cursor: "pointer",
                                      color:
                                        product.status === "Active"
                                          ? "#28a745"
                                          : "#dc3545",
                                    }}
                                  >
                                    {product.status === "Active"
                                      ? "Active"
                                      : "Inactive"}
                                  </label>
                                </div>
                              </td>
                              <td
                                style={{
                                  padding: "15px 15px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <FaEdit
                                  size={20}
                                  onClick={() => onOpenModal2(product)}
                                  style={{
                                    marginRight: "15px",
                                    cursor: "pointer",
                                    color: "#007bff",
                                    transition: "color 0.3s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.target.style.color = "#0056b3")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.target.style.color = "#007bff")
                                  }
                                />
                                <AiOutlineDelete
                                  size={20}
                                  onClick={() => handleDelete(product._id)}
                                  style={{
                                    cursor: "pointer",
                                    color: "#dc3545",
                                    transition: "color 0.3s",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.target.style.color = "#c82333")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.target.style.color = "#dc3545")
                                  }
                                />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
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
              Add Category
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
  
  export default SubCategoryList;
  