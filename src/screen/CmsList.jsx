/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

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

import { Spinner } from "reactstrap";
import { useCmsContext } from "../helper/CmsProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Pagination, Stack } from "@mui/material";
const CmsList = () => {
  const navigate = useNavigate();

  const { getCmsList, cmsList, addCms, deleteCms, editcms } = useCmsContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 12;

  const totalPages = cmsList?.total && Math.ceil(cmsList?.total / itemperPage);

  const [selectedvarity, setSelectedvarity] = useState({
    title: "",
    description: "",
    id: "",
    images: [],
  });

  const [deletedImages, setDeletedImages] = useState([]); // For removed images
  const [newImages, setNewImages] = useState([]); // For newly added images

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getCmsList(dataToSend);
  }, [currentPage]);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onOpenModal2 = (product) => {
    setSelectedvarity({
      ...product,
      images: product.images || [],
    });
    setDeletedImages([]);
    setNewImages([]);
    setModalOpen(true);
  };

  const handleRemoveExistingImage = (image) => {
    setDeletedImages((prev) => [...prev, image]);
    setSelectedvarity((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== image),
    }));
  };

  const handleAddNewImages = (event) => {
    const files = Array.from(event.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    setSelectedvarity({ title: "", image: "", id: "" });
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({ title: "", description: "",images: [] });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...selectedFiles],
    }));
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
  // const handleSubmits = () => {
  //   editcms(selectedvarity.id, selectedvarity);
  //   onCloseModal2();
  // };

  console.log(newImages,'new images')

  const handleSubmits = async () => {
    const formData = new FormData();
    formData.append("title", selectedvarity.title);
    formData.append("description", selectedvarity.description);
  
    // Pass deleted images with indices
    deletedImages.forEach((image, index) => {
      formData.append(`deleted_images[${index}]`, image);
    });
  
    // Pass new images with indices
    newImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
  
    // Call your API function here
    await editcms(selectedvarity.id,formData);
  
    // Close modal and refresh the list
    setModalOpen(false);
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

    const dataToSend = new FormData();

    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);

    if (formData.images) {
      formData.images.forEach((image, index) => {
        dataToSend.append(`images[${index}]`, image);
      });
    }

    addCms(dataToSend);
    onCloseModal(); // Close modal after saving
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="CMS List" />
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
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmsList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : cmsList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        cmsList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.title}</td>
                            {/* <td>{product.description}</td> */}
                            {/* <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={`flexSwitchCheckChecked-${index}`}
                                    checked={product.status === "Active"}
                                    onChange={() => handleStatusToggle(product)}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`flexSwitchCheckChecked-${index}`}
                                  >
                                    {product.status === "Active"
                                      ? "Active"
                                      : "Inactive"}
                                  </label>
                                </div>
                              </td> */}
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

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="images" className="col-form-label">
                    Upload Images:
                  </Label>
                  <Input
                    type="file"
                    name="images "
                    id="images "
                    onChange={handleImageChange}
                    multiple
                  />
                </FormGroup>
              </div>
            </div>

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

      <Modal
        isOpen={modalOpen}
        toggle={onCloseModal2}
        className="modal-lg"
        style={{ maxWidth: "800px" }}
      >
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
              <div className="mb-4">
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
                    height: "350px",
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
              <Label htmlFor="images">Images:</Label>
              <div className="d-flex flex-wrap">
                {selectedvarity?.images?.map((image, index) => (
                  <div key={index} className="position-relative m-2">
                    <img
                      src={image}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                    
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "rgba(255, 0, 0, 0.8)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveExistingImage(image)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <Input
                type="file"
                multiple
                onChange={handleAddNewImages}
                className="form-control mt-2"
              />
              <div className="d-flex flex-wrap">
                {newImages?.map((image, index) => (
                  <div key={index} className="position-relative m-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute"
                      style={{ top: 0, right: 0 }}
                      onClick={() =>
                        setNewImages((prev) =>
                          prev.filter((_, idx) => idx !== index)
                        )
                      }
                    >
                      &times;
                    </button>
                  </div>
                ))}
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
