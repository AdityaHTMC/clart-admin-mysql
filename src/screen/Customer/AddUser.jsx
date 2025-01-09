/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCommonContext } from "../../helper/CommonProvider";
const AddUser = () => {
  const navigate = useNavigate();

  const { getorgList, orgList,addCustomer,getallstateList,getallDistrictList,allstateList,alldistrictList } = useCommonContext();

  useEffect(() => {
    getorgList();
    getallstateList();
  }, []);

  const [inputData, setInputData] = useState({
    name: "",
    mobile: "",
    image: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    district: "",
    org_id: "",
    org_department: "",
    org_designation: "",
  });

  const handleStateChange = (e) => {
    const selectedStateName = e.target.value;
    setInputData({ ...inputData, state: selectedStateName, district: "" }); 

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setInputData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Store file object
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("name", inputData.name);
    formDataToSend.append("mobile", inputData.mobile);
    formDataToSend.append("email", inputData.email);
    formDataToSend.append("address", inputData.address);
    formDataToSend.append("postal_code", inputData.pincode);
    formDataToSend.append("state", inputData?.state);
    formDataToSend.append("district", inputData?.district);
    formDataToSend.append("city", inputData?.city);
    formDataToSend.append("org_id", inputData.org_id);
    formDataToSend.append("org_department", inputData.org_department);
    formDataToSend.append("org_designation", inputData.org_designation);

    if (inputData.image) {
        formDataToSend.append("image", inputData.image); 
      }

    addCustomer(formDataToSend);

    console.log(formDataToSend);
  };

  return (
    <>
      <CommonBreadcrumb title="Add Customer" />
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
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="mobile"> Mobile </Label>
                <Input
                  type="number"
                  name="mobile"
                  value={inputData.mobile}
                  onChange={handleInputChange}
                  id="mobile"
                  required
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label for="email"> Email </Label>
                <Input
                  type="email"
                  name="email"
                  value={inputData.email}
                  onChange={handleInputChange}
                  id="mobile"
                  required
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <FormGroup>
                <Label for="address"> Address </Label>
                <Input
                  type="text"
                  name="address"
                  value={inputData.address}
                  onChange={handleInputChange}
                  id="address"
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label for="city"> City </Label>
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
                <Label for="pincode"> Pincode </Label>
                <Input
                  type="text"
                  name="pincode"
                  value={inputData.pincode}
                  onChange={handleInputChange}
                  id="pincode"
                />
              </FormGroup>
            </div>
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
            <div className="col-md-6">
              <FormGroup>
                <Label htmlFor="banner-image" className="col-form-label">
                  Upload Image :
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
            Add
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
