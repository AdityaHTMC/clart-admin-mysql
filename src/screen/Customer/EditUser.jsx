/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, FormText, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";
import { useCommonContext } from "../../helper/CommonProvider";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    getallstateList,
    getallDistrictList,
    allstateList,
    alldistrictList,
    getCustomerDetails,
    customerDetails,
    getorgList,
    orgList,editCustomer
  } = useCommonContext();

  const [error, setError] = useState("");

  useEffect(() => {
    getallstateList();
    getorgList();
  }, []);

  useEffect(() => {
    if (id) {
      getCustomerDetails(id);
    }
  }, [id]);

  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    mobile: "",
    image: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    district: "",
    org_id: "",
    org_department: "",
    org_designation: "",
  });

  useEffect(() => {
    if (customerDetails) {
      setInputData({
        name: customerDetails.data.name || "",
        email: customerDetails.data.email || "",
        mobile: customerDetails.data.mobile || "",
        state: customerDetails.data.state || "",
        district: customerDetails.data.district || "",
        city: customerDetails.data.city || "",
        pincode: customerDetails.data.postal_code || "",
        address: customerDetails.data.address || "",
        image: customerDetails.data.image || "",
        org_id: customerDetails.data.org_id || "",
        org_department: customerDetails.data.org_department || "",
        org_designation: customerDetails.data.org_designation || "",
      });
      if (allstateList?.data?.length > 0) {
        const selectedState = allstateList?.data?.find(
          (state) => state.state === customerDetails.data.state
        );

        if (selectedState) {
          // Pass the selected state's _id to get the district list
          getallDistrictList(selectedState.id);
        }
      }
    }
  }, [customerDetails, allstateList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile" && value.length > 10) {
      setError("Mobile number cannot exceed 10 digits"); // Set error message
      return;
    } else {
      setError(""); // Clear error message if valid
    }
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setInputData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
    }));
  };

  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    setInputData({ ...inputData, state: selectedStateName, district: "" }); // Update state and reset district

    // Find the selected state object based on the state name
    const selectedState = allstateList?.data?.find(
      (state) => state.state === selectedStateName
    );

    if (selectedState) {
      // Pass the selected state's _id to get the district list
      getallDistrictList(selectedState.id);
    }
  };

  const handleDistrictChange = (e) => {
    setInputData({ ...inputData, district: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("postal_code", inputData.pincode);
    formDataToSend.append("city", inputData.city);
    formDataToSend.append("district", inputData.district);
    formDataToSend.append("state", inputData.state);
    formDataToSend.append("org_id", inputData.org_id);
    formDataToSend.append("org_department", inputData.org_department);
    formDataToSend.append("org_designation", inputData.org_designation);
    
    if (inputData.image) {
      formDataToSend.append("image", inputData.image);
    }

    editCustomer(id,formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Edit Customer" />
      <div className="product-form-container" style={{ padding: "2px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0e0e0",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="name"> Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={inputData.name}
                  onChange={handleInputChange}
                  id="organization_name"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="email" className="col-form-label">
                  Email:
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={handleInputChange}
                  id="email"
                  required
                />
              </FormGroup>
            </div>
          </div>

          {/* Add the remaining inputs similarly, organizing them into rows as needed */}
          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="mobile" className="col-form-label">
                  Mobile:
                </Label>
                <Input
                  type="number"
                  name="mobile"
                  min={0}
                  value={inputData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                />
                {error && <FormText color="danger">{error}</FormText>}
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="address" className="col-form-label">
                  Address:
                </Label>
                <Input
                  type="text"
                  name="address"
                  value={inputData.address}
                  onChange={handleInputChange}
                  id="address"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="pincode" className="col-form-label">
                  Pincode:
                </Label>
                <Input
                  type="number"
                  name="pincode"
                  min={0}
                  value={inputData.pincode}
                  onChange={handleInputChange}
                  id="pincode"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="city" className="col-form-label">
                  city:
                </Label>
                <Input
                  type="text"
                  name="city"
                  value={inputData.city}
                  onChange={handleInputChange}
                  id="city"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="state" className="col-form-label">
                  State:
                </Label>
                <Input
                  type="select"
                  name="state"
                  value={inputData.state}
                  onChange={handleStateChange}
                  id="state"
                >
                  <option value="">Select State</option>
                  {allstateList?.data?.map((state) => (
                    <option key={state._id} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="district" className="col-form-label">
                  District:
                </Label>
                <Input
                  type="select"
                  name="district"
                  value={inputData.district}
                  onChange={handleDistrictChange}
                  id="district"
                  disabled={!inputData.state} // Disable until a state is selected
                >
                  <option value="">Select District</option>
                  {alldistrictList?.data?.map((district) => (
                    <option key={district._id} value={district.district}>
                      {district.district}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="org_id" className="col-form-label">
                  Organization List
                </Label>
                <Input
                  type="select"
                  name="org_id"
                  value={inputData.org_id}
                  onChange={handleInputChange}
                  id="org_id"
                >
                  <option value="">Select Org</option>
                  {orgList?.data?.map((variety) => (
                    <option key={variety.id} value={variety.id}>
                      {variety.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="org_designation" className="col-form-label">
                  Org Designation:
                </Label>
                <Input
                  type="text"
                  name="org_designation"
                  value={inputData.org_designation}
                  onChange={handleInputChange}
                  id="org_designation"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="org_department"> Org Department </Label>
                <Input
                  type="text"
                  name="org_department"
                  value={inputData.org_department}
                  onChange={handleInputChange}
                  id="org_department"
                />
              </FormGroup>
            </div>

            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="banner-image" className="col-form-label">
                  Upload New Image :
                </Label>
                <Input
                  id="banner-image"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
              </FormGroup>
            </div>
          </div>

          <Button type="submit" color="primary">
            Edit Customer
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
