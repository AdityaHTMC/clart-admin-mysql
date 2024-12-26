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
  import { Pagination, Stack } from "@mui/material";
  import { useMasterContext } from "../helper/MasterProvider";
  import CommonBreadcrumb from "../component/common/bread-crumb";
  
  const EmailSettings = () => {
    const navigate = useNavigate();
    const { getEmailSettingsList,editEmailSettingsList,emailSettingsList, deleteEmailList } =
      useMasterContext();
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemperPage = 8;
  
    const totalPages =
    emailSettingsList?.total &&
      Math.ceil(emailSettingsList?.total / itemperPage);
  
    const [modalOpen, setModalOpen] = useState(false);
  
    const [selectedvarity, setSelectedvarity] = useState({
      email_id: "",
      password: "",
      pop3: "",
      pop_port: "",
      smtp: "",
      smtp_port: "",
    });
  
    useEffect(() => {
        getEmailSettingsList();
    }, [currentPage]);
  
    const onOpenModal2 = (product) => {
      setSelectedvarity(product);
      setModalOpen(true);
    };
  
    // Close the modal
    const onCloseModal2 = () => {
      setModalOpen(false);
      setSelectedvarity({
        auth_key: "",
        base_url: "",
        country: "",
        provider_name: "",
        sender_id: "",
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
  
    // Handle submit for updating the brand
    const handleSubmits = () => {
        editEmailSettingsList(selectedvarity.id, selectedvarity);
      onCloseModal2();
    };
  
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        deleteEmailList(id);
      }
    };
  
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };
  
    return (
      <>
        <CommonBreadcrumb title="Email Settings" />
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
                          <th>Email_id</th>
                          <th>password</th>
                          <th>Pop3</th>
                          <th>Pop Port</th>
                          <th>Smtp</th>
                          <th>Smtp Port</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailSettingsList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : emailSettingsList?.data?.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                            emailSettingsList?.data?.map((product, index) => (
                            <tr key={index}>
                                <td id={`email_id-${index}`}>
                                  {product?.email_id
                                    ? product?.email_id?.length > 20
                                      ? `${product?.email_id?.slice(0, 20)}...`
                                      : product?.email_id
                                    : "NA"}
                                  {product?.email_id && (
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`email_id-${index}`}
                                    >
                                      {product?.email_id}
                                    </UncontrolledTooltip>
                                  )}
                                </td>
                                <td id={`password-${index}`}>
                                  {product?.password
                                    ? product?.password?.length > 20
                                      ? `${product?.password?.slice(0, 20)}...`
                                      : product?.password
                                    : "NA"}
                                  {product?.password && (
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`password-${index}`}
                                    >
                                      {product?.password}
                                    </UncontrolledTooltip>
                                  )}
                                </td>
                              <td>{product.pop3}</td>
                              <td>{product.pop_port}</td>
                              <td id={`smtp-${index}`}>
                                  {product?.smtp
                                    ? product?.smtp?.length > 20
                                      ? `${product?.smtp?.slice(0, 20)}...`
                                      : product?.smtp
                                    : "NA"}
                                  {product?.smtp && (
                                    <UncontrolledTooltip
                                      placement="top"
                                      target={`smtp-${index}`}
                                    >
                                      {product?.smtp}
                                    </UncontrolledTooltip>
                                  )}
                                </td>
                                <td>{product.smtp_port}</td>
                         
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
                    <Label htmlFor="email_id" className="col-form-label">
                     Email Id:
                    </Label>
                    <Input
                      type="text"
                      name="email_id"
                      value={selectedvarity.email_id}
                      onChange={handleInputChanges}
                      id="email_id"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="password" className="col-form-label">
                     Password:
                    </Label>
                    <Input
                      type="text"
                      name="password"
                      value={selectedvarity.password}
                      onChange={handleInputChanges}
                      id="password"
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="pop3" className="col-form-label">
                     Pop3:
                    </Label>
                    <Input
                      type="text"
                      name="pop3"
                      value={selectedvarity.pop3}
                      onChange={handleInputChanges}
                      id="pop3"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="pop_port" className="col-form-label">
                     Pop Port:
                    </Label>
                    <Input
                      type="text"
                      name="pop_port"
                      value={selectedvarity.pop_port}
                      onChange={handleInputChanges}
                      id="pop_port"
                    />
                  </FormGroup>
                </div>
              </div>
  
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="smtp" className="col-form-label">
                    Smtp:
                    </Label>
                    <Input
                      type="text"
                      name="smtp"
                      value={selectedvarity.smtp}
                      onChange={handleInputChanges}
                      id="smtp"
                    />
                  </FormGroup>
                </div>
                <div className="col-md-6">
                  <FormGroup>
                    <Label htmlFor="smtp_port" className="col-form-label">
                    smtp_port:
                    </Label>
                    <Input
                      type="text"
                      name="smtp_port"
                      value={selectedvarity.smtp_port}
                      onChange={handleInputChanges}
                      id="smtp_port"
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
  
  export default EmailSettings;
  