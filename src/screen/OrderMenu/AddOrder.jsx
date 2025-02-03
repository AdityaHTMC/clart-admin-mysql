/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCmsContext } from "../../helper/CmsProvider";
import { Link } from "react-router-dom";
import { Badge, Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import { FaCircleXmark } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import DatePicker from "react-datepicker";
const AddOrder = () => {
  const {
    getCustomerDetail,
    allCustomer,
    getpackingBox,
    packingbox,
    getAllAnimal,
    allanimal,
    createNewOrder,
    getAddressList,
    allAddress,
  } = useCmsContext();
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderItems, setOrderItems] = useState([
    {
      animalId: "",
      quantity: 1,
      packingBoxNumber: "",
      totalPrice: 0,
      packing_box_id: 1,
      packing_box_total_price: 0,
    },
  ]);

  const [inputData, setInputData] = useState({
    iiac_number: "",
    iiac_valid_from: "",
    iiac_valid_to: "",
    total_amount: 0,
    status: "Pending",
    order_date: new Date(),
    payment_mode: "CASH",
    shipping_address: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      state: "",
      city: "",
      postal_code: "",
      address_line_1: "",
      address_line_2: "",
    },
    billing_address: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      state: "",
      city: "",
      postal_code: "",
      address_line_1: "",
      address_line_2: "",
    },
  });

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getAllAnimal();
    if (selectedCustomer?.id) {
      getAddressList(selectedCustomer?.id);
    }
  }, [selectedCustomer]);

  const handleInputChange = (e) => {
    const { name, value, dataset, type, checked } = e.target;
  
    if (dataset.section) {
      const section = dataset.section; 
      setInputData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setInputData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };


  // useEffect(() => {
  //   if (showPackingBox && selectedAnimal && quantity > 0) {
  //     getpackingBox(selectedAnimal, quantity);
  //   }
  // }, [selectedAnimal, quantity, showPackingBox]);

  const handleItemChange = async (index, field, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;

    if (field === "animalId" || field === "quantity") {
      const animal = allanimal?.data?.find(
        (a) => a.id === parseInt(updatedItems[index].animalId)
      );
      const quantity = parseInt(updatedItems[index].quantity) || 1;

      const price =
        selectedCustomer?.organization_type === "Government"
          ? animal?.gov_price || 0
          : animal?.non_gov_price || 0;
      updatedItems[index].totalPrice = price * quantity;

      if (animal && quantity > 0) {
        getpackingBox(animal.id, quantity).then((res) => {
          updatedItems[index].packingBoxNumber = res?.expected_quantity;
          updatedItems[index].packing_box_id = res?.id;
          updatedItems[index].packing_box_total_price =
            res?.price * res?.expected_quantity;
          setOrderItems(updatedItems);
        });
      }
    }

    setOrderItems(updatedItems);
  };

  const addItemRow = () => {
    setOrderItems([
      ...orderItems,
      { animalId: "", quantity: 1, packingBoxNumber: "", totalPrice: 0 },
    ]);
  };

  const removeItemRow = (index) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
  };

  const handleSubmit = () => {
    const items = orderItems.map((item) => ({
      breed_id: parseInt(item.animalId, 10),
      quantity: parseInt(item.quantity, 10),
      total_price: parseFloat(item.totalPrice),
      packing_box_quantity: parseInt(item.packingBoxNumber, 10),
      packing_box_id: parseInt(item.packing_box_id, 10),
      packing_box_total_price: parseFloat(item.packing_box_total_price),
    }));

    const final_amount = items.reduce((sum, item) => sum + item.total_price, 0);

    const formData = new FormData();
    orderItems.forEach((el, i) => {
      formData.append(`items[${i}][breed_id]`, parseInt(el.animalId, 10));
      formData.append(`items[${i}][quantity]`, parseInt(el.quantity, 10));
      formData.append(`items[${i}][total_price]`, parseFloat(el.totalPrice));
      formData.append(
        `items[${i}][packing_quantity]`,
        parseInt(el.packingBoxNumber, 10)
      );
      formData.append(
        `items[${i}][packing_box_id]`,
        parseInt(el.packing_box_id, 10)
      );
      formData.append(
        `items[${i}][packing_box_total_price]`,
        parseFloat(el.packing_box_total_price)
      );
    });

    formData.append("customer_id", selectedCustomer?.id || "");
    formData.append("total_amount", final_amount);
    formData.append("iiac_number", inputData.iiac_number);
    formData.append("iiac_valid_from", startDate ? formatDate(startDate) : null);
    formData.append("iiac_valid_to", endDate ? formatDate(endDate) : null);
  
    // Append nested billing address data
    Object.keys(inputData.billing_address).forEach((key) => {
      formData.append(`billing_address[${key}]`, inputData.billing_address[key]);
    });
  
    // Append nested shipping address data
    Object.keys(inputData.shipping_address).forEach((key) => {
      formData.append(`shipping_address[${key}]`, inputData.shipping_address[key]);
    });

    // Debugging: Log FormData contents properly
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Send the formData via API
    createNewOrder(formData);
  };

  useEffect(() => {
    if (search && search.length > 2) {
      const timeout = setTimeout(() => {
        getCustomerDetail({ keyword_search: search });
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [search]);

  const resetForm = () => {
    setSelectedCustomer(null);
  };

  return (
    <>
      <CommonBreadcrumb title="Create Order" parent="Physical" />
      <div className="product-form-container" style={{ padding: "2px" }}>
        <form
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          {selectedCustomer && selectedCustomer.id ? (
            <>
              <Label style={{ fontWeight: 600 }}>Selected Customer</Label>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img
                    className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
                    src={selectedCustomer?.image}
                    alt="header-user"
                  />
                  <div>
                    <h5 className="mb-0">
                      {selectedCustomer.first_name || selectedCustomer.name}
                    </h5>
                    <p>{selectedCustomer.mobile}</p>
                  </div>
                </div>
                <div>
                  <Badge
                    color="primary"
                    style={{ cursor: "pointer" }}
                    onClick={resetForm}
                  >
                    <FaCircleXmark style={{ fontSize: 18 }} />
                  </Badge>
                </div>
              </div>
            </>
          ) : (
            <div className="position-relative">
              <form className="searchBx">
                <Label style={{ fontWeight: 600 }}>
                  Search & Select Customer
                </Label>
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type="text"
                  name="search1"
                  placeholder="Search customer by mobile number or name"
                />
                {/* <button>Search</button> */}
              </form>
              {search.length > 2 && (
                <div className="dropdown p-absolute bottom-0 w-100 z-2">
                  <ul
                    className="dropdown-menu show"
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      width: "100%",
                    }}
                  >
                    {allCustomer.loading && (
                      <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                      </div>
                    )}
                    {!allCustomer.loading &&
                      allCustomer?.data?.map((customer, index) => (
                        <li
                          key={index}
                          className="dropdown-item"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          {customer?.first_name || customer?.name}
                        </li>
                      ))}

                    {!allCustomer.loading &&
                      allCustomer?.data?.length === 0 && (
                        // <li key="no-customer" className="dropdown-item">
                        <div
                          className="d-grid gap-2"
                          style={{ placeItems: "center" }}
                        >
                          <p>No Customer found</p>
                          <Link
                            className=""
                            style={{
                              textDecoration: "underline",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            to="/add-customer"
                          >
                            Create New Customer
                          </Link>
                        </div>
                        // </li>
                      )}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div>
            {selectedCustomer && (
              <div>
                {orderItems.map((item, index) => (
                  <div className="row" key={index}>
                    <FormGroup className="col-md-3">
                      <Label>Choose Animal</Label>
                      <Input
                        type="select"
                        value={item.animalId}
                        onChange={(e) =>
                          handleItemChange(index, "animalId", e.target.value)
                        }
                      >
                        <option value="">Select Animal</option>
                        {allanimal?.data?.map((animal) => (
                          <option key={animal.id} value={animal.id}>
                            {animal.title}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup className="col-md-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                      />
                    </FormGroup>
                    <FormGroup className="col-md-2">
                      <Label>Packing Box Number</Label>
                      <Input
                        type="text"
                        value={item.packingBoxNumber}
                        style={{ backgroundColor: "#f8f9fa" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-2">
                      <Label>Total Price</Label>
                      <Input type="text" value={item.totalPrice} readOnly />
                    </FormGroup>
                    <FormGroup className="col-md-2 d-flex align-items-end">
                      <Button
                        color="danger"
                        onClick={() => removeItemRow(index)}
                      >
                        <GoTrash style={{ fontSize: 15, color: "#000" }} />
                      </Button>
                    </FormGroup>
                  </div>
                ))}
                <Button color="primary" onClick={addItemRow}>
                  + Add Animal
                </Button>{" "}
                <br /> <br />
              </div>
            )}

            {selectedCustomer && (
              <>
                <div className="row">
                  <FormGroup className="col-md-4">
                    <Label
                      for="title"
                      className="col-form-label font-weight-bold"
                      style={{ color: "#495057" }}
                    >
                      IIAC Number <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="iiac_number"
                      value={inputData.iiac_number}
                      onChange={handleInputChange}
                      id="iiac_number"
                      placeholder="Enter IIAC Number"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    />
                  </FormGroup>
                  <div className="col-md-4">
                    <Label
                      for="iiac_valid_from"
                      className="col-form-label font-weight-bold"
                    >
                      IIAC Valid From Date
                    </Label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Select Start Date"
                      className="form-control"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <Label
                      for="iiac_valid_to"
                      className="col-form-label font-weight-bold"
                    >
                      IIAC Valid To Date
                    </Label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      placeholderText="Select End Date"
                      className="form-control"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="mt-4 p-3"
                  style={{
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h5 className="font-weight-bold text-primary">
                    Billing Address
                  </h5>
                  <div className="row">
                    <FormGroup className="col-md-6">
                      <Label>First Name</Label>
                      <Input
                        type="text"
                        name="first_name"
                        value={inputData.billing_address.first_name}
                        onChange={handleInputChange}
                        data-section="billing_address"
                        placeholder="Enter First Name"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Last Name</Label>
                      <Input
                        type="text"
                        name="last_name"
                        value={inputData.billing_address.last_name}
                        data-section="billing_address"
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Phone Number</Label>
                      <Input
                        type="number"
                        name="phone_number"
                        value={inputData.billing_address.phone_number}
                        onChange={handleInputChange}
                        min={0}
                        data-section="billing_address"
                        placeholder="Enter Phone Number"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={inputData.billing_address.email}
                        data-section="billing_address"
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label>State</Label>
                      <Input
                        type="text"
                        name="state"
                        value={inputData.billing_address.state}
                        data-section="billing_address"
                        onChange={handleInputChange}
                        placeholder="Enter State"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label>City</Label>
                      <Input
                        type="text"
                        name="city"
                        value={inputData.billing_address.city}
                        data-section="billing_address"
                        onChange={handleInputChange}
                        placeholder="Enter City"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label>Postal Code</Label>
                      <Input
                        type="number"
                        name="postal_code"
                        value={inputData.billing_address.postal_code}
                        data-section="billing_address"
                        onChange={handleInputChange}
                        placeholder="Enter Postal Code"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-12">
                      <Label>Address Line 1</Label>
                      <Input
                        type="text"
                        name="address_line_1"
                        value={inputData.billing_address.address_line_1}
                        data-section="billing_address"
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 1"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-12">
                      <Label>Address Line 2</Label>
                      <Input
                        type="text"
                        name="address_line_2"
                        value={inputData.billing_address.address_line_2}
                        data-section="billing_address"
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 2"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                  </div>

                  <h5 className="font-weight-bold text-primary mt-4">
                    Shipping Address
                  </h5>
                  <div className="row">
                    {/* Copy the same structure as Billing Address for Shipping Address */}
                    <FormGroup className="col-md-6">
                      <Label>First Name</Label>
                      <Input
                        type="text"
                        name="first_name"
                        value={inputData.shipping_address.first_name}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter First Name"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Last Name</Label>
                      <Input
                        type="text"
                        name="last_name"
                        value={inputData.shipping_address.last_name}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter Last Name"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Phone Number</Label>
                      <Input
                        type="text"
                        name="phone_number"
                        value={inputData.shipping_address.phone_number}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter Phone Number"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-6">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={inputData.shipping_address.email}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label>State</Label>
                      <Input
                        type="text"
                        name="state"
                        value={inputData.shipping_address.state}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter State"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label>City</Label>
                      <Input
                        type="text"
                        name="city"
                        value={inputData.shipping_address.city}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter City"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-4">
                      <Label>Postal Code</Label>
                      <Input
                        type="text"
                        name="postal_code"
                        value={inputData.shipping_address.postal_code}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter Postal Code"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-12">
                      <Label>Address Line 1</Label>
                      <Input
                        type="text"
                        name="address_line_1"
                        value={inputData.shipping_address.address_line_1}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 1"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                    <FormGroup className="col-md-12">
                      <Label>Address Line 2</Label>
                      <Input
                        type="text"
                        name="address_line_2"
                        value={inputData.shipping_address.address_line_2}
                        data-section="shipping_address"
                        onChange={handleInputChange}
                        placeholder="Enter Address Line 2"
                        style={{ borderRadius: "5px" }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <br/>
                <Button color="secondary" onClick={handleSubmit}>
                  Submit Order
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddOrder;
