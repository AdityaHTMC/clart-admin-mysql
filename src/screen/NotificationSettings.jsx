/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
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
    UncontrolledTooltip,
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { FaEdit } from "react-icons/fa";
  import { FaTrashAlt } from "react-icons/fa";
  import { Spinner } from "reactstrap";
  import { Pagination, Stack, Switch } from "@mui/material";
  import { useMasterContext } from "../helper/MasterProvider";
  import CommonBreadcrumb from "../component/common/bread-crumb";
  
  const NotificationSettings = () => {
    const navigate = useNavigate();
    const {getNotificationSettingsList,editNotificationSettingsList,notificationSettingsList,deleteNotificationList} =
      useMasterContext();
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemperPage = 8;
  
    const totalPages =
    notificationSettingsList?.total &&
      Math.ceil(notificationSettingsList?.total / itemperPage);
  
    const [modalOpen, setModalOpen] = useState(false);
  
    const [selectedvarity, setSelectedvarity] = useState({
    notification_type:'',
    });
  
    useEffect(() => {
        getNotificationSettingsList();
    }, [currentPage]);
  
    const onOpenModal2 = (product) => {
      setSelectedvarity(product);
      setModalOpen(true);
    };
  
    // Close the modal
    const onCloseModal2 = () => {
      setModalOpen(false);
      setSelectedvarity({
        notification_type:'',
      });
    };
  
    // Handle form input change
    const handleInputChanges = (e) => {
      const { name, value } = e.target;
      setSelectedvarity((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleStatusToggle = (promo) => {
        const newStatus = promo.enabled === "No" ? "Yes" : "No";
        editNotificationSettingsList(promo.id, { enabled: newStatus });
      };
  
    // Handle submit for updating the brand
    const handleSubmits = () => {
        editNotificationSettingsList(selectedvarity.id, selectedvarity);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        deleteNotificationList(id);
      }
    };
  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Notification Settings" />
        <Container fluid>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <div className="btn-popup pull-right"></div>
                  <div className="clearfix"></div>
                  <div id="basicScenario" className="product-physical">
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>notification_type</th>
                          <th>Enable</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notificationSettingsList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : notificationSettingsList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            notificationSettingsList?.data?.map((product, index) => (
                            <tr key={index}>
                                <td>{product.notification_type}</td>
                                <td>
                                <Switch
                                  checked={product.enabled === "Yes"}
                                  onChange={() => handleStatusToggle(product)}
                                  color="secondary"
                                />
                                  </td>
                              <td>
                                <div className="circelBtnBx">
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => onOpenModal2(product)}
                                  >
                                    <FaEdit />
                                  </Button>
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleDelete(product.id)}
                                  >
                                    <FaTrashAlt />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                      <Stack className="rightPagination mt10" spacing={2}>
                        <Pagination
                          color="primary"
                          count={totalPages}
                          page={currentPage}
                          shape="rounded"
                          onChange={(event, value) => handlepagechange(value)}
                        />
                      </Stack>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
  
        <Modal isOpen={modalOpen} toggle={onCloseModal2} className="modal-lg">
          <ModalHeader toggle={onCloseModal2}>
            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
              Edit Email Settings
            </h5>
          </ModalHeader>
          <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="notification_type" className="col-form-label">
                     Notification Type:
                    </Label>
                    <Input
                      type="text"
                      name="notification_type"
                      value={selectedvarity.notification_type}
                      onChange={handleInputChanges}
                      id="notification_type"
                    />
                  </FormGroup>
                </div>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmits}>
              Save
            </Button>
            <Button color="secondary" onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };
  
  export default NotificationSettings;
  