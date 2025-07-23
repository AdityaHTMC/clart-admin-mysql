/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useCommonContext } from "../../helper/CommonProvider";
import { useParams } from "react-router-dom";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Badge, Button, Card, CardBody, CardFooter, Col, FormGroup, Input, Label } from "reactstrap";
import { useCmsContext } from "../../helper/CmsProvider";
import { GoTrash } from "react-icons/go";
import { useMasterContext } from "../../helper/MasterProvider";
import { Download, Trash } from "react-feather";
import { toast } from "react-toastify";
import { parse } from "@fortawesome/fontawesome-svg-core";
const EditOrder = () => {
  const { id } = useParams();
  const { getOrderDetails, orderDetails } = useCommonContext();
  const {
    getpackingBox,
    getAllAnimal,
    allanimal,
    EditOrder
  } = useCmsContext();

  const { getAllShippingAgency, allShippingAgency } = useMasterContext()

  useEffect(() => {
    if (id) {
      getOrderDetails(id);
      getAllShippingAgency()
      getAllAnimal()
    }
  }, [id]);

  const [editItem, setEditItem] = useState(false);

  const [orderItems, setOrderItems] = useState([
    {
      id: "",
      breed_id: "",
      quantity: 1,
      unit_price: 0,
      packing_quantity: "",
      total_price: 0,
      packing_box_id: 1,
      packing_box_total_price: 0,
      packing_box_name: "",
      packing_box_price: 0,
      age_from: "",
      age_to: "",
      age_unit: "",
      weight_to: "",
      weight_from: "",
      weight_unit: "",
      packing_box_required: false,
    },
  ]);

  const [inputData, setInputData] = useState({
    total_amount: 0,
    status: "Pending",
    order_date: new Date(),
    payment_mode: "CASH",
    vehicle_required: false,
    transport_mode: "",
    shipping_method: "",
    shipping_charges: "",
    shipping_address: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      country: "",
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
      country: "",
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
        total_amount: orderDetails.data.total_amount || 0,
        status: orderDetails.data.status || "Pending",
        order_date: new Date(orderDetails.data.order_date),
        payment_mode: orderDetails.data.payment_mode || "CASH",
        vehicle_required: orderDetails.data.vehicle_required === 1 ? true : false,
        transport_mode: orderDetails.data.transport_mode || "",
        shipping_method: orderDetails.data.shipping_method || "",
        shipping_charges: orderDetails.data.shipping_charges || "",
        shipping_address: {
          first_name: orderDetails.data.shipping_address?.first_name || "",
          last_name: orderDetails.data.shipping_address?.last_name || "",
          phone_number: orderDetails.data.shipping_address?.phone_number || "",
          email: orderDetails.data.shipping_address?.email || "",
          country: orderDetails.data.shipping_address?.country || "",
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
          country: orderDetails.data.billing_address?.country || "",
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
        const items = orderDetails.data.items.map((item, index) => ({
          ...item,
          [`criteria${index}`]: item.age_unit ? "AGE" : item?.weight_unit ? "WEIGHT" : "",
          [`purpose-${index}`]: item.purpose,
          packing_box_required: !!item?.packing_box_id
        }));
        setOrderItems(items);
      }
    }
  }, [orderDetails]);

  const PackingBoxCheck = (ord_items, item, index) => {
    const updatedItems = [...ord_items]
    if (item && item?.packing_box_required && item?.breed_id && item?.quantity) {
      getpackingBox(item?.breed_id, item?.quantity).then((res) => {
        updatedItems[index].packing_quantity = res?.expected_quantity;
        updatedItems[index].packing_box_name = res?.title;
        updatedItems[index].packing_box_price = res?.price;
        updatedItems[index].packing_box_id = res?.id;
        // updatedItems[index].packing_box_required = !!res?.id;
        updatedItems[index].packing_box_total_price =
          res?.price * res?.expected_quantity;
        if (!res?.id) {
          toast.info("No packing box found for this animal")
        }
      });
    } else {
      updatedItems[index].packing_quantity = 0;
      updatedItems[index].packing_box_name = '';
      updatedItems[index].packing_box_required = false;
      updatedItems[index].packing_box_price = 0;
      updatedItems[index].packing_box_id = null;
      updatedItems[index].packing_box_total_price = 0;
    }
    setOrderItems(updatedItems);
  }

  const onCriteriaChange = (criteria, index) => {
    const updatedItems = [...orderItems]
    updatedItems[index][`criteria${index}`] = criteria;
    setOrderItems(updatedItems);
  }

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
      field === "unit_price" ||
      field === "packing_box_required"
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
      console.log(field)
      if (
        (field === "breed_id" || field === "packing_box_required" || field === "quantity") &&
        animal &&
        quantity > 0
      ) {
        const itme = { packing_box_required: updatedItems[index]?.packing_box_required || false, quantity, breed_id: animal.id }
        PackingBoxCheck(updatedItems, itme, index)
      }
    }

    // Calculate Packing Box Total Price when Packing Box Number changes
    if (field === "packing_quantity" || field === "packing_box_price") {
      const packing_quantity = updatedItems[index].packing_quantity || 0;
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

  const validateOrder = () => {
    let isCheck = true
    for (let i = 0; i < orderItems.length; i++) {
      const item = orderItems[i];

      if (!item.breed_id || !item.quantity || !item.unit_price) {
        toast.info("Breed id, quanity or unit price is required")
        isCheck = false;
        break;
      }

      if (item?.packing_box_id && (!item.packing_quantity || !item.packing_box_price)) {
        isCheck = false;
        toast.info("Packing box quanity and price required")
        break;
      }

      if (item[`criteria${i}`] === "AGE") {
        if ((!item?.age_from && item.age_from != "0") || !item.age_to || !item.age_unit) {
          isCheck = false;
          toast.info("Age from to and its unit required")
          break;
        }
      } else {
        if ((!item?.weight_from && item.weight_from != "0") || !item.weight_to || !item.weight_unit) {
          isCheck = false;
          toast.info("weight from to and its unit required")
          break;
        }
      }
      const male_count = item?.male_ratio ? parseInt(item?.male_ratio) : 0
      const female_count = item?.female_ratio ? parseInt(item?.female_ratio) : 0
      const total_cont = male_count + female_count
      if (item?.sex === "BOTH" && total_cont !== parseInt(item?.quantity)) {
        isCheck = false;
        toast.info("quantity is not matched with male female ratio")
        break;
      }

      if (!item[`purpose-${i}`]) {
        toast.info("Purpose required for each item");
        isCheck = false;
        break;
      }

      if (!item?.ieac_file) {
        toast.info("IEAC file required for each item");
        isCheck = false;
        break;
      }
    }

    return isCheck
  }

  const handleSubmit = () => {

    const isValid = validateOrder()
    if (!isValid) return

    const formData = new FormData();

    orderItems.forEach((el, i) => {
      if (el.id) {
        formData.append(`items[${i}][item_id]`, parseInt(el.id, 10));
      }
      formData.append(`items[${i}][breed_id]`, parseInt(el.breed_id, 10));
      formData.append(`items[${i}][quantity]`, parseInt(el.quantity, 10));
      formData.append(`items[${i}][total_price]`, parseFloat(el.total_price));
      formData.append(`items[${i}][packing_box_quantity]`, parseInt(el.packing_quantity, 10));
      formData.append(`items[${i}][packing_box_id]`, parseInt(el.packing_box_id, 10));
      formData.append(`items[${i}][packing_box_total_price]`, parseFloat(el.packing_box_total_price));

      if (el[`criteria${i}`] === 'WEIGHT') {
        formData.append(`items[${i}][weight_from]`, el.weight_from);
        formData.append(`items[${i}][weight_to]`, el.weight_to);
        formData.append(`items[${i}][weight_unit]`, el.weight_unit);
      }
      if (el[`criteria${i}`] === 'AGE') {
        formData.append(`items[${i}][age_from]`, el.age_from);
        formData.append(`items[${i}][age_to]`, el.age_to);
        formData.append(`items[${i}][age_unit]`, el.age_unit);
      }
      formData.append(`items[${i}][sex]`, el?.sex);
      formData.append(`items[${i}][male_ratio]`, el?.sex === "MALE" ? el.quantity : el?.male_ratio);
      formData.append(`items[${i}][female_ratio]`, el?.sex === "FEMALE" ? el.quantity : el?.female_ratio);

      formData.append(`items[${i}][purpose]`, el?.purpose);
      formData.append(`items[${i}][expected_date]`, el?.expected_date);
      formData.append(`items[${i}][delivery_schedule]`, el?.delivery_schedule);
      if (typeof el.ieac_file === 'string') {
        formData.append(`items[${i}][ieac_file]`, el?.ieac_file);
      } else {
        formData.append(`items[${i}][ieac_file__${i}]`, el?.ieac_file[0]);
      }
    });


    formData.append("transport_mode", inputData.transport_mode);
    formData.append("shipping_charges", inputData.shipping_charges);
    formData.append("shipping_method", inputData.shipping_method);
    formData.append("vehicle_required", inputData.vehicle_required === true ? 1 : 0);
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
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

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
                    <Input type="text" value={item.total_price} readOnly disabled />
                  </FormGroup>

                  <FormGroup check className="col-md-12 mb-2 mx-2">
                    <Input
                      id="checkbox2"
                      type="checkbox"
                      checked={item?.packing_box_required || false}
                      onChange={(e) => handleItemChange(index, 'packing_box_required', e.target.checked)}
                    />
                    {' '}
                    <Label check>
                      Add Packing Box
                    </Label>
                  </FormGroup>

                  {item?.packing_box_required && item?.packing_box_id && (
                    <>
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
                          disabled
                        />
                      </FormGroup>
                    </>
                  )}

                  <FormGroup
                    row
                    tag="fieldset"
                    className="col-md-12"
                  >
                    <Col sm={10} className="d-flex gap-3">
                      <FormGroup check>
                        <Input
                          name={`criteria-age-${index}`}
                          type="radio"
                          checked={item[`criteria${index}`] === "AGE"}
                          onChange={() => onCriteriaChange("AGE", index)}
                        />
                        {' '}
                        <Label check>
                          By Age
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input
                          name={`criteria-weight-${index}`}
                          type="radio"
                          checked={item[`criteria${index}`] === "WEIGHT"}
                          onChange={() => onCriteriaChange("WEIGHT", index)}
                        />
                        {' '}
                        <Label check>
                          By Weight
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>

                  {item[`criteria${index}`] === "AGE" && (
                    <>
                      <FormGroup className="col-md-4">
                        <Label>Age From</Label>
                        <Input
                          type="number"
                          min="0"
                          value={item.age_from}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "age_from",
                              e.target.value
                            )
                          }
                        />
                      </FormGroup>

                      <FormGroup className="col-md-4">
                        <Label>Age To</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.age_to}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "age_to",
                              e.target.value
                            )
                          }
                        />
                      </FormGroup>

                      <FormGroup className="col-md-4">
                        <Label for="age_unit">Age Unit</Label>
                        <Input type="select" name="age_unit" id="age_unit" value={item.age_unit} onChange={(e) =>
                          handleItemChange(
                            index,
                            "age_unit",
                            e.target.value
                          )
                        } required>
                          <option value="">Select</option>
                          <option value="DAY">Days</option>
                          <option value="MONTH">Months</option>
                          <option value="YEAR">Years</option>
                        </Input>
                      </FormGroup>
                    </>
                  )}

                  {item[`criteria${index}`] === "WEIGHT" && (
                    <>
                      <FormGroup className="col-md-4">
                        <Label>Weight From</Label>
                        <Input
                          type="number"
                          min="0"
                          value={item.weight_from}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "weight_from",
                              e.target.value
                            )
                          }
                        />
                      </FormGroup>

                      <FormGroup className="col-md-4">
                        <Label>Weight To</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.weight_to}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "weight_to",
                              e.target.value
                            )
                          }
                        />
                      </FormGroup>

                      <FormGroup className="col-md-4">
                        <Label for="weight_unit">Weight Unit</Label>
                        <Input type="select" name="weight_unit" id="weight_unit" value={item.weight_unit} onChange={(e) =>
                          handleItemChange(
                            index,
                            "weight_unit",
                            e.target.value
                          )
                        } required>
                          <option value="">Select</option>
                          <option value="KG">Kilograms</option>
                          <option value="G">Grams</option>
                        </Input>
                      </FormGroup>
                    </>
                  )}

                  <Col md={4}>
                    <FormGroup>
                      <Label for="sex">Sex Required</Label>
                      <Input type="select" name="sex" id="sex" value={item.sex} onChange={(e) =>
                        handleItemChange(
                          index,
                          "sex",
                          e.target.value
                        )
                      } required>
                        <option value="">Select</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="BOTH">Both</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  {item.sex === 'BOTH' ? (
                    <>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="male_ratio">Male Ratio</Label>
                          <Input type="number" name="male_ratio" id="male_ratio" value={item.male_ratio} onChange={(e) =>
                            handleItemChange(
                              index,
                              "male_ratio",
                              e.target.value
                            )} min={0} />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="female_ratio">Female Ratio</Label>
                          <Input type="number" name="female_ratio" id="female_ratio" value={item.female_ratio} onChange={(e) =>
                            handleItemChange(
                              index,
                              "female_ratio",
                              e.target.value
                            )} min={0} />
                        </FormGroup>
                      </Col>
                    </>
                  ) : <div className="col-md-8"></div>}

                  <FormGroup
                    row
                    tag="fieldset"
                    className="col-md-3"
                  >
                    <div>
                      <Label>Purpose</Label>
                      <Col sm={10} className="d-flex" style={{ flexDirection: 'column' }}>
                        <FormGroup check>
                          <Input
                            name={`purpose-${index}`}
                            type="radio"
                            checked={item[`purpose-${index}`] === "BREEDING"}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                `purpose-${index}`,
                                "BREEDING"
                              )}
                          />
                          {' '}
                          <Label check>
                            Breeding
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input
                            name={`purpose-${index}`}
                            type="radio"
                            checked={item[`purpose-${index}`] === "EXPERIMENTAL"}
                            onChange={() =>
                              handleItemChange(
                                index,
                                `purpose-${index}`,
                                "EXPERIMENTAL"
                              )}
                          />
                          {' '}
                          <Label check>
                            Experimental
                          </Label>
                        </FormGroup>
                      </Col>
                    </div>
                  </FormGroup>


                  <FormGroup className="col-md-3">
                    <Label>Expected Date</Label>
                    <Input
                      type="date"
                      value={item.expected_date ? item.expected_date?.split("T")[0] : ""}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "expected_date",
                          e.target.value
                        )
                      }
                    />
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Label>Schedule delivary</Label>
                    <Input
                      type="text"
                      value={item.delivery_schedule}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "delivery_schedule",
                          e.target.value
                        )
                      }
                    />
                  </FormGroup>

                  {item?.ieac_file && typeof item.ieac_file === "string" && (
                    <div className="col-md-3">
                      <Card className="mb-0">
                        <CardBody className="p-2 mb-0">
                          {item?.ieac_file?.split('/')?.pop()}
                        </CardBody>
                        <CardFooter className="d-flex gap-2 p-2">
                          <a href={item.ieac_file} target="_blank" className="badge btn-sm badge-primary" download style={{ color: "#fff" }}>
                            <Download size={16} />
                          </a>
                          <Badge size="sm" color="danger" style={{ cursor: "pointer" }} onClick={(e) =>
                            handleItemChange(
                              index,
                              "ieac_file",
                              ''
                            )
                          }>
                            <Trash size={16} />
                          </Badge>
                        </CardFooter>
                      </Card>
                    </div>
                  )}
                  {(!item?.ieac_file || typeof item?.ieac_file === "object") && (
                    <FormGroup className="col-md-3">
                      <Label>Ieac File</Label>
                      <Input
                        type="file"
                        // value={item.ieac_file}
                        accept=".pdf"
                        onChange={(e) => handleItemChange(index, 'ieac_file', Array.from(e.target.files))}
                      />
                    </FormGroup>
                  )}

                  <FormGroup className="col-md-12 d-flex align-items-end">
                    <Badge color="danger" onClick={() => removeItemRow(index)} style={{ cursor: 'pointer' }}>
                      <GoTrash style={{ fontSize: 15, color: "#fff" }} />
                    </Badge>
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
                  Transport Mode
                </Label>
                <Input
                  type="text"
                  name="transport_mode"
                  value={inputData.transport_mode}
                  onChange={handleInputChange}
                  id="transport_mode"
                  placeholder="Enter transport mode"
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
                />
              </FormGroup>

              <FormGroup className="col-md-4">
                <div className="d-flex gap-2">
                  <Input
                    id="exampleCheckbox"
                    name="vehicle_required"
                    type="checkbox"
                    checked={inputData.vehicle_required}
                    onChange={handleInputChange}
                  />
                  <Label
                    check
                    for="exampleCheckbox"
                  >
                    Vehicle Required
                  </Label>
                </div>
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
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="country"
                    value={inputData.billing_address.country}
                    data-section="billing_address"
                    onChange={handleInputChange}
                    placeholder="Enter country"
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
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="country"
                    value={inputData.shipping_address.country}
                    data-section="shipping_address"
                    onChange={handleInputChange}
                    placeholder="Enter Country"
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
