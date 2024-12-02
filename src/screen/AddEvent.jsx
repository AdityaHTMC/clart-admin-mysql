/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useCommonContext } from "../helper/CommonProvider";
const AddEvent = () => {
  const navigate = useNavigate();

  const {
    addEvent
  } = useCommonContext();

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    primary_image: null,
    gallery_images: [],
  });


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOfferEndDateChange = (e) => {
    const { value } = e.target;

    // Convert the date to ISO format
    const formattedDate = new Date(value).toISOString();

    setInputData((prevData) => ({
      ...prevData,
      date: formattedDate,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setInputData((prevData) => ({
      ...prevData,
      gallery_images: [...prevData.gallery_images, ...selectedFiles], // Append new images
    }));
  };

  const handleDescriptionChange = (value) => {
    setInputData((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const removeImage = (index) => {
    setInputData((prevData) => ({
      ...prevData,
      gallery_images: prevData.gallery_images.filter((_, i) => i !== index), // Remove image at index
    }));
  };

  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputData((prevData) => ({
        ...prevData,
        primary_image: file,
      }));
    }
  };

  const handleImageDelete = () => {
    setInputData((prevData) => ({
      ...prevData,
      primary_image: null, // Set back to null when deleting
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("description", inputData.description);
    formDataToSend.append("title", inputData.title);
    formDataToSend.append("location", inputData.location);
    formDataToSend.append("date", inputData.date);
    formDataToSend.append("primary_image", inputData.primary_image);

    inputData.gallery_images.forEach((image, index) => {
      formDataToSend.append(`gallery_images[${index}]`, image);
    });

    addEvent(formDataToSend);

    console.log(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Event" parent="Physical" />
      <div className="product-form-container" style={{ padding: "2px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label
                  htmlFor="itemName"
                  className="col-form-label font-weight-bold"
                >
                  Event Name:
                </Label>
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
                <Label htmlFor="offer_end_date" className="col-form-label">
                  Event Date:
                </Label>
                <Input
                  type="date"
                  name="date"
                  value={inputData.date ? inputData.date.split("T")[0] : ""}
                  onChange={handleOfferEndDateChange}
                  id="date"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FormGroup>
                <Label htmlFor="location" className="col-form-label">
                  Event venue:
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={inputData.location}
                  onChange={handleInputChange}
                  id="location"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <FormGroup>
                <div className="mb-4">
                  <label htmlFor="description" className="form-label mb-1">
                    Description:
                  </label>
                  <ReactQuill
                    id="description"
                    name="description"
                    value={inputData.description}
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
            </div>
          </div>

          {/* upload single img */}

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="images" className="col-form-label">
                  Upload Primary Image:
                </Label>
                <Input
                  type="file"
                  name="selectedImage"
                  id="selectedImage"
                  onChange={handleSingleImageChange}
                  accept="image/*"
                />
              </FormGroup>

              {/* {inputData.primary_image && (
              <div className="image-preview">
                <img
                  src={inputData.primary_image}
                  alt="Preview"
                  style={{ width: "100%", height: "auto", marginTop: "10px" }}
                />
                <button
                  onClick={handleImageDelete}
                  className="btn btn-danger"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "red",
                    border: "none",
                    cursor: "pointer",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                >
                  <FaTrashAlt color="white" />
                </button>
              </div>
            )} */}
            </div>
          </div>

          {/* upload multiple img */}

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="images" className="col-form-label">
                  Upload gallery Images:
                </Label>
                <Input
                  type="file"
                  name="gallery_images"
                  id="gallery_images"
                  onChange={handleImageChange}
                  multiple
                />
              </FormGroup>
            </div>
          </div>

          {/* Image previews */}
          <div className="row">
            {inputData?.gallery_images?.length > 0 && (
              <div className="col-md-12">
                <div
                  className="image-preview-container"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {inputData.gallery_images?.map((image, index) => (
                    <div
                      key={index}
                      className="image-preview"
                      style={{ position: "relative", margin: "5px" }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`preview-${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FaTrash style={{ color: "red" }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button type="submit" color="primary">
            Add Event
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddEvent;
