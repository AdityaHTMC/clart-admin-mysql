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
  
  const SubscribeEmail = () => {
      const navigate = useNavigate();
      const { getEmailSubscribeList , mailList} = useCommonContext(); // Assuming you have an update function in your context
    
      const [isEditing, setIsEditing] = useState(false);
      const [formData, setFormData] = useState({ auth_key: "", sender: "" });
    
      useEffect(() => {
        getEmailSubscribeList();
      }, []);
    
    
    
      return (
        <>
          <CommonBreadcrumb title="SUbscribed Email List" parent="Physical" />
          <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                <CardBody>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mailList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : mailList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            mailList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product.email}</td>
                              <td>{new Date(product.date).toLocaleDateString("en-GB")}</td>
                              <td>
                                <AiOutlineDelete
                                  size={20}
                                //   onClick={() => handleDelete(product._id)}
                                  style={{ cursor: "pointer" }}
                                />
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        </>
      );
    };
  
  export default SubscribeEmail;
  