/* eslint-disable react/no-unknown-property */
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
import CommonBreadcrumb from "../../component/common/bread-crumb";
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
import { useCategoryContext } from "../../helper/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
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

import { FaTrashAlt } from "react-icons/fa";
import { LoadingComponent } from "../../component/common/loading";
import { toast } from "react-toastify";

const BannerList = () => {
  const navigate = useNavigate();

  const {
    getBannerList,
    BannerList,
    addBanner,
    bannerDelete, switchBranner, editBranner
  } = useCategoryContext();

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    title2: "",
    description: "",
    primary_color: "#FFFFFF",
    secondary_color: "#000000",
    image: null,
    target_url: "",
    type: "",
  });

  const [selectedBanner, setSelectedBanner] = useState({
    title: "",
    title2: "",
    description: "",
    primary_color: "#FFFFFF",
    secondary_color: "#000000",
    image: '',
    target_url: "",
    type: "",
    _id: "",
  });

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (BannerList?.data?.length === 0 && BannerList?.loading === true) {
      getBannerList();
    }
  }, [BannerList?.data]);

  const onOpenModal = () => {
    setOpen(true);
  };
  const handleEdit = (id) => {
    navigate(`/product-edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      bannerDelete(id);
    }
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  const onOpenModal2 = (product) => {
    setSelectedBanner(product);
    setModalOpen(true);
  };

  // Close the modal
  const onCloseModal2 = () => {
    setModalOpen(false);
    // setSelectedBanner({ title: "", image: "", _id: "" });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
    }));
  };


  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";

    console.log(product._id, newStatus, "mew status: ");
    await switchBranner(product._id, newStatus); // Your API call here

  };

  // Handle form submission
  const handleSubmit = async () => {
    // Send formData to the backend
    const formDataToSend = new FormData();

    formDataToSend.append("target_url", formData.target_url);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("title2", formData.title2);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("primary_color", formData.primary_color);
    formDataToSend.append("secondary_color", formData.secondary_color);
    if (formData.image) {
      formDataToSend.append("image", formData.image); // Append the file as binary
    }
    setIsProcessing(true)
    const res = await addBanner(formDataToSend);
    setIsProcessing(false)
    if (res.success) {
      getBannerList();
      toast.success('Banner added successfully')
      setOpen(false);
    } else {
      toast.error(res.message)
    }
  };


  // Handle form input change
  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setSelectedBanner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file); // Store the new image file in state
  };

  const handleSubmits = async () => {
    const formData = new FormData();

    // Append title and brand ID
    formData.append("title", selectedBanner.title);
    formData.append("title2", selectedBanner.title2);
    formData.append("description", selectedBanner.description);
    formData.append("primary_color", selectedBanner.primary_color);
    formData.append("secondary_color", selectedBanner.secondary_color);
    formData.append("target_url", selectedBanner.target_url);
    formData.append("type", selectedBanner.type);

    // Append image only if a new image is selected, otherwise keep the existing one
    if (newImage) {
      formData.append("image", newImage); // New image file
    } else if (selectedBanner.image) {
      formData.append("image", selectedBanner.image); // Existing image URL or identifier
    }
    setIsProcessing(true)
    const res = await editBranner(selectedBanner._id, formData);
    setIsProcessing(false)
    if(res.success) {
      toast.success('Banner updated successfully')
      getBannerList();
      onCloseModal2();
    }else {
      toast.error(res.message)
    }

    onCloseModal2();
  };

  return (
    <>
      <CommonBreadcrumb title="Banner List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Banner
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table responsive hover borderless align="center" >
                    <thead className="border-bottom border-top py-4" >
                      <tr>
                        <th>Banner Image</th>
                        <th className="text-center">Banner Title</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Banner Color</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!BannerList?.loading && BannerList?.data?.map((product, index) => (
                        <>
                          <tr>
                            <th>
                              {" "}
                              <img
                                src={product.image}
                                alt="img"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />{" "}
                            </th>
                            <td className="text-center">
                              {product?.title?.split(" ").length > 5
                                ? product?.title
                                  ?.split(" ")
                                  ?.slice(0, 5)
                                  .join(" ") + "..."
                                : product?.title}
                            </td>
                            <td className="">
                              <div className="form-check form-switch d-flex justify-content-center gap-3" >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`flexSwitchCheckChecked-${index}`} // unique ID for each row
                                  checked={product.status === "Active"} // Reflects current status
                                  onChange={() => handleStatusToggle(product)} // Toggle status on change
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
                            </td>
                            <td >
                              <div className="d-flex justify-content-center align-items-center gap-2">
                                <div
                                  style={{
                                    backgroundColor: product?.primary_color,
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                  }}
                                />
                                <div
                                  style={{
                                    backgroundColor: product?.secondary_color,
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </div>
                            </td>
                            <td >
                              <div className="d-flex gap-2 justify-content-center ">
                                <Badge color="danger" onClick={() => onOpenModal2(product)}>
                                  <FaEdit
                                    size={14}
                                    style={{
                                      cursor: "pointer",
                                    }} // Adds space and pointer cursor
                                  />
                                </Badge>
                                <Badge color="warning" onClick={() => handleDelete(product._id)}>
                                  <AiOutlineDelete
                                    size={14}
                                    style={{ cursor: "pointer" }} // Adds pointer cursor
                                  />
                                </Badge>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                  {!BannerList.loading && BannerList?.data?.length === 0 && (
                    <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                  )}

                  {BannerList.loading && <LoadingComponent />}
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
        style={{ maxWidth: "800px" }} // Optional: further custom width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Banner
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "400px", overflowY: "auto" }}>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            {/* <FormGroup>
                <Label htmlFor="category-select" className="col-form-label">
                  Category :
                </Label>
                <Input
                  type="select"
                  name="category_id"
                  id="category-select"
                  onChange={handleInputChange}
                  value={formData.category_id}
                >
                  <option value="">Select Category</option>
                  {category?.data?.map((cat) => (
                    <option key={cat.id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </Input>
              </FormGroup> */}

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                target url :
              </Label>
              <Input
                type="text"
                name="target_url"
                value={formData.target_url}
                onChange={handleInputChange}
                id="target_url"
              />
            </FormGroup>

            <FormGroup>
              <Label className="col-form-label">Type:</Label>
              <div className="d-flex justify-content-start mt-2">
                <FormGroup check className="me-3 m-checkbox-inline custom-radio-ml radio-animated mb-0">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="slider"
                      className="radio_animated"
                      checked={formData.type === "slider"}
                      onChange={handleInputChange}
                    />
                    Slider
                  </Label>
                </FormGroup>
                <FormGroup check className="me-3 m-checkbox-inline custom-radio-ml radio-animated mb-0">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="popup"
                      className="radio_animated"
                      checked={formData.type === "popup"}
                      onChange={handleInputChange}
                    />
                    Popup
                  </Label>
                </FormGroup>
                <FormGroup check className="m-checkbox-inline custom-radio-ml radio-animated mb-0">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="parallax"
                      className="radio_animated"
                      checked={formData.type === "parallax"}
                      onChange={handleInputChange}
                    />
                    Parallax
                  </Label>
                </FormGroup>
              </div>
            </FormGroup>

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
              <Label htmlFor="title2" className="col-form-label">
                Title 2 :
              </Label>
              <Input
                type="text"
                name="title2"
                value={formData.title2}
                onChange={handleInputChange}
                id="title2"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description" className="col-form-label">
                Description :
              </Label>
              <Input
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                id="description"
              />
            </FormGroup>

            <div className="row p-5">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="primary_color" className="form-label">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    id="primary_color"
                    name="primary_color"
                    value={formData.primary_color}
                    onChange={handleInputChange}
                    className="form-control form-control-color"
                    style={{ width: "100px", height: "50px" }} // Adjust color picker size
                  />
                </div>
                <div className="mt-2">
                  <strong>Selected Color:</strong> {formData.primary_color}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="secondary_color" className="form-label">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    id="secondary_color"
                    name="secondary_color"
                    value={formData.secondary_color}
                    onChange={handleInputChange}
                    className="form-control form-control-color"
                    style={{ width: "100px", height: "50px" }} // Adjust color picker size
                  />
                </div>
                <div className="mt-2">
                  <strong>Selected Color:</strong> {formData.secondary_color}
                </div>
              </div>
            </div>

            <FormGroup>
              <Label htmlFor="banner-image" className="col-form-label">
                Banner Image :
              </Label>
              <Input
                id="banner-image"
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit} disabled={isProcessing}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal} disabled={isProcessing}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={modalOpen}
        toggle={onCloseModal2}
        className="modal-lg" // Increases the width
        style={{ maxWidth: "800px" }} // Optional: further custom width
      >
        <ModalHeader toggle={onCloseModal2}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Edit Banner
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "400px", overflowY: "auto" }}>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            {/* <FormGroup>
                <Label htmlFor="category-select" className="col-form-label">
                  Category :
                </Label>
                <Input
                  type="select"
                  name="category_id"
                  id="category-select"
                  onChange={handleInputChange}
                  value={formData.category_id}
                >
                  <option value="">Select Category</option>
                  {category?.data?.map((cat) => (
                    <option key={cat.id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </Input>
              </FormGroup> */}

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                target url :
              </Label>
              <Input
                type="text"
                name="target_url"
                value={selectedBanner.target_url}
                onChange={handleInputChanges}
                id="target_url"
              />
            </FormGroup>

            <FormGroup>
              <Label className="col-form-label">Type:</Label>
              <div className="d-flex justify-content-start mt-2 m-checkbox-inline custom-radio-ml radio-animated">
                <FormGroup check className="me-3">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="slider"
                      className="radio_animated"
                      checked={selectedBanner.type === "slider"}
                      onChange={handleInputChanges}
                    />
                    Slider
                  </Label>
                </FormGroup>
                <FormGroup check className="me-3  m-checkbox-inline custom-radio-ml radio-animated">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="popup"
                      className="radio_animated"
                      checked={selectedBanner.type === "popup"}
                      onChange={handleInputChanges}
                    />
                    Popup
                  </Label>
                </FormGroup>
                <FormGroup check className="m-checkbox-inline custom-radio-ml radio-animated">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      className="radio_animated"
                      value="parallax"
                      checked={selectedBanner.type === "parallax"}
                      onChange={handleInputChanges}
                    />
                    Parallax
                  </Label>
                </FormGroup>
              </div>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title" className="col-form-label">
                Title :
              </Label>
              <Input
                type="text"
                name="title"
                value={selectedBanner.title}
                onChange={handleInputChanges}
                id="title"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title2" className="col-form-label">
                Title 2 :
              </Label>
              <Input
                type="text"
                name="title2"
                value={selectedBanner.title2}
                onChange={handleInputChanges}
                id="title2"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description" className="col-form-label">
                Description :
              </Label>
              <Input
                type="textarea"
                name="description"
                value={selectedBanner.description}
                onChange={handleInputChanges}
                id="description"
              />
            </FormGroup>

            <div className="row p-5">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="primary_color" className="form-label">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    id="primary_color"
                    name="primary_color"
                    value={selectedBanner.primary_color}
                    onChange={handleInputChanges}
                    className="form-control form-control-color"
                    style={{ width: "100px", height: "50px" }} // Adjust color picker size
                  />
                </div>
                <div className="mt-2">
                  <strong>Selected Color:</strong> {selectedBanner.primary_color}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="secondary_color" className="form-label">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    id="secondary_color"
                    name="secondary_color"
                    value={selectedBanner.secondary_color}
                    onChange={handleInputChanges}
                    className="form-control form-control-color"
                    style={{ width: "100px", height: "50px" }} // Adjust color picker size
                  />
                </div>
                <div className="mt-2">
                  <strong>Selected Color:</strong> {selectedBanner.secondary_color}
                </div>
              </div>
            </div>

            <FormGroup>
              <Label htmlFor="image" className="col-form-label">
                Branner Image:
              </Label>
              {selectedBanner.image && (
                <div>
                  <img
                    src={selectedBanner.image}
                    alt="Current brand"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      position: "relative",
                    }}
                  />

                  <FaTrashAlt
                    onClick={() =>
                      setSelectedBanner((prevState) => ({
                        ...prevState,
                        image: "",
                      }))
                    }
                    style={{
                      position: "absolute",
                      top: "192%",
                      right: "82%",
                      cursor: "pointer",
                      color: "red",
                      fontSize: "20px",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
              )}

            </FormGroup>

            <FormGroup>
              <Label htmlFor="banner-image" className="col-form-label">
                Banner Image :
              </Label>
              <Input
                id="banner-image"
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmits} disabled={isProcessing}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal2} disabled={isProcessing}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default BannerList;
