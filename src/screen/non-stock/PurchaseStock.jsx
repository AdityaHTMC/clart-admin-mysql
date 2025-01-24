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
import { Spinner } from "reactstrap";
import { Autocomplete, Pagination, Stack, TextField } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useSettingContext } from "../../helper/SettingProvider";

const PurchaseStock = () => {
  const navigate = useNavigate();

  const {
    getPurchaseList,
    purchaseList,
    getallvendorlist,
    allvendorList,
    addPurchase,
    getBeddingAlllist,
    getPackingAlllist,
    allBeddingList,
    allPackingList,
  } = useSettingContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Bedding");
  const itemperPage = 8;

  const totalPages =
    purchaseList?.total && Math.ceil(purchaseList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getPurchaseList(dataToSend);
  }, [currentPage]);

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    getallvendorlist();
    getBeddingAlllist();
    getPackingAlllist();
  }, []);

  const [formData, setFormData] = useState({
    vendor_id: "",
    order_id: "",
    date: "",
    invoice_number: "",
    packing_box_id: "",
    bedding_material_id: "",
    quantity: "",
    amount: "",
  });

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
      vendor_id: "",
    order_id: "",
    date: "",
    packing_box_id: "",
    bedding_material_id: "",
    quantity: "",
    amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVendorChange = (newValue) => {
    // Update vendor_id in formData
    setFormData((prevData) => ({
      ...prevData,
      vendor_id: newValue ? newValue.id : "", // Update vendor_id based on selection
    }));
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // Create a Date object from the selected date
    const formattedDate = selectedDate.toISOString(); // Convert to ISO string format

    setFormData((prevData) => ({
      ...prevData,
      date: formattedDate,
    }));
  };

  const getFormattedDate = (date) => {
    if (!date) return ""; // If no date, return an empty string
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? ""
      : parsedDate.toISOString().split("T")[0]; // Only return the date part
  };

  // Handle form submission
  const handleSubmit = () => {
    const formDataToSend = new FormData();

    // Append the fields to FormData
    formDataToSend.append("vendor_id", formData.vendor_id);
    formDataToSend.append("order_id", formData.order_id);
    formDataToSend.append("invoice_number", formData.invoice_number);
    formDataToSend.append("date", formData.date);
    if(selectedOption === "Bedding"){
      formDataToSend.append(`stock[${0}][bedding_material_id]`, formData.bedding_material_id);
    }
    if(selectedOption === "Packing"){
      formDataToSend.append(`stock[${0}][packing_box_id]`, formData.packing_box_id);
    }
    formDataToSend.append(`stock[${0}][quantity]`, Number(formData.quantity));
    formDataToSend.append(`stock[${0}][amount]`, Number(formData.amount));


    addPurchase(formDataToSend);

    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Item Management" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Item Name </th>
                        <th>Vendor Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Show loading spinner */}
                      {purchaseList?.loading ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : purchaseList?.data?.length === 0 ? (
                        // Show "No products found" when there's no data
                        <tr>
                          <td colSpan="7" className="text-center">
                            No purchase-to-stock Found
                          </td>
                        </tr>
                      ) : (
                        purchaseList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product?.bedding_material_name  && product?.packing_box_name ? `${product.bedding_material_name}, ${product.packing_box_name}` : product?.bedding_material_name || product?.packing_box_name || 'N/A' }</td>
                            <td>{product?.vendor_name}</td>
                            <td>{product?.quantity}</td>
                            <td>{product?.amount}</td>
                            <td>
                              {product?.date
                                ? new Date(product?.date).toLocaleDateString(
                                    "en-GB"
                                  )
                                : ""}
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        isOpen={open}
        toggle={onCloseModal}
        className="modal-lg" // Increases the width
      >
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Item
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* Scroll in Y-axis */}
          <Form>
            <div className="row mt-3">
              <FormGroup className="col-md-6">
                <Label for="vendor_id">Choose Vendor</Label>
                <Autocomplete
                  options={allvendorList?.data || []}
                  getOptionLabel={(option) => option.name}
                  value={
                    allvendorList.data?.find(
                      (vendor) => vendor.id === formData.vendor_id
                    ) || null
                  } // Show the selected vendor
                  onChange={(event, newValue) => {
                    handleVendorChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Vendor"
                      variant="outlined"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label htmlFor="order_id" className="col-form-label">
                  Order ID :
                </Label>
                <Input
                  type="text"
                  name="order_id"
                  value={formData.order_id}
                  onChange={handleChange}
                  id="order_id"
                />
              </FormGroup>
            </div>

            <div className="row">
              <FormGroup className="col-md-6">
                <Label htmlFor="invoice_number" className="col-form-label">
                  Invoice Number :
                </Label>
                <Input
                  type="text"
                  name="invoice_number"
                  value={formData.invoice_number}
                  onChange={handleChange}
                  id="invoice_number"
                />
              </FormGroup>

              <FormGroup className="col-md-6">
                <Label for="date" className="fw-bold">
                  Invoice Date
                </Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={getFormattedDate(formData.date)}
                  onChange={handleDateChange}
                />
              </FormGroup>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="btn-group w-100" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="itemType"
                    id="beddingRadio"
                    value="Bedding"
                    checked={selectedOption === "Bedding"}
                    onChange={handleRadioChange}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="beddingRadio"
                    style={{ cursor: "pointer" }}
                  >
                    Bedding Materials
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="itemType"
                    id="packingRadio"
                    value="Packing"
                    checked={selectedOption === "Packing"}
                    onChange={handleRadioChange}
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="packingRadio"
                    style={{ cursor: "pointer" }}
                  >
                    Packing Box
                  </label>
                </div>
              </div>
            </div>

            {/* Dropdown */}
            <div className="row">
            <div className="col-md-4">
              <label htmlFor="itemDropdown" className="form-label fw-bold">
                Choose Item
              </label>
              <select
                id="itemDropdown"
                className="form-select shadow-sm"
                name={
                  selectedOption === "Bedding"
                    ? "bedding_material_id"
                    : "packing_box_id"
                }
                value={
                  selectedOption === "Bedding"
                    ? formData.bedding_material_id
                    : formData.packing_box_id
                }
                onChange={handleChange}
                style={{ padding: "10px" }}
              >
                <option value="">Select an item</option>
                {selectedOption === "Bedding" &&
                  allBeddingList.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                {selectedOption === "Packing" &&
                  allPackingList.data?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>

            <FormGroup className="col-md-4">
              <Label htmlFor="quantity" className="col-form-label">
                Quantity :
              </Label>
              <Input
                type="number"
                name="quantity"
                 min={0}
                value={formData.quantity}
                onChange={handleChange}
                id="quantity"
              />
            </FormGroup>

            <FormGroup className="col-md-4">
              <Label htmlFor="amount" className="col-form-label">
                Amount :
              </Label>
              <Input
                type="number"
                name="amount"
                min={0}
                value={formData.amount}
                onChange={handleChange}
                id="amount"
              />
            </FormGroup>
            </div>
           
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              "Add"
            )}
          </Button>
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PurchaseStock;
