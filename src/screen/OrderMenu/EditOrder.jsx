/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useCommonContext } from "../../helper/CommonProvider";
import { useParams } from "react-router-dom";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Badge, Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useCmsContext } from "../../helper/CmsProvider";
import { FaCircleXmark } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import DatePicker from "react-datepicker";
import { useMasterContext } from "../../helper/MasterProvider";
const EditOrder = () => {
  const { id } = useParams();
  const { getOrderDetails, orderDetails } = useCommonContext();
  const {
    getCustomerDetail,
    allCustomer,
    getpackingBox,
    packingbox,
    getAllAnimal,
    allanimal,
    createNewOrder,EditOrder
  } = useCmsContext();

  const { getAllShippingAgency,allShippingAgency} = useMasterContext()

  useEffect(() => {
    if (id) {
      getOrderDetails(id);
      getAllShippingAgency()
    }
  }, [id]);
  console.log(packingbox, "packingbox");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editItem, setEditItem] = useState(false);

  const [orderItems, setOrderItems] = useState([
    {
      breed_id: "",
      quantity: 1,
      unit_price: 0,
      packing_quantity: "",
      total_price: 0,
      packing_box_id: 1,
      packing_box_total_price: 0,
      packing_box_name: "",
      packing_box_price: 0,
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
    transport_mode:"",
    shipping_method:"",
    shipping_charges:"",
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

  useEffect(() => {
    if (orderDetails) {
      setInputData({
        iiac_number: orderDetails.data.iiac_number || "",
        iiac_valid_from: orderDetails.data.iiac_valid_from || "",
        iiac_valid_to: orderDetails.data.iiac_valid_to || "",
        total_amount: orderDetails.data.total_amount || 0,
        status: orderDetails.data.status || "Pending",
        order_date: new Date(orderDetails.data.order_date),
        payment_mode: orderDetails.data.payment_mode || "CASH",
        transport_mode: orderDetails.data.transport_mode || "",
        shipping_method: orderDetails.data.shipping_method || "",
        shipping_charges: orderDetails.data.shipping_charges || "",
        shipping_address: {
          first_name: orderDetails.data.shipping_address?.first_name || "",
          last_name: orderDetails.data.shipping_address?.last_name || "",
          phone_number: orderDetails.data.shipping_address?.phone_number || "",
          email: orderDetails.data.shipping_address?.email || "",
          state: orderDetails.data.shipping_address?.state || "",
          city: orderDetails.data.shipping_address?.city || "",
          postal_code: orderDetails.data.shipping_address?.postal_code || "",
          address_line_1:
            orderDetails.data.shipping_address?.address_line_1 || "",
          address_line_2:
            orderDetails.data.shipping_address?.address_line_2 || "",
        },
        billing_address: {
          first_name: orderDetails.data.billing_address?.first_name || "",
          last_name: orderDetails.data.billing_address?.last_name || "",
          phone_number: orderDetails.data.billing_address?.phone_number || "",
          email: orderDetails.data.billing_address?.email || "",
          state: orderDetails.data.billing_address?.state || "",
          city: orderDetails.data.billing_address?.city || "",
          postal_code: orderDetails.data.billing_address?.postal_code || "",
          address_line_1:
            orderDetails.data.billing_address?.address_line_1 || "",
          address_line_2:
            orderDetails.data.billing_address?.address_line_2 || "",
        },
      });

      if (orderDetails.data.items) {
        setOrderItems(orderDetails.data.items);
      }
    }
  }, [orderDetails]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getAllAnimal();
  }, []);

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

  const handleItemChange = async (index, field, value) => {
    setEditItem(true);
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;

    if (
      field === "breed_id" ||
      field === "quantity" ||
      field === "unit_price"
    ) {
      const animal = allanimal?.data?.find(
        (a) => a.id === parseInt(updatedItems[index].breed_id)
      );
      const quantity = parseInt(updatedItems[index].quantity) || 1;

      // If breed_id changes, update unit_price from the selected animal
      if (field === "breed_id" && animal) {
        const price =
          orderDetails.data?.organization_type === "Government"
            ? animal?.gov_price || 0
            : animal?.non_gov_price || 0;
        updatedItems[index].unit_price = price;
      }

      const unit_price = parseFloat(updatedItems[index].unit_price) || 0;

      // Update total price
      updatedItems[index].total_price = unit_price * quantity;

      // Fetch packing box details only when breed_id or quantity changes
      if (
        (field === "breed_id" || field === "quantity") &&
        animal &&
        quantity > 0
      ) {
        getpackingBox(animal.id, quantity).then((res) => {
          updatedItems[index].packing_quantity = res?.expected_quantity;
          updatedItems[index].packing_box_name = res?.title;
          updatedItems[index].packing_box_price = res?.price;
          updatedItems[index].packing_box_id = res?.id;
          updatedItems[index].packing_box_total_price =
            res?.price * res?.expected_quantity;
          setOrderItems(updatedItems);
        });
      }
    }

      // Calculate Packing Box Total Price when Packing Box Number changes
  if (field === "packing_quantity") {
    const packing_quantity = parseInt(value) || 0;
    const packing_box_price = parseFloat(updatedItems[index].packing_box_price) || 0;
    updatedItems[index].packing_box_total_price = packing_box_price * packing_quantity;
  }

    setOrderItems(updatedItems);
  };

  const addItemRow = () => {
    setOrderItems([
      ...orderItems,
      {
        breed_id: "",
        quantity: 1,
        unit_price: 1,
        packing_quantity: "",
        total_price: 0,
      },
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
      unit_price: parseFloat(item.unit_price),
      total_price: parseFloat(item.total_price),
      packing_box_quantity: parseInt(item.packing_quantity, 10),
      packing_box_id: parseInt(item.packing_box_id, 10),
      packing_box_total_price: parseFloat(item.packing_box_total_price),
    }));

    const final_amount = items.reduce((sum, item) => sum + item.total_price, 0);

    const formData = new FormData();

    if (editItem == true) {
      orderItems.forEach((el, i) => {
        formData.append(`items[${i}][breed_id]`, parseInt(el.breed_id, 10));
        formData.append(`items[${i}][quantity]`, parseInt(el.quantity, 10));
        formData.append(`items[${i}][total_price]`, parseFloat(el.total_price));
        formData.append(
          `items[${i}][packing_quantity]`,
          parseInt(el.packing_quantity, 10)
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
    }

    // formData.append("total_amount", final_amount);
    formData.append("iiac_number", inputData.iiac_number);

    formData.append(
      "iiac_valid_from",
      startDate ? formatDate(startDate) : null
    );
    formData.append("iiac_valid_to", endDate ? formatDate(endDate) : null);
    formData.append("transport_mode", inputData.transport_mode);
    formData.append("shipping_charges", inputData.shipping_charges);
    formData.append("shipping_method", inputData.shipping_method);
    formData.append("order_id", orderDetails.data.id);
    
    // Append nested billing address data
    Object.keys(inputData.billing_address).forEach((key) => {
      formData.append(
        `billing_address[${key}]`,
        inputData.billing_address[key]
      );
    });

    // Append nested shipping address data
    Object.keys(inputData.shipping_address).forEach((key) => {
      formData.append(
        `shipping_address[${key}]`,
        inputData.shipping_address[key]
      );
    });

    // Debugging: Log FormData contents properly
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Send the formData via API
    EditOrder(formData);
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Order" parent="Physical" />
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
          <div>
            <div>
              {orderItems.map((item, index) => (
                <div className="row" key={index}>
                  <FormGroup className="col-md-3">
                    <Label>Choose Animal</Label>
                    <Input
                      type="select"
                      value={item.breed_id}
                      onChange={(e) =>
                        handleItemChange(index, "breed_id", e.target.value)
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
                  <FormGroup className="col-md-3">
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
                  <FormGroup className="col-md-3">
                    <Label>Unit Price</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.unit_price}
                      onChange={(e) =>
                        handleItemChange(index, "unit_price", e.target.value)
                      }
                    />
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Label>Total Price</Label>
                    <Input type="text" value={item.total_price} readOnly />
                  </FormGroup>
                  <FormGroup className="col-md-3">
                    <Label>Packing Box Name</Label>
                    <Input
                      type="text"
                      value={item.packing_box_name}
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </FormGroup>
                  <FormGroup className="col-md-3">
                    <Label>Packing Box Number</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.packing_quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "packing_quantity",
                          e.target.value
                        )
                      }
                    />
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Label>Packing Box Price(unit)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.packing_box_price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "packing_box_price",
                          e.target.value
                        )
                      }
                    />
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Label>Packing Box Total Price</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.packing_box_total_price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "packing_box_total_price",
                          e.target.value
                        )
                      }
                    />
                  </FormGroup>

                  <FormGroup className="col-md-2 d-flex align-items-end">
                    <Button color="danger" onClick={() => removeItemRow(index)}>
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

              <FormGroup className="col-md-4">
                <Label
                  for="title"
                  className="col-form-label font-weight-bold"
                  style={{ color: "#495057" }}
                >
                  Transport Mode
                </Label>
                <Input
                  type="text"
                  name="transport_mode"
                  value={inputData.transport_mode}
                  onChange={handleInputChange}
                  id="transport_mode"
                  placeholder="Enter transport mode"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                />
              </FormGroup>

              <FormGroup className="col-md-4">
              <Label htmlFor="shipping_method" className="col-form-label">
                Shipping Agency:
              </Label>
              <Input
                type="select"
                name="shipping_method"
                value={inputData.shipping_method}
                onChange={handleInputChange}
                id="shipping_method"
              >
                <option value="">Select Shipping Agency</option>
                {allShippingAgency?.data?.map((variety) => (
                  <option key={variety._id} value={variety.id}>
                    {variety.agency_name}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup className="col-md-4">
                <Label
                  for="title"
                  className="col-form-label font-weight-bold"
                  style={{ color: "#495057" }}
                >
                 Shipping Charges
                </Label>
                <Input
                  type="number"
                  name="shipping_charges"
                  value={inputData.shipping_charges}
                  onChange={handleInputChange}
                  id="shipping_charges"
                  placeholder="Enter transport mode"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                />
              </FormGroup>

            </div>

            <div
              className="mt-4 p-3"
              style={{
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h5 className="font-weight-bold text-primary">Billing Address</h5>
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
            <br />
            <Button color="secondary" onClick={handleSubmit}>
              Submit Order
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditOrder;
