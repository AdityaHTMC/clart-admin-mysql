/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import CommonBreadcrumb from "../component/common/bread-crumb";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Spinner } from "reactstrap";
import { useCommonContext } from "../helper/CommonProvider";
import Switch from "@mui/material/Switch";
import { LoadingComponent } from "../component/common/loading";

const EventList = () => {
  const navigate = useNavigate();

  const { getEventList, eventList, eventDelete } = useCommonContext();

  const onOpenModal = () => {
    navigate("/add-event");
  };

  useEffect(() => {
    getEventList();
  }, []);

  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    //   await switchUser(product._id, newStatus); // Your API call here
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
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
                    <Table bordered hover responsive>
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
                        {!eventList.loading &&
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
                                  {/* <Button
                                    className="btn"
                                    color="link"
                                    onClick={() =>
                                      console.log(
                                        `Edit promo code ${event.code}`
                                      )
                                    }
                                  >
                                    <FaEdit />
                                  </Button> */}
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleDelete(event._id)}
                                  >
                                    <FaTrashAlt />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )
                          )}
                      </tbody>
                    </Table>
                    {!eventList.loading && eventList?.data?.length === 0 && (
                      <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                    )}

                    {eventList.loading && <LoadingComponent />}
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
