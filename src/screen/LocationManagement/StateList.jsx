import {
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

import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

import { Spinner } from "reactstrap";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";

const StateList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getStateList, stateList, addState, editState, StateDelete } = useMasterContext();

  const [formData, setFormData] = useState({
    state: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    state: "",
    id: "",
  });


  useEffect(() => {
    if (id) {
      getStateList({ country: id });
    }
  }, [id])

  const onOpenModal = () => {
    setOpen(true);
  };

  const onOpenModal1 = (product) => {
    setModalOpen(true);
    setSelectedvarity(product);
  };

  const handledistrict = (id) => {
    navigate(`/district-management/${id}`);
  };

  const handleCity = (id) => {
    navigate(`/city-list/${id}`);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({ title: "", image: "", _id: "" });
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
    editState(selectedvarity.id, selectedvarity, id);
    onCloseModal2();
  };

  const handleDelete = (state_id) => {
    if (window.confirm("Are you sure you wish to delete this ?")) {
      StateDelete(state_id, id);
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
    const obj = {
      state: formData.state,
      country: id
    }
    addState(obj, id);
    onCloseModal();
  };

  return (
    <>
      <CommonBreadcrumb title="State List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft size={16} color="#808080" />
                    <span style={{ marginLeft: "8px", color: "#808080"}}>
                      Back
                    </span>
                  </div>

                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add State
                    </Button>
                  </div>
                </div>

                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>State</th>
                        <th>View District</th>
                        <th>View City</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stateList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : stateList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        stateList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.state}</td>
                            <td>   <div className="circelBtnBx">
                              <Button
                                className="btn"
                                color="link"
                                onClick={() => handledistrict(product.id)}
                              >
                                <BsFillEyeFill />
                              </Button>
                            </div></td>
                            <td>   <div className="circelBtnBx">
                              <Button
                                className="btn"
                                color="link"
                                onClick={() => handleCity(product.id)}
                              >
                                <BsFillEyeFill />
                              </Button>
                            </div></td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => onOpenModal1(product)}
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        isOpen={open}
        toggle={onCloseModal}
        className="modal-xg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add State
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <FormGroup>
              <Label htmlFor="state" className="col-form-label">
                state
              </Label>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                id="state"
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

      <Modal
        isOpen={modalOpen}
        toggle={onCloseModal2}
        className="modal-xg"
      >
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit state
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
            <FormGroup>
              <Label htmlFor="state" className="col-form-label">
                state
              </Label>
              <Input
                type="text"
                name="state"
                value={selectedvarity.state}
                onChange={handleInputChanges}
                id="state"
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

export default StateList;
