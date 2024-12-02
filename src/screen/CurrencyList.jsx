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
  
  const CurrencyList = () => {
    const navigate = useNavigate();
  
    const { getCurrencyList,currencyList } = useCmsContext();
  
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
        getCurrencyList();
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
    //   editpack(selectedvarity._id, selectedvarity);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        // packDelete(id)
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
    //   addBackTypeSize(formData);
      onCloseModal(); // Close modal after saving
    };
  
    return (
      <>
        <CommonBreadcrumb title="Currency List" parent="Physical" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add Currency
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Currency Name</th>
                          <th>symbol</th>
                          {/* <th>status</th> */}
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currencyList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : currencyList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            currencyList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.title}</td>
                              <td>{product.symbol}</td>

                              <td>
                                <FaEdit
                                  size={20}
                                  onClick={() => onOpenModal2(product)}
                                  style={{
                                    marginRight: "10px",
                                    cursor: "pointer",
                                  }}
                                />
                                <AiOutlineDelete
                                  size={20}
                                  onClick={() => handleDelete(product._id)}
                                  style={{ cursor: "pointer" }}
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
              Add Back Type
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
              Edit Back Type
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
  
  export default CurrencyList;
  