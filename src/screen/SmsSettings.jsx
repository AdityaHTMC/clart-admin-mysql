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

import { Spinner } from "reactstrap";
import { FaSave,FaTimes  } from "react-icons/fa";
import { useCommonContext } from "../helper/CommonProvider";

const SmsSettings = () => {
    const navigate = useNavigate();
    const { getSmsSetting, smsData, SmsUpdateSetting } = useCommonContext(); // Assuming you have an update function in your context
  
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ auth_key: "", sender: "" });
  
    useEffect(() => {
      getSmsSetting();
    }, []);
  
    useEffect(() => {
      if (smsData) {
        setFormData({
          auth_key: smsData.data.auth_key || "",
          sender: smsData.data.sender || "",
          id: smsData.data._id || "",
        });
      }
    }, [smsData]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleUpdate = () => {
      // Call your update API here using the updateSmsSetting function
      SmsUpdateSetting(formData)
        .then(() => {
          setIsEditing(false); // Exit editing mode
          getSmsSetting(); // Refresh the settings after update
        })
        .catch((error) => {
          console.error("Error updating SMS settings:", error);
        });
    };
  
    const handleCancelEdit = () => {
      setIsEditing(false);
      // Reset form data to the original values
      setFormData({
        auth_key: smsData.data.auth_key || "",
        sender: smsData.data.sender || "",
      });
    };
  
    return (
      <>
        <CommonBreadcrumb title="SMS Setting" parent="Physical" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <div className="mb-3">
                      <label htmlFor="auth_key" className="form-label">Auth Key:</label>
                      <Input
                        type="text"
                        id="auth_key"
                        name="auth_key"
                        value={formData.auth_key}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`form-control ${isEditing ? 'border-primary' : ''}`}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="sender" className="form-label">Sender:</label>
                      <Input
                        type="text"
                        id="sender"
                        name="sender"
                        value={formData.sender}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`form-control ${isEditing ? 'border-primary' : ''}`}
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <Button 
                        color={isEditing ? "primary" : "primary"}
                        onClick={() => {
                          if (isEditing) {
                            handleCancelEdit();
                          } else {
                            setIsEditing(true);
                          }
                        }}
                      >
                        {isEditing ? <FaTimes /> : <FaEdit />} {isEditing ? "Cancel" : "Edit"}
                      </Button>
                      {isEditing && (
                        <Button color="success" onClick={handleUpdate}>
                          Update
                        </Button>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };

export default SmsSettings;
