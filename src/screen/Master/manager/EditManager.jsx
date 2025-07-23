import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Row,
  Badge,
} from "reactstrap";
import { FiUpload } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useMasterContext } from "../../../helper/MasterProvider";
import CommonBreadcrumb from "../../../component/common/bread-crumb";

const EditManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { updateManager, getManagerDetails, managerDetails } =
    useMasterContext();
  console.log(managerDetails, "managerDetails");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load manager details
  useEffect(() => {
    getManagerDetails(id);
  }, [id]);

  // Populate form once data is fetched
  useEffect(() => {
    if (managerDetails) {
      setFormData({
        name: managerDetails?.data?.name || "",
        email: managerDetails?.data?.email || "",
        mobile: managerDetails?.data?.mobile || "",
      });
      setPreview(managerDetails?.data?.image || null);
    }
  }, [managerDetails]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onReset = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
    });
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("mobile", formData.mobile);
    if (image) form.append("image", image);
    updateManager(id, form);
  };

  return (
    <React.Fragment>
      <CommonBreadcrumb title="Edit Manager" parent="Home" />
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
                      style={{
                        height: 200,
                        border: "1px dashed #ccc",
                        borderRadius: 8,
                      }}
                    >
                      <input
                        type="file"
                        className="position-absolute"
                        style={{
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                        }}
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
                  <Button
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Manager"}
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

export default EditManager;
