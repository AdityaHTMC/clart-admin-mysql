/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Input,
  FormGroup,
  Label,
  TabPane,
  TabContent,
  NavItem,
  NavLink,
  Nav,
  CardBody,
} from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { FaReceipt } from "react-icons/fa";
import {
  IoDownloadOutline} from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useCommonContext } from "../helper/CommonProvider";
const OrderDetails = () => {
  const { id } = useParams();
  const { getOrderDetails, orderDetails,approvetransation } = useCommonContext();
  const [activeTab, setActiveTab] = useState("1");
  useEffect(() => {
    if (id) {
      getOrderDetails(id);
    }
  }, [id]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleApprove = (transactionId) => {
    console.log("Approving transaction:", transactionId);

    const dataToSend = {
      status: "approved",
      transaction_id: transactionId,
      id: id,
      order_id: orderDetails.data?.id,
    }
    approvetransation(dataToSend);
  };

  const handleReject = (transactionId) => {
    console.log("Rejecting transaction:", transactionId);

    const dataToSend = {
      status: "rejected",
      transaction_id: transactionId,
      id: id,
      order_id: orderDetails.data?.id,
    }

    approvetransation(dataToSend);
  };

  // Calculate total paid amount

const totalPaid = orderDetails?.data?.payments?.reduce((sum, item) => sum + (parseInt(item.amount) || 0), 0) || 0;


  console.log(orderDetails, "orderDetails");

  return (
    <>
      <CommonBreadcrumb title="Order Details" parent="Physical" />
      <Container style={{ padding: "20px", maxWidth: "1200px" }}>
        <Row>
          <Col md="8">
            <Card
              body
              style={{
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <h5>
                  Order Id:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {orderDetails.data?.order_id}{" "}
                  </span>
                </h5>
                <p style={{ color: "#777", margin: 0 }}>
                  {new Date(orderDetails.data?.order_date).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}
                </p>
              </div>
              <div className="mt-2 h6 fs-4">Item List </div>
              <Table bordered hover style={{ marginTop: "20px" }}>
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.data?.items?.map((item) => (
                    <>
                      <tr>
                        <td>1</td>
                        <td>{item?.breed_name}</td>
                        <td>{item?.unit_price}</td>
                        <td>{item?.quantity} </td>
                        <td>₹{item?.total_price}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>

              <div className="mt-2 h6 fs-4">Packing Box List </div>
              <Table bordered hover style={{ marginTop: "20px" }}>
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Packing Box Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.data?.items?.map((item) => (
                    <>
                      <tr>
                        <td>1</td>
                        <td
                          style={{
                            maxWidth: "150px",
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {item?.breed_name || "NA"}
                        </td>

                        <td>{item?.packing_box_price || "NA"}</td>
                        <td>{item?.packing_quantity || "NA"} </td>
                        <td>₹{item?.packing_box_total_price || "NA"}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
              {orderDetails?.data?.payments?.length > 0 && (
                <>
                  <div className="mt-2 h6 fs-4">Payment Details</div>
                  <Table bordered hover style={{ marginTop: "20px" }}>
                    <thead>
                      <tr>
                        <th>Payment Mode</th>
                        <th>Transaction Id</th>
                        <th>Status</th>
                        <th>Receipt</th>
                        <th>Amount</th>
                        <th>Payment Date</th>
                        <th>Approve</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.data?.payments?.map((item) => (
                        <tr key={item.transaction_id}>
                          <td>{item?.payment_mode}</td>
                          <td>{item?.transaction_id}</td>
                          <td>{item?.payment_status}</td>

                          <td>
                            {item?.receipt ? (
                              <a
                                href={item.receipt}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <IoDownloadOutline size={20} />
                              </a>
                            ) : (
                              <span
                                className="text-muted"
                                style={{ fontSize: "12px" }}
                              >
                                No receipt found
                              </span>
                            )}
                          </td>

                          <td>{item?.amount}</td>
                          <td>{item?.payment_date}</td>
                          <td className="d-flex flex-column align-items-center">
                            <Button
                              color="success"
                              size="sm"
                              className="rounded-pill px-2 py-1 mb-1"
                              style={{ fontSize: "12px" }}
                              onClick={() => handleApprove(item.transaction_id)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              className="rounded-pill px-2 py-1"
                              style={{ fontSize: "12px" }}
                              color="primary"
                              onClick={() => handleReject(item.transaction_id)}
                            >
                              Reject
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <p>Total Price: ₹ {orderDetails?.data?.total_amount} </p>
                <p>
                  Delivery Charge: ₹ {orderDetails?.data?.shipping_charges || 0}
                </p>
                <h5 style={{ fontWeight: "bold" }}>
                  Grand Total: ₹{" "}
                  {(orderDetails?.data?.final_amount || 0) +
                    (orderDetails?.data?.shipping_charges || 0)}
                </h5>
                <h6 style={{ fontWeight: "bold" }}>
                  Paid Amount: ₹ {totalPaid}
                </h6>
                <h6 style={{ fontWeight: "bold" }}>
                  Due Amount: ₹ {parseInt(orderDetails?.data?.due_amount) || 0}
                </h6>
              </div>
            </Card>
          </Col>

          <Col md="4">
            <Card
              body
              style={{
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Button
                color="primary"
                style={{ marginBottom: "10px", float: "right" }}
              >
                <FaReceipt fontSize={12} /> Print Invoice
              </Button>
              <div style={{ marginBottom: "10px", clear: "both" }}>
                <h5>
                  Order Status:{" "}
                  <Badge color="warning"> {orderDetails?.data?.status} </Badge>
                </h5>
                <h5>
                  Payment Status:{" "}
                  <Badge color="warning">
                    {" "}
                    {orderDetails?.data?.payment_status}{" "}
                  </Badge>
                </h5>
                <h5>
                  Payment Method:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {" "}
                    {orderDetails?.data?.payment_mode}{" "}
                  </span>
                </h5>
              </div>

              <FormGroup>
                <Label for="orderStatus">Change Order Status</Label>
                <Input type="select" name="orderStatus" id="orderStatus">
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </Input>
              </FormGroup>
            </Card>

            <Card
              style={{
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                border: "none",
              }}
            >
              <Nav tabs style={{ marginBottom: "20px" }}>
                <NavItem>
                  <NavLink
                    className={activeTab === "1" ? "active-tab" : ""}
                    onClick={() => toggleTab("1")}
                    style={{
                      cursor: "pointer",
                      padding: "8px 8px",
                      marginRight: "10px",
                      borderRadius: "5px",
                      backgroundColor:
                        activeTab === "1" ? "#007bff" : "#f8f9fa",
                      color: activeTab === "1" ? "#fff" : "#007bff",
                      fontWeight: activeTab === "1" ? "bold" : "normal",
                      transition: "background-color 0.3s ease",
                      fontSize: "14px",
                    }}
                  >
                    Shipping Address
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active-tab" : ""}
                    onClick={() => toggleTab("2")}
                    style={{
                      cursor: "pointer",
                      padding: "8px 8px",
                      borderRadius: "5px",
                      backgroundColor:
                        activeTab === "2" ? "#007bff" : "#f8f9fa",
                      color: activeTab === "2" ? "#fff" : "#007bff",
                      fontWeight: activeTab === "2" ? "bold" : "normal",
                      transition: "background-color 0.3s ease",
                      fontSize: "14px",
                    }}
                  >
                    Billing Address
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab} style={{ marginTop: "20px" }}>
                {/* Shipping Address Tab */}
                <TabPane tabId="1">
                  <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                    Shipping Address
                  </h5>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Name:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.first_name}{" "}
                    {orderDetails?.data?.shipping_address?.last_name}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Phone:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.phone_number}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>State:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.state}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>city:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.city}
                  </p>

                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Post Code:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.postal_code}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Address Line:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.address_line_1}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Address Line 2:</strong>{" "}
                    {orderDetails?.data?.shipping_address?.address_line_2}
                  </p>
                </TabPane>

                {/* Billing Address Tab */}
                <TabPane tabId="2">
                  <h5 style={{ fontWeight: "bold", marginBottom: "15px" }}>
                    Billing Address
                  </h5>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Name:</strong>{" "}
                    {orderDetails?.data?.billing_address?.first_name}{" "}
                    {orderDetails?.data?.billing_address?.last_name}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Phone:</strong>{" "}
                    {orderDetails?.data?.billing_address?.phone_number}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>State:</strong>{" "}
                    {orderDetails?.data?.billing_address?.state}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>city:</strong>{" "}
                    {orderDetails?.data?.billing_address?.city}
                  </p>

                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Post Code:</strong>{" "}
                    {orderDetails?.data?.billing_address?.postal_code}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Address Line:</strong>{" "}
                    {orderDetails?.data?.billing_address?.address_line_1}
                  </p>
                  <p style={{ marginBottom: "8px", fontSize: "14px" }}>
                    <strong>Address Line 2:</strong>{" "}
                    {orderDetails?.data?.billing_address?.address_line_2}
                  </p>
                </TabPane>
              </TabContent>
            </Card>

            <Card
              body
              style={{
                padding: "20px",
                boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h5>Customer Info</h5>
              <p style={{ marginBottom: "5px" }}>
                Name: {orderDetails?.data?.user_name}{" "}
              </p>
              <p style={{ marginBottom: "5px" }}>
                Phone: {orderDetails?.data?.user_email}{" "}
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetails;
