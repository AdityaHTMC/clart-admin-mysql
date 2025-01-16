/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCmsContext } from "../../helper/CmsProvider";
import { Link } from "react-router-dom";
import { Badge, FormGroup, Input, Label, Spinner } from "reactstrap";
import { FaCircleXmark } from "react-icons/fa6";

const AddOrder = () => {
  const {
    getCustomerDetail,
    allCustomer,
    getpackingBox,
    packingbox,
    getAllAnimal,
    allanimal,
  } = useCmsContext();
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showPackingBox, setShowPackingBox] = useState(false);
  const [packingBoxNumber, setPackingBoxNumber] = useState("");

  useEffect(() => {
    getAllAnimal();
  }, []);

  useEffect(() => {
    if (showPackingBox && selectedAnimal && quantity > 0) {
      getpackingBox(selectedAnimal, quantity)
    }
  }, [selectedAnimal, quantity, showPackingBox]);

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
  };

  const handleCheckboxChange = (e) => {
    setShowPackingBox(e.target.checked);
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

          {selectedCustomer && selectedCustomer?.id && (
            <div>
              <FormGroup>
                <Label for="animalSelect">Choose Animal</Label>
                <Input
                  type="select"
                  id="animalSelect"
                  value={selectedAnimal}
                  onChange={handleAnimalChange}
                  style={{ padding: "10px", borderRadius: "5px" }}
                >
                  <option value="">Select Animal</option>
                  {allanimal?.data?.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="quantityInput">Quantity</Label>
                <Input
                  type="number"
                  id="quantityInput"
                  value={quantity}
                  min="1"
                  onChange={handleQuantityChange}
                  style={{ padding: "10px", borderRadius: "5px" }}
                />
              </FormGroup>
              <FormGroup check style={{ marginBottom: '15px' }}>
              <Label check>
                <Input
                  type="checkbox"
                  checked={showPackingBox}
                  onChange={handleCheckboxChange}
                />{' '}
                Add Packing Box
              </Label>
            </FormGroup>
            {showPackingBox && (
              <FormGroup>
                <Label for="packingBoxInput">Packing Box Number</Label>
                <Input
                  type="text"
                  id="packingBoxInput"
                  value={packingBoxNumber}
                  readOnly
                  style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px' }}
                />
              </FormGroup>
            )}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddOrder;
