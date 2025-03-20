/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */


import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Spinner } from "reactstrap";
import Switch from "@mui/material/Switch";
import { useCommonContext } from "../../helper/CommonProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Pagination, Stack } from "@mui/material";

const EventList = () => {
  const navigate = useNavigate();

  const { getEventList, eventList,eventDelete } = useCommonContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages = eventList?.total && Math.ceil(eventList?.total / itemperPage);

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

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
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
                              {/* <td>{event?.title}</td> */}
                              <td id={`title-${index}`}>
                                {event?.title
                                  ? event.title.length > 35
                                    ? `${event.title.slice(0, 35)}...`
                                    : event.title
                                  : "NA"}
                                {event?.title?.length > 15 && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`title-${index}`}
                                  >
                                    {event.title}
                                  </UncontrolledTooltip>
                                )}
                              </td>
                              <td>
                                {new Date(event.date).toLocaleDateString(
                                  "en-GB"
                                )}
                              </td>

                              <td id={`location-${index}`}>
                                {event?.location
                                  ? event.location.length > 35
                                    ? `${event.location.slice(0, 35)}...`
                                    : event.location
                                  : "NA"}
                                {event?.location?.length > 35 && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`location-${index}`}
                                  >
                                    {event.location}
                                  </UncontrolledTooltip>
                                )}
                              </td>

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
                    <Stack className="rightPagination mt10" spacing={2}>
                    <Pagination
                      color="primary"
                      count={totalPages}
                      page={currentPage}
                      shape="rounded"
                      onChange={(event, value) => handlepagechange(value)}
                    />
                  </Stack>
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
