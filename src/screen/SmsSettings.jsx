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

const SmsSettings = () => {
  const navigate = useNavigate();
  const { getSmsSettingsList,smsSettingsList,editSMSSettingsList } =
    useMasterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
  smsSettingsList?.total &&
    Math.ceil(smsSettingsList?.total / itemperPage);

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedvarity, setSelectedvarity] = useState({
    auth_key: "",
    base_url: "",
    country: "",
    provider_name: "",
    sender_id: "",
  });

  useEffect(() => {
    getSmsSettingsList();
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
    editSMSSettingsList(selectedvarity.id, selectedvarity);
    onCloseModal2();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      // delete product logic here
      // DeleteSpecies(id);
    }
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="SMS Settings" />
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
                        <th>Auth key</th>
                        <th>Base Url</th>
                        <th>Country</th>
                        <th>Provider Name</th>
                        <th>Sender Id</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {smsSettingsList?.loading ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : smsSettingsList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        smsSettingsList?.data?.map((product, index) => (
                          <tr key={index}>
                              <td id={`auth_key-${index}`}>
                                {product?.auth_key
                                  ? product?.auth_key?.length > 20
                                    ? `${product?.auth_key?.slice(0, 20)}...`
                                    : product?.auth_key
                                  : "NA"}
                                {product?.auth_key && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`auth_key-${index}`}
                                  >
                                    {product?.auth_key}
                                  </UncontrolledTooltip>
                                )}
                              </td>
                              <td id={`base_url-${index}`}>
                                {product?.base_url
                                  ? product?.base_url?.length > 20
                                    ? `${product?.base_url?.slice(0, 20)}...`
                                    : product?.base_url
                                  : "NA"}
                                {product?.base_url && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`base_url-${index}`}
                                  >
                                    {product?.base_url}
                                  </UncontrolledTooltip>
                                )}
                              </td>
                            <td>{product.country}</td>
                            <td>{product.provider_name}</td>
                            <td id={`sender_id-${index}`}>
                                {product?.sender_id
                                  ? product?.sender_id?.length > 20
                                    ? `${product?.sender_id?.slice(0, 20)}...`
                                    : product?.sender_id
                                  : "NA"}
                                {product?.sender_id && (
                                  <UncontrolledTooltip
                                    placement="top"
                                    target={`sender_id-${index}`}
                                  >
                                    {product?.sender_id}
                                  </UncontrolledTooltip>
                                )}
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
            Edit SMS Settings
          </h5>
        </ModalHeader>
        <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="auth_key" className="col-form-label">
                   Auth Key:
                  </Label>
                  <Input
                    type="text"
                    name="auth_key"
                    value={selectedvarity.auth_key}
                    onChange={handleInputChanges}
                    id="auth_key"
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="base_url" className="col-form-label">
                  Base Url:
                  </Label>
                  <Input
                    type="text"
                    name="base_url"
                    value={selectedvarity.base_url}
                    onChange={handleInputChanges}
                    id="base_url"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="country" className="col-form-label">
                  Country:
                  </Label>
                  <Input
                    type="text"
                    name="country"
                    value={selectedvarity.country}
                    onChange={handleInputChanges}
                    id="country"
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="provider_name" className="col-form-label">
                  Provider Name:
                  </Label>
                  <Input
                    type="text"
                    name="provider_name"
                    value={selectedvarity.provider_name}
                    onChange={handleInputChanges}
                    id="provider_name"
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="sender_id" className="col-form-label">
                  Sender Id:
                  </Label>
                  <Input
                    type="text"
                    name="sender_id"
                    value={selectedvarity.sender_id}
                    onChange={handleInputChanges}
                    id="sender_id"
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

export default SmsSettings;
