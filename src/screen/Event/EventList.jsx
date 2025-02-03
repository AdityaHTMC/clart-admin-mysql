/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

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
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
// Register the necessary Chart.js components


import { Spinner } from "reactstrap";
import { useCommonContext } from "../helper/CommonProvider";
import avtar from "../../src/assets/profile.png";
import { BsFillEyeFill } from "react-icons/bs";
import Switch from "@mui/material/Switch";

const EventList = () => {
  const navigate = useNavigate();

  const { getEventList, eventList,eventDelete } = useCommonContext();

  const onOpenModal = () => {
    navigate("/addEvent");
  };

  useEffect(() => {
    getEventList();
  }, []);

  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
  };

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      eventDelete(id)
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Event List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>  
                    Add Event
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Event Image</th>
                          <th>Event Name</th>
                          <th>Event Date</th>
                          <th>Event Location</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {eventList?.loading ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : eventList?.data?.length === 0 ? (
                          // Show "No vendor found" when there's no data
                          <tr>
                            <td colSpan="6" className="text-center">
                              No Event found
                            </td>
                          </tr>
                        ) : (
                          eventList?.data?.map((event, index) => (
                            <tr key={index}>
                              <td>
                                <img
                                  src={event.primary_image}
                                  alt="img"
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                  }}
                                />
                              </td>
                              <td>{event?.title}</td>
                              <td>{new Date(event.date).toLocaleDateString("en-GB")}</td>
                              <td>{event?.location}</td>

                              <td>
                                <Switch
                                  checked={event.status}
                                  //   onChange={() => toggleStatus(index)}
                                  color="secondary"
                                />
                              </td>
                              <td>
                                <div className="circelBtnBx">
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleEdit(event.id)}
                                  >
                                    <FaEdit />
                                  </Button>
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleDelete(event.id)}
                                  >
                                    <FaTrashAlt />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
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

export default EventList;
