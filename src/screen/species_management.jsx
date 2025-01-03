
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
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { LoadingComponent } from "../component/common/loading";

const SpeciesManagement = () => {

  const { getCategoryList, category, categoryDelete, addCategory, editCategory } = useCategoryContext();

  const [formData, setFormData] = useState({
    species: "",
    type: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    species: "",
    type: "",
    status: "",
    id: "",
  });

  useEffect(() => {
    if (category?.loading === true) {
      getCategoryList();
    }
  }, [category.loading]);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onOpenModal2 = (product) => {
    setSelectedvarity({ species: product.species, type: product.type, id: product.id, status: product.status });
    setModalOpen(true);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({ species: "", type: "", id: "" });
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
  const handleSubmits = async () => {
    const res = await editCategory(selectedvarity.id, selectedvarity);
    if(res.success){
      getCategoryList()
      onCloseModal2();
      setSelectedvarity({ species: "", type: "", id: "", status: "" });
    }
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

  // Handle form submission
  const handleSubmit = () => {
    addCategory(formData);
    onCloseModal(); 
    setFormData({ species: "", type: "" });
  };


  return (
    <>
      <CommonBreadcrumb title="Species List" parent="Home" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Species
                  </Button>
                </div>
                <div className="clearfix"></div>

                <Table
                  responsive hover borderless align="center"
                >
                  <thead className="border-bottom border-top py-4" >
                    <tr >
                      <th >Species Name</th>
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
                            {item.species}
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
                              disabled
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
                            onClick={() => handleDelete(item.id)}
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
            Add Species
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Species Name :
              </Label>
              <Input
                type="text"
                name="species"
                value={formData.species}
                onChange={handleInputChange}
                id="species"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Type :
              </Label>
              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                id="type"
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
            Edit Species
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
                name="species"
                value={selectedvarity.species}
                onChange={handleInputChanges}
                id="title"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Type:
              </Label>
              <Input
                type="text"
                name="type"
                value={selectedvarity.type}
                onChange={handleInputChanges}
                id="type"
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

export default SpeciesManagement;
