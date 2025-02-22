/* eslint-disable no-unused-vars */
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
  Spinner,
  Table,
} from "reactstrap";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { LoadingComponent } from "../../component/common/loading";
import { useColonyContext } from "../../helper/ColonyProvider";
import { Autocomplete, TextField } from "@mui/material";
import { useCategoryContext } from "../../helper/CategoryProvider";

export const PackingBox = () => {
  const {
    getPackingBoxList,
    packingBox,
    create_packing_box,
    edit_packing_box,
  } = useMasterContext();

  const { getallproductList, allproductList } = useCategoryContext();
  // console.log(allBreeds)
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [packingDetail, setPackingDetail] = useState(null);
  const [initialData, setInitialData] = useState({
    title: "",
    stock: "",
    capacity: "",
    price: "",
    breed_id: "",
  });

  useEffect(() => {
    getallproductList();
  }, []);

  useEffect(() => {
    setInitialData({
      title: packingDetail?.title || "",
      stock: packingDetail?.stock || "",
      capacity: packingDetail?.capacity || "",
      price: packingDetail?.price || "",
      breed_id: packingDetail?.breed_id || "",
    });
  }, [packingDetail]);

  const onChange = (e) => {
    setInitialData({ ...initialData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getPackingBoxList();
  }, []);

  const onCloseModal = () => {
    setIsOpen(false);
    setInitialData({
      title: "",
      stock: "",
      capacity: "",
      price: "",
      breed_id: "",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (initialData.title === "")
      return toast.info("Packing box name can not be empty");
    if (!initialData.breed_id) return toast.info("species required");
    setIsProcessing(true);
    let res;
    if (isEditing) {
      res = await edit_packing_box(packingDetail.id, initialData);
    } else {
      res = await create_packing_box(initialData);
    }
    if(res?.status === 200){
      setIsProcessing(false);
      setIsOpen(false);
      setInitialData({
        title: "",
        stock: "",
        capacity: "",
        price: "",
        breed_id: "",
      })
      getPackingBoxList()
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Packing Box" parent="Home" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Unit Management" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button
                    color="primary"
                    onClick={() => {
                      setIsOpen(true);
                      setIsEditing(false);
                      setPackingDetail(null);
                    }}
                  >
                    Add Packing Box
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div className="px-sm-3">
                  <Table hover responsive className="align-middle">
                    <thead>
                      <tr>
                        <th>TITLE</th>
                        <th>CAPACITY</th>
                        <th>Animal Name</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packingBox?.loading ? (
                        <tr>
                          <td colSpan="10" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : packingBox?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No List Found
                          </td>
                        </tr>
                      ) : (
                        packingBox?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product?.title}</td>
                            <td>{product?.capacity}</td>
                            <td>{product?.breed_title}</td>
                            <td>{product?.price}</td>
                            <td>{product?.stock}</td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => {
                                    setIsEditing(true);
                                    setPackingDetail(product);
                                    setIsOpen(true);
                                  }}
                                >
                                  <FaEdit />
                                </Button>
                                <Button className="btn" color="link">
                                  <FaTrashAlt />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  {!packingBox.loading && packingBox?.data?.length === 0 && (
                    <p
                      className="text-muted text-center my-4"
                      style={{ fontSize: 14 }}
                    >
                      No Data found
                    </p>
                  )}
                  {packingBox.loading && <LoadingComponent />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={isOpen} toggle={setIsOpen}>
        <ModalHeader toggle={() => setIsOpen(false)}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            {isEditing ? `Edit Bedding Material` : "Add New Bedding Material"}
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            {allproductList?.data && allproductList.data?.length > 0 && (
              <Autocomplete
                disablePortal
                options={allproductList?.data}
                style={{ paddingTop: "16px" }}
                disabled={isProcessing}
                getOptionLabel={(option) => option?.title || ""}
                value={
                  allproductList?.data?.find(
                    (sp) => sp.id === initialData?.breed_id
                  ) || ""
                }
                onChange={(event, newValue) => {
                  if (newValue) {
                    setInitialData({ ...initialData, breed_id: newValue.id });
                  } else {
                    setInitialData({ ...initialData, breed_id: "" });
                  }
                }}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Select animal" />
                )}
              />
            )}
            <FormGroup>
              <Label htmlFor="recipient-name" className="col-form-label">
                Packing box name :
              </Label>
              <Input
                type="text"
                required
                min={3}
                placeholder="Enter packing box name"
                onChange={onChange}
                value={initialData.title}
                name="title"
                disabled={isProcessing}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="recipient-name" className="col-form-label">
                Packing box capacity :
              </Label>
              <Input
                type="number"
                required
                min={1}
                placeholder="Enter packing box capacity"
                onChange={onChange}
                value={initialData.capacity}
                name="capacity"
                disabled={isProcessing}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="recipient-name" className="col-form-label">
                Packing box Stock :
              </Label>
              <Input
                type="number"
                required
                min={1}
                placeholder="Enter packing box stock number"
                onChange={onChange}
                value={initialData.stock}
                name="stock"
                disabled={isProcessing}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="recipient-name" className="col-form-label">
                Packing box price :
              </Label>
              <Input
                type="number"
                required
                min={0}
                placeholder="Enter packing box price"
                onChange={onChange}
                name="price"
                value={initialData.price}
                disabled={isProcessing}
              />
            </FormGroup>
            {/* <FormGroup className="col-md-6">
                <Label htmlFor="org_type" className="col-form-label">
                  Animal List
                </Label>
                <Input
                  type="select"
                  name="org_type"
                  value={formData.org_type}
                  onChange={handleInputChange}
                  id="org_type"
                >
                  <option value="">Select Org Type</option>
                  {allproductList?.data?.map((variety) => (
                    <option key={variety.id} value={variety.id}>
                      {variety.title}
                    </option>
                  ))}
                </Input>
              </FormGroup> */}
            <ModalFooter className="px-0">
              <Button
                size="sm"
                type="submit"
                color="primary"
                disabled={isProcessing}
              >
                Save
              </Button>
              <Button
                size="sm"
                type="button"
                color="secondary"
                onClick={onCloseModal}
                disabled={isProcessing}
              >
                Close
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>




      
    </>
  );
};
