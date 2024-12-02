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
  import { useCommonContext } from "../helper/CommonProvider";
  import avtar from '../../src/assets/profile.png'
  import { BsFillEyeFill } from "react-icons/bs";
  const OrderList = () => {
    const navigate = useNavigate();
  
    const { getOrderList,orderList } = useCommonContext();
  
    useEffect(() => {
        getOrderList();
    }, []);
  
    
  
    const handleStatusToggle = async (product) => {
      const newStatus = product.status === "Active" ? "Inactive" : "Active";
    //   await switchUser(product._id, newStatus); // Your API call here
    };

    const navigatePage =(id)=>{
        navigate(`/orders-details/${id}`); 
    }
  
    return (
      <>
        <CommonBreadcrumb title="Order List" parent="Physical" />
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
                          <th>Customer</th>
                          <th>Order Id</th>
                          <th>Order Date</th>
                          <th>Order Status</th>
                          <th>Order amount</th>
                          <th>Payment Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderList?.loading ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : orderList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No User Found
                            </td>
                          </tr>
                        ) : (
                            orderList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td>{product?.user_name} </td>
                              <td>{product?.order_id}</td>
                              <td>{new Date(product.order_date).toLocaleDateString("en-GB")}</td>
                              <td> {product?.status} </td>
                              <td> {product?.final_amount}</td>
                              <td>{product?.payment_status} </td>
                              <td> <BsFillEyeFill
                                style={{
                                  marginLeft: "5px",
                                  color: "#007bff",
                                  cursor: "pointer",
                                }}
                                onClick={() => navigatePage(product._id)}
                              /> </td>
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
  
  export default OrderList;
  