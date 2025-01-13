/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";
import { useMasterContext } from "../../helper/MasterProvider";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTrashAlt } from "react-icons/fa";

const EditAnimal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getproductDetails, prouctDetails, editProduct } =
    useCategoryContext();
  const { getAllSpeciesList, allspecies } = useMasterContext();

  const [error, setError] = useState("");

  useEffect(() => {
    getAllSpeciesList();
  }, []);

  useEffect(() => {
    if (id) {
      getproductDetails(id);
    }
  }, [id]);

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    species_for: "Lab",
    gov_price: "",
    non_gov_price: "",
    winning: "",
    calling: "",
    status: "",
    species_id: "",
    birth_cycle: "",
  });
  const [gallery_images, setgallery_images] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [description, setDescription] = useState("");
  console.log(prouctDetails, "prouctDetails");

  useEffect(() => {
    if (prouctDetails) {
      setInputData({
        title: prouctDetails.data?.title || "",
        status: prouctDetails.data?.status || "",
        species_id: prouctDetails.data?.species_id || "",
        winning: prouctDetails.data?.winning || "",
        calling: prouctDetails.data?.calling || "",
        gov_price: prouctDetails.data?.gov_price || "",
        non_gov_price: prouctDetails.data?.non_gov_price || "",
        birth_cycle: prouctDetails.data?.birth_cycle || "",
        species_for: prouctDetails.data?.species_for || "",
      });
      setgallery_images(prouctDetails?.data?.images || []);
      setDescription(prouctDetails.data?.description || "");
    }
  }, [prouctDetails]);

  const handleDescriptionChange = (value) => {
    setDescription(value); // Set description directly to the new value
  };

  const handleNewImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setNewImages([...newImages, ...selectedFiles]);
    setNewImagePreviews([...newImagePreviews, ...previewUrls]);
  };

  const handleRemoveNewImage = (index) => {
    const updatedNewImages = newImages.filter((_, imgIndex) => imgIndex !== index);
    const updatedPreviews = newImagePreviews.filter((_, imgIndex) => imgIndex !== index);
    setNewImages(updatedNewImages);
    setNewImagePreviews(updatedPreviews);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
 
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setInputData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("pincode", inputData.pincode);
    formDataToSend.append("city", inputData.city);
    formDataToSend.append("district", inputData.district);
    formDataToSend.append("state", inputData.state);

    if (inputData.image) {
      formDataToSend.append("image", inputData.image);
    }

    // editCustomer(id,formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Animal" />
      <div className="product-form-container" style={{ padding: "2px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="title"> title </Label>
                <Input
                  type="text"
                  name="title"
                  value={inputData.title}
                  onChange={handleInputChange}
                  id="title"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="species_for" className="col-form-label">
                  Status :
                </Label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={inputData.status}
                  onChange={handleInputChange}
                >
                  <option value="''">-- Select --</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </FormGroup>
            </div>
          </div>

          {/* Add the remaining inputs similarly, organizing them into rows as needed */}
          <div className="row">
            <div className="mb-4">
              <label htmlFor="description" className="form-label mb-1">
                Description:
              </label>
              <ReactQuill
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                theme="snow"
                placeholder="Enter a detailed description"
              />
              <small className="form-text text-muted">
                Describe your content in detail to attract viewers.
              </small>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="winning" className="col-form-label">
                  winning:
                </Label>
                <Input
                  type="number"
                  name="winning"
                  min={0}
                  value={inputData.winning}
                  onChange={handleInputChange}
                  id="winning"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="calling" className="col-form-label">
                  calling:
                </Label>
                <Input
                  type="text"
                  name="calling"
                  value={inputData.calling}
                  onChange={handleInputChange}
                  id="calling"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <FormGroup>
              <Label htmlFor="category" className="col-form-label">
                species:
              </Label>
              <Input
                type="select"
                name="species_id"
                value={inputData.species_id}
                onChange={handleInputChange}
                id="species_id"
              >
                <option value="">-- Select --</option>
                {allspecies?.data?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.species}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </div>


          <div className="row">
            <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
              <Label className="d-block">
                <Input
                  className="radio_animated"
                  type="radio"
                  name="species_for"
                  value="Sell"
                  onChange={handleInputChange}
                  checked={inputData.species_for === "Sell"}
                />
                For Sell
              </Label>
              <Label className="d-block mx-4">
                <Input
                  className="radio_animated"
                  type="radio"
                  name="species_for"
                  value="Lab"
                  onChange={handleInputChange}
                  checked={inputData.species_for === "Lab"}
                />
                For Lab
              </Label>
              <Label className="d-block">
                <Input
                  className="radio_animated"
                  type="radio"
                  name="species_for"
                  value="Both"
                  onChange={handleInputChange}
                  checked={inputData.species_for === "Both"}
                />
                For Both
              </Label>
            </FormGroup>
          </div>

          <div className="row">
            {inputData.species_for === "Sell" ||
            inputData.species_for === "Both" ? (
              <>
                <FormGroup>
                  <Label htmlFor="title" className="col-form-label">
                    Goverment Price :
                  </Label>
                  <Input
                    type="number"
                    name="gov_price"
                    placeholder="Enter goverment price"
                    value={inputData.gov_price}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="title" className="col-form-label">
                    Non Goverment Price :
                  </Label>
                  <Input
                    type="number"
                    name="non_gov_price"
                    placeholder="Enter non goverment price"
                    value={inputData.non_gov_price}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </>
            ) : null}
          </div>

          <div className="row">
          <FormGroup>
            <Label for="newImages">Add New Gallery Images</Label>
            <Input
              id="newImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageUpload}
            />
            <FormText color="muted">You can upload multiple images.</FormText>
          </FormGroup>
          
          </div>

          {newImagePreviews.length > 0 && (
            <FormGroup>
              <Label>New Image Previews</Label>
              <Row>
                {newImagePreviews.map((preview, index) => (
                  <Col key={index} sm="2">
                    <div
                      className="image-wrapper"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={preview}
                        alt={`New Image ${index}`}
                        style={{
                          width: "100px",
                          height: "auto",
                          marginBottom: "10px",
                        }}
                      />
                      <FaTrashAlt
                        onClick={() => handleRemoveNewImage(index)}
                        style={{
                          position: "absolute",
                          top: "90%",
                          right: "65%",
                          cursor: "pointer",
                          color: "red",
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </FormGroup>
          )}

       

          <Button type="submit" color="primary">
            Edit Customer
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditAnimal;
