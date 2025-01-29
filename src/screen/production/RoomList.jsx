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
import { useAuthContext } from "../../helper/AuthProvider";

const RoomList = () => {
  const navigate = useNavigate();

  const { getRoomList, roomList, create_room, edit_room, getAllUnit, allUnit } =
    useMasterContext();

    const { subAdminList, getSubAdminList } = useAuthContext()

    const [selectedProducts, setSelectedProducts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    unit_id: "",
    managers: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
    roomList?.total && Math.ceil(roomList?.total / itemperPage);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    title: "",
    unit_id: "",
    managers: "",
    id: "",
  });
 
  useEffect(() => {
    // getSubAdminList();
    getAllUnit();
  }, []);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getRoomList(dataToSend);
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
        unit_id: "",
        managers: "",
        id: "",
    });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
        title: "",
        unit_id: "",
        managers: "",
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
  const handleSubmits = () => {
    const dataToSend = {
        title: selectedvarity.title,
        unit_id: selectedvarity.unit_id,
        managers: selectedvarity.managers,
        id: selectedvarity.id,
    };
    edit_room(dataToSend);
    onCloseModal2();
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
  const handleSubmit = () => {
    create_room(formData);
    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Rooms Management List" />
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
                        <th>REF</th>
                        <th className="text-center">TITLE</th>
                        <th className="text-center">Unit Name</th>
                        <th className="text-center">TOTAL Floors</th>
                        <th className="text-center">TOTAL Managers</th>
                        <th >ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roomList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : roomList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        roomList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <Badge>#{product?.ref}</Badge>
                            </td>
                            <td className="text-center">{product?.title}</td>
                            <td className="text-center">
                              {product?.unit_name}
                            </td>
                            <td className="text-center">
                              {product?.total_floor}
                            </td>
                            <td className="text-center">
                              {product?.managers?.length || 0}
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
          <Form>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
               Room Name
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
                <Label for="New">Add Manager</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={subAdminList?.data || []}
                  getOptionLabel={(option) => option?.email || ""}
                  value={selectedProducts}
                  onChange={(event, newValue) => setSelectedProducts(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Manager"
                      placeholder="Select Manager"
                    />
                  )}
                />
              </FormGroup>
            <FormGroup>
              <Label htmlFor="unit_id" className="col-form-label">
                Unit:
              </Label>
              <Input
                type="select"
                name="unit_id"
                value={formData.unit_id}
                onChange={handleInputChange}
                id="unit_id"
              >
                <option value="">Select Unit</option>
                {allUnit.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.title} ({unit.ref})
                  </option>
                ))}
              </Input>
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
              <Label htmlFor="title" className="col-form-label">
               Room Name
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
                <Label for="New">Add Manager</Label>
                <Autocomplete
                  sx={{ m: 1 }}
                  multiple
                  options={subAdminList?.data || []}
                  getOptionLabel={(option) => option?.email || ""}
                  value={selectedProducts}
                  onChange={(event, newValue) => setSelectedProducts(newValue)}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Manager"
                      placeholder="Select Manager"
                    />
                  )}
                />
              </FormGroup>
            <FormGroup>
              <Label htmlFor="unit_id" className="col-form-label">
                Unit:
              </Label>
              <Input
                type="select"
                name="unit_id"
                value={selectedvarity.unit_id}
                onChange={handleInputChanges}
                id="unit_id"
              >
                <option value="">Select Unit</option>
                {allUnit.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.title} ({unit.ref})
                  </option>
                ))}
              </Input>
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

export default RoomList;
