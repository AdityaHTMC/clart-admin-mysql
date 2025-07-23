import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Row,
} from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { useMasterContext } from "../../../helper/MasterProvider";

const AddManager = () => {
    const { addManager } = useMasterContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      setImage(img);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(img);
    }
  };

  const onReset = () => {
    setFormData({ name: "", email: "", mobile: "" });
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.mobile) {
      alert("All fields are required.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    if (image) {
      formDataToSend.append("image", image);
    }
addManager(formDataToSend)
  
  };

  return (
    <React.Fragment>
      <CommonBreadcrumb title="Add Manager" parent="Home" />
      <Container fluid>
        <Col sm="12">
          <Card>
            <CardBody>
              <Row className="mb-3">
                <Col md={4}>
                  <label>Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                  />
                </Col>
                <Col md={4}>
                  <label>Email</label>
                  <input
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                  />
                </Col>
                <Col md={4}>
                  <label>Mobile</label>
                  <input
                    className="form-control"
                    name="mobile"
                    value={formData.mobile}
                    onChange={onChange}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Card className="p-3">
                    <div
                      className="position-relative d-flex flex-column align-items-center gap-3"
                      style={{ height: 200, border: "1px dashed #ccc", borderRadius: 8 }}
                    >
                      <input
                        type="file"
                        className="position-absolute"
                        style={{ opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
                        onChange={handleImageChange}
                      />

                      {preview ? (
                        <div
                          className="position-relative"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <img
                            src={preview}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: 8,
                            }}
                          />
                          <Badge
                            className="position-absolute"
                            color="warning"
                            onClick={() => {
                              setImage(null);
                              setPreview(null);
                            }}
                            style={{ cursor: "pointer", top: 10, right: 10 }}
                          >
                            <AiOutlineDelete size={16} />
                          </Badge>
                        </div>
                      ) : (
                        <>
                          <FiUpload size={32} />
                          <CardText>Upload Profile Image</CardText>
                        </>
                      )}
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={6}>
                  <Button color="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Uploading..." : "Create Manager"}
                  </Button>{" "}
                  <Button color="secondary" onClick={onReset}>
                    Reset
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </React.Fragment>
  );
};

export default AddManager;
