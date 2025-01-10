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
  import ReactQuill from "react-quill";
  import "react-quill/dist/quill.snow.css";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";


  const OrderStatusList = () => {
    const navigate = useNavigate();
  
    const {  getOrderMasterList, addOrderMasterList , orderMasterList,editOrderStatus,DeleteOrderStatus } = useMasterContext();
  
    const [formData, setFormData] = useState({
      title: "",
    });
  
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
  
    const [selectedvarity, setSelectedvarity] = useState({
      title: "",
      id: "",
    });
  
    useEffect(() => {
      getOrderMasterList();
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
      editOrderStatus(selectedvarity.id, selectedvarity);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        DeleteOrderStatus(id);
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
      addOrderMasterList(formData);
      onCloseModal(); // Close modal after saving
    };
  
    return (
      <>
        <CommonBreadcrumb title="Order Status List"  />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="btn-popup pull-right">
                    <Button color="primary" onClick={onOpenModal}>
                      Add Order Status
                    </Button>
                  </div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Order Status</th>
                          {/* <th>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {orderMasterList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : orderMasterList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          orderMasterList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.title}</td>
                              {/* <td>
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
                              </td> */}
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
             Add Order Status
            </h5>
          </ModalHeader>
          <ModalBody>
            {" "}
            {/* Scroll in Y-axis */}
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label htmlFor="title" className="col-form-label">
                  Order Status
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  id="title"
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
              Edit order status
            </h5>
          </ModalHeader>
          <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form>
              <FormGroup>
                <Label htmlFor="title" className="col-form-label">
                  order status:
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={selectedvarity.title}
                  onChange={handleInputChanges}
                  id="title"
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
  
  export default OrderStatusList;
  