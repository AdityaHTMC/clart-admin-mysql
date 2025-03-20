/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCommonContext } from "../../helper/CommonProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";


const EditEvent = () => {
  const { id } = useParams();

  const { geteventDetail,editEvent,eventDetails } = useCommonContext();

  console.log(eventDetails,'eventDetails')


  // States to store editable fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setlocation] = useState("");
  const [primary_image, setprimary_image] = useState("");
  const [date, setdate] = useState("");
  const [gallery_images, setgallery_images] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [preview, setPreview] = useState(null);
  const [priImages, setPriImages] = useState([]);

  useEffect(() => {
    if (id) {
      geteventDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (eventDetails) {
      // Populate input fields with existing data
      setTitle(eventDetails?.data?.title || "");
      setDescription(eventDetails?.data?.description || "");
      setlocation(eventDetails?.data?.location || "");
      setdate(eventDetails?.data?.date || "");
      setprimary_image(eventDetails?.data?.primary_image || "");
      setgallery_images(eventDetails?.data?.gallery_images || []);
    }
  }, [eventDetails]);

  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPriImages(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const removeImage = () => {
    setPriImages(null);
    setPreview(null);
  };

  const handleOfferEndDateChange = (e) => {
    const { value } = e.target;
    const formattedDate = new Date(value).toISOString();
    setdate(formattedDate); // Update the state with the new date
  };
  // Handle image removal for existing images
  const handleRemoveImage = (index) => {
    const updatedImages = gallery_images.filter((_, imgIndex) => imgIndex !== index);
    setgallery_images(updatedImages);
  };

  // Handle image removal for new images
  const handleRemoveNewImage = (index) => {
    const updatedNewImages = newImages.filter((_, imgIndex) => imgIndex !== index);
    const updatedPreviews = newImagePreviews.filter((_, imgIndex) => imgIndex !== index);
    setNewImages(updatedNewImages);
    setNewImagePreviews(updatedPreviews);
  };

  // Handle new image upload with preview
  const handleNewImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setNewImages([...newImages, ...selectedFiles]);
    setNewImagePreviews([...newImagePreviews, ...previewUrls]);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value); // Set description directly to the new value
  };



  // Submit handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("title", title);
    formDataToSend.append("description", description);
    formDataToSend.append("location", location);
    formDataToSend.append("date", date);
    formDataToSend.append("primary_image", priImages);

  // Combine existing and new images
  const combinedImages = [...gallery_images, ...newImages];

  combinedImages.forEach((image, index) => {
    // Existing images are URLs; new images are files
    if (image instanceof File) {
      formDataToSend.append(`gallery_images[${index}]`, image);
    } else {
      formDataToSend.append(`gallery_images[${index}]`, image); // Handle as a URL
    }
  });
  
    try {
      // Call the API to update product
      await editEvent(id, formDataToSend);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Event" />
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
          {/* itemName */}
          <div className="row">
            <FormGroup className="col-md-6">
              <Label for="title">Event Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="col-md-6">
              <Label for="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={location} // Pre-populate with existing itemName
                onChange={(e) => setlocation(e.target.value)}
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
                value={date ? date.split("T")[0] : ""}
                onChange={handleOfferEndDateChange}
                id="date"
              />
            </FormGroup>
          </div>

          <FormGroup>
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
                style={{
                  borderRadius: "8px",
                  height: "390px",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              />
              <small className="form-text text-muted">
                Describe your content in detail to attract viewers.
              </small>
            </div>
          </FormGroup>

          {/* Existing Images */}
          <FormGroup className="mt-4">
             <Label>Existing Gallery Images</Label> 
            <Row>
              {gallery_images?.map((image, index) => (
                <Col key={index} sm="2">
                  <div
                    className="image-wrapper"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={image}
                      alt={`Gallery Image ${index}`}
                      style={{
                        width: "100px",
                        height: "auto",
                        marginBottom: "10px",
                      }}
                    />
                    <FaTrashAlt
                      onClick={() => handleRemoveImage(index)}
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

          {/* New Images with Preview */}
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

          {/* New Images Preview */}
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

          <FormGroup>
            <Label htmlFor="image" className="col-form-label font-weight-bold">
              Edit Primary Image:
            </Label>
            <Input
              type="file"
              name="image"
              id="image"
              onChange={handleSingleImageChange}
              accept="image/*"
              style={{ borderRadius: "5px", padding: "5px" }}
            />
          </FormGroup>

          <div>
            {preview && (
              <div
                style={{
                  position: "relative",
                  margin: "5px",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "10px",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title="Remove Image"
                >
                  <FaTrashAlt style={{ color: "red", fontSize: "18px" }} />
                </button>
              </div>
            )}
          </div>

          <Button color="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditEvent;
