/* eslint-disable react/no-unknown-property */
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
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { Autocomplete, Pagination, Stack, TextField } from "@mui/material";
import { useSettingContext } from "../../helper/SettingProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
const StockReport = () => {
  const navigate = useNavigate();
  const {
    allBeddingList,
    getBeddingAlllist,
    getColonyAlllist,
    allColonyList,
    getStockHistoryList,
    stockHistoryList,addStockIssue
  } = useSettingContext();

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const itemperPage = 12;

  const totalPages =
    stockHistoryList?.total && Math.ceil(stockHistoryList?.total / itemperPage);

  useEffect(() => {
    getBeddingAlllist();
    getColonyAlllist();
  }, []);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getStockHistoryList(dataToSend);
  }, [currentPage]);

  const [selectedOption, setSelectedOption] = useState(""); // For storing which radio is selected

  // Handle radio button change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Set the selected radio button option
  };

  const [formData, setFormData] = useState({
    issued_to_colony_id: "",
    stock: [
      {
        item_id: "",
        quantity: "",
        stock: "",
        amount: "",
      },
    ],
  });

  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    // Validate the form whenever formData or selectedOption changes
    const validateForm = () => {
      return formData.stock.every(
        (item) =>
          item.item_id &&
          item.quantity &&
          item.amount &&
          !isNaN(item.quantity) &&
          !isNaN(item.amount)
      );
    };

    setIsFormValid(validateForm());
  }, [formData, selectedOption]);

  const onCloseModal = () => {
    setOpen(false);
    setFormData({
      issued_to_colony_id: "",
      stock: [
        {
          item_id: "",
          quantity: "",
          stock: "",
          amount: "",
        },
      ],
    });
  };

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStock = [...formData.stock];

    if (name === "item_id") {
      const selectedItem = allBeddingList?.data.find(
        (item) => item.id === value
      );
      if (selectedItem) {
        // Only update item_id and stock when item is selected
        updatedStock[index] = {
          ...updatedStock[index],
          [name]: value,
          stock: selectedItem.stock || "0", // Set stock from selected item
        };
      }
    } else {
      // Handle changes for quantity and amount
      updatedStock[index][name] = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      stock: updatedStock,
    }));
  };

  const handleColonyChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      issued_to_colony_id: newValue?.id || "", // Update with selected colony's id, or empty if null
    }));
  };

  // Add new row for stock
  const addStockRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      stock: [
        ...prevData.stock,
        { item_id: "", quantity: "", stock: "", amount: "" },
      ],
    }));
  };

  // Remove row for stock
  const removeStockRow = (index) => {
    const updatedStock = formData.stock.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      stock: updatedStock,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append("issued_to_colony_id", formData.issued_to_colony_id);
    // Append each stock item to FormData
    formData.stock.forEach((item, index) => {
      formDataToSend.append(`stock[${index}][bedding_material_id]`, item.item_id);
      formDataToSend.append(`stock[${index}][quantity]`, item.quantity);
      formDataToSend.append(`stock[${index}][amount]`, item.amount);
    });

    setIsLoading(true);

    try {
      await addStockIssue(formDataToSend);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
    onCloseModal();
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Stock Report" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Stock issue
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
                        <th>Issued To</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Show loading spinner */}
                      {stockHistoryList?.loading ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : stockHistoryList?.data?.length === 0 ? (
                        // Show "No products found" when there's no data
                        <tr>
                          <td colSpan="7" className="text-center">
                            No Stock Report Found
                          </td>
                        </tr>
                      ) : (
                        stockHistoryList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td id={`bedding_material_name-${index}`}>
                              {product?.bedding_material_name
                                ? product.bedding_material_name.length > 15
                                  ? `${product.bedding_material_name.slice(
                                      0,
                                      15
                                    )}...`
                                  : product.bedding_material_name
                                : "NA"}
                              {product?.bedding_material_name && (
                                <UncontrolledTooltip
                                  placement="top"
                                  target={`bedding_material_name-${index}`}
                                >
                                  {product?.bedding_material_name}
                                </UncontrolledTooltip>
                              )}
                            </td>

                            <td>{product?.vendor_name || "NA"}</td>
                            <td>{product?.issued_quantity || 0}</td>
                          
                            <td>{product?.amount}</td>
                            <td>{product?.issued_to_colony}</td>
                            <td>
                              {product?.date
                                ? new Date(product.date).toLocaleDateString(
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

      <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Add Stock Issue
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="col-md-6">
              <Label for="issued_to_colony_id">Choose Colony</Label>
              <Autocomplete
                options={allColonyList?.data || []}
                getOptionLabel={(option) =>
                  `${option.rack_title} (${option.rack_ref})`
                } // Display rack_title with rack_ref
                value={
                  allColonyList.data?.find(
                    (data) => data.id === formData.issued_to_colony_id
                  ) || null
                } // Bind selected colony to the formData state
                onChange={(event, newValue) => {
                  handleColonyChange(newValue); // Update formData when a colony is selected
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Colony"
                    variant="outlined"
                  />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </FormGroup>

            {formData.stock.map((item, index) => (
              <div className="row" key={index}>
                <FormGroup className="col-md-3">
                  <Label htmlFor={`item_id_${index}`}>Item</Label>
                  <Autocomplete
                    options={allBeddingList?.data || []}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => {
                      handleInputChange(
                        {
                          target: {
                            name: "item_id",
                            value: newValue?.id || "",
                          },
                        },
                        index
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Choose Item"
                        variant="outlined"
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </FormGroup>

                <FormGroup className="col-md-2">
                  <Label htmlFor={`amount_${index}`}>Stock Quantity</Label>
                  <Input
                    type="text"
                    name="stock"
                    value={item.stock}
                    id={`stock_${index}`}
                    disabled
                  />
                </FormGroup>

                <FormGroup className="col-md-2">
                  <Label htmlFor={`amount_${index}`}>Quantity</Label>
                  <Input
                    type="number"
                    name="quantity"
                    min={0}
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index)}
                    id={`quantity_${index}`}
                  />
                </FormGroup>
                <FormGroup className="col-md-2">
                  <Label htmlFor={`amount_${index}`}>Amount</Label>
                  <Input
                    type="number"
                    name="amount"
                    min={0}
                    value={item.amount}
                    onChange={(e) => handleInputChange(e, index)}
                    id={`amount_${index}`}
                  />
                </FormGroup>

                <FormGroup className="col-md-2 d-flex align-items-center">
                  {formData.stock.length > 1 && (
                    <Button
                      color="primary"
                      onClick={() => removeStockRow(index)}
                      style={{ padding: "4px 5px", lineHeight: "10px" }}
                    >
                      <IoCloseSharp className="fs-3" />
                    </Button>
                  )}
                </FormGroup>
              </div>
            ))}

            <div align="right">
              <Button
                color="secondary"
                onClick={addStockRow}
                style={{
                  padding: "5px 12px",
                  fontSize: "14px",
                  lineHeight: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <AiOutlinePlus className="fa-2x" />
                &nbsp;<span>Add More</span>
              </Button>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            disabled={!isFormValid || isLoading} // Disable if form is invalid or loading
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" /> Submitting...
              </>
            ) : (
              "Save"
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

export default StockReport;
