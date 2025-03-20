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
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Autocomplete, Pagination, Stack, TextField } from "@mui/material";
import { useCategoryContext } from "../../helper/CategoryProvider";

const PackingBox = () => {
  const navigate = useNavigate();

  const {
    getPackingBoxList,
    packingBox,
    create_packing_box,
    edit_packing_box,
  } = useMasterContext();

  const { getallproductList, allproductList } = useCategoryContext();

  const [formData, setFormData] = useState({
    title: "",
    stock: "",
    capacity: "",
    price: "",
    breed_id: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemperPage = 8;

  const totalPages =
    packingBox?.total && Math.ceil(packingBox?.total / itemperPage);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    title: "",
    
    capacity: "",
    price: "",
    breed_id: "",
    id: "",
  });

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getallproductList();
    getPackingBoxList(dataToSend);
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
      title: "",
  
      capacity: "",
      price: "",
      breed_id: "",
      id: "",
    });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
      title: "",
      capacity: "",
      price: "",
      breed_id: "",
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
  const handleSubmits = async() => {
    const dataToSend = {
      title: selectedvarity.title,

      capacity: selectedvarity.capacity,
      price: selectedvarity.price,
      breed_id: selectedvarity.breed_id,
      id: selectedvarity.id,
    };
    // console.log(dataToSend, 'update')
    const res = await edit_packing_box(selectedvarity.id, dataToSend);
    if (res.status === 200) {
        const dataToSend = {
            page: currentPage,
            limit: itemperPage,
          };
        getPackingBoxList(dataToSend);
      onCloseModal2();
    }
    
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // DeleteDoc(id);
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
  const handleSubmit = async() => {
    // console.log(formData, 'submit');
    const res = await create_packing_box(formData);
    if (res.status === 200) {
      onCloseModal();
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getPackingBoxList(dataToSend);
      onCloseModal();
    }
    
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Packing Box List" />
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
                <Table hover responsive className="align-middle">
                    <thead>
                      <tr>
                        <th>TITLE</th>
                        <th>CAPACITY</th>
                        <th>Animal Name</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packingBox?.loading ? (
                        <tr>
                          <td colSpan="10" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : packingBox?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No List Found
                          </td>
                        </tr>
                      ) : (
                        packingBox?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product?.title}</td>
                            <td>{product?.capacity}</td>
                            <td>{product?.breed_title}</td>
                            <td>{product?.price}</td>
                            <td>{product?.stock}</td>
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
          <FormGroup>
              <Label htmlFor="breed_id" className="col-form-label">
                Choose Animal:
              </Label>
              <Autocomplete
                id="breed_id"
                options={allproductList?.data || []}
                getOptionLabel={(option) => option?.title || ""}
                value={
                  allproductList?.data?.find(
                    (sp) => sp.id === formData?.breed_id
                  ) || ""
                }
                onChange={(event, newValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    breed_id: newValue ? newValue.id : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select animals"
                    variant="outlined"
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
              Packing box name 
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
              <Label htmlFor="capacity" className="col-form-label">
              Packing box Stock :
              </Label>
              <Input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                id="capacity"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price" className="col-form-label">
              Packing box price 
              </Label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                id="price"
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

      <Modal isOpen={modalOpen} toggle={onCloseModal2} className="modal-xg">
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
          <FormGroup>
              <Label htmlFor="breed_id" className="col-form-label">
                Choose Animal:
              </Label>
              <Autocomplete
                id="breed_id"
                options={allproductList?.data || []} // Ensure it's an array
                getOptionLabel={(option) => option?.title || ""}
                value={
                    allproductList?.data?.find(
                    (item) => item.id === selectedvarity.breed_id
                  ) || null
                }
                onChange={(event, newValue) => {
                  handleInputChanges({
                    target: {
                      name: "breed_id",
                      value: newValue ? newValue.id : "",
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Collection"
                    variant="outlined"
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
              Packing box name :
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
              <Label htmlFor="capacity" className="col-form-label">
              Packing box capacity :
              </Label>
              <Input
                type="number"
                name="capacity"
                value={selectedvarity.capacity}
                onChange={handleInputChanges}
                id="capacity"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price" className="col-form-label">
              Packing box price :
              </Label>
              <Input
                type="number"
                name="price"
                value={selectedvarity.price}
                onChange={handleInputChanges}
                id="price"
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

export default PackingBox;
