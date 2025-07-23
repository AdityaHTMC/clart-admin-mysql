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
  Table,
} from "reactstrap";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useMasterContext } from "../../helper/MasterProvider";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../component/common/loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Pagination, Stack } from "@mui/material";

export const RackPage = () => {
  const {
    getRacksList,
    rackList,
    getAllFloor,
    allFloor,
    create_rack,
    edit_rack,deleteRack
  } = useMasterContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rackDetail, setRackDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemperPage = 8;

  const totalPages =
    rackList?.total && Math.ceil(rackList?.total / itemperPage);

  const [state, setState] = useState({
    title: "",
    rows_no: "",
    col_no: "",
    type: "sell",
  });
  const [floor, setFloor] = useState("");

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getRacksList(dataToSend);
  }, [currentPage]);

  useEffect(() => {
    if (!isEditing && isOpen && allFloor.length === 0) {
      getAllFloor();
    }
  }, [isOpen, isEditing, allFloor]);

  useEffect(() => {
    setState({
      ...state,
      title: rackDetail?.title || "",
      type: rackDetail?.type || "Sell",
    });
  }, [rackDetail]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.title === "") return toast.info("rack name can not be empty");
    setIsProcessing(true);
    let res;
    if (isEditing) {
      res = await edit_rack(rackDetail.id, {
        title: state.title,
        type: state.type,
        col_no: state.col_no,
        rows_no: state.rows_no,
        floor_id: floor,
      });
    } else {
      res = await create_rack({ ...state, floor_id: floor });
    }
    setIsProcessing(false);
    if (res?.success === true) {
      toast.success(res.message);
      setState({ title: "", col_no: "", rows_no: "", type: "" });
      setIsOpen(false);
      getRacksList({ page: 1, limit: 20 });
    } else {
      toast.error(res?.message || "Rack can not be created");
    }
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  const handleDelete = async(id) => {
    if(window.confirm('Are you sure you want to delete this rack?'))
    {
    deleteRack(id)
    }
  }

  return (
    <>
      <CommonBreadcrumb title="Racks Management" parent="Home" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Unit Management" /> */}
              <CardBody>
                <div
                  className="btn-popup pull-right"
                  onClick={() => {
                    setIsEditing(false);
                    setRackDetail(null);
                    setIsOpen(true);
                  }}
                >
                  <Button color="primary">Add Rack</Button>
                </div>
                <div className="clearfix"></div>
                <div className="px-sm-3">
                  <Table responsive hover borderless align="center">
                    <thead className="border-bottom border-top py-4">
                      <tr>
                        <th>REF</th>
                        <th className="text-center">TITLE</th>
                        <th className="text-center">TOTAL Colonies</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Rows</th>
                        <th className="text-center">Colunms</th>
                        <th className="text-end">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!rackList.loading &&
                        rackList?.data?.map((item, i) => (
                          <tr key={i}>
                            <td>
                              <Badge>#{item?.ref}</Badge>
                            </td>
                            <td className="text-center">{item?.title}</td>
                            <td className="text-center">
                              {item?.rows_no * item?.col_no}
                            </td>
                            <td className="text-center">
                              <Badge color="danger">{item?.type}</Badge>
                            </td>
                            <td className="text-center">{item?.rows_no}</td>
                            <td className="text-center">{item?.col_no}</td>
                            <td className="d-flex gap-2 align-items-center justify-content-end">
                              {/* <Badge
                                color="danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setIsEditing(true);
                                  setIsOpen(true);
                                  setRackDetail(item);
                                }}
                              >
                                <FaEdit style={{ fontSize: 14 }} />
                              </Badge> */}
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setIsEditing(true);
                                  setIsOpen(true);
                                  setRackDetail(item);
                                }}
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <FaTrashAlt />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
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
                  {!rackList.loading && rackList?.data?.length === 0 && (
                    <p
                      className="text-muted text-center my-4"
                      style={{ fontSize: 14 }}
                    >
                      No Data found
                    </p>
                  )}

                  {rackList.loading && <LoadingComponent />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={isOpen} toggle={setIsOpen}>
        <ModalHeader toggle={() => setIsOpen(false)}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            {isEditing ? `Edit ${rackDetail?.ref}` : "Add New Rack"}
          </h5>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            {!isEditing && (
              <FormGroup>
                <Label for="exampleSelect">Select Floor</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  value={floor}
                  disabled={isProcessing}
                  onChange={(e) => setFloor(e.target.value)}
                  type="select"
                >
                  <option value={""}>select floor</option>
                  {allFloor.map((rm) => (
                    <option key={rm.id} value={rm.id}>
                      {rm.title} ({rm.ref})
                    </option>
                  ))}
                </Input>
              </FormGroup>
            )}
            {/* <FormGroup>
              <Label for="exampleSelect">Select Floor</Label>
              <Input
                id="exampleSelect"
                name="floor"
                value={floor}
                disabled={isProcessing}
                onChange={(e) => setFloor(e.target.value)}
                type="select"
              >
                <option value={""}>select floor</option>
                {allFloor.map((rm) => (
                  <option key={rm.id} value={rm.id}>
                    {rm.title} ({rm.ref})
                  </option>
                ))}
              </Input>
            </FormGroup> */}
            <FormGroup>
              <Label htmlFor="recipient-name" className="col-form-label">
                Rack Name :
              </Label>
              <Input
                type="text"
                required
                min={3}
                placeholder="Enter rack name"
                name="title"
                onChange={onChange}
                value={state.title}
                disabled={isProcessing}
              />
            </FormGroup>
            {!isEditing && (
              <FormGroup>
                <Label htmlFor="" className="col-form-label">
                  Rows
                </Label>
                <Input
                  type="number"
                  required
                  placeholder="Enter rows_no"
                  min={1}
                  onChange={onChange}
                  name="rows_no"
                  value={state.rows_no}
                  disabled={isProcessing}
                />
              </FormGroup>
            )}
              {/* <FormGroup>
                <Label htmlFor="" className="col-form-label">
                  Rows
                </Label>
                <Input
                  type="number"
                  required
                  placeholder="Enter rows_no"
                  min={1}
                  onChange={onChange}
                  name="rows_no"
                  value={state.rows_no}
                  disabled={isProcessing}
                />
              </FormGroup> */}
            {!isEditing && (
              <FormGroup>
                <Label htmlFor="" className="col-form-label">
                  Columns
                </Label>
                <Input
                  type="number"
                  required
                  placeholder="Enter col_no"
                  min={1}
                  onChange={onChange}
                  name="col_no"
                  value={state.col_no}
                  disabled={isProcessing}
                />
              </FormGroup>
            )}
             {/* <FormGroup>
                <Label htmlFor="" className="col-form-label">
                  Columns
                </Label>
                <Input
                  type="number"
                  required
                  placeholder="Enter col_no"
                  min={1}
                  onChange={onChange}
                  name="col_no"
                  value={state.col_no}
                  disabled={isProcessing}
                />
              </FormGroup> */}
            <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
              <Label className="d-block">
                <Input
                  className="radio_animated"
                  type="radio"
                  disabled={isProcessing}
                  onChange={(e) =>
                    setState({ ...state, type: e.target.checked ? "Sell" : "" })
                  }
                  checked={state.type === "Sell"}
                />
                For Sell
              </Label>
              <Label className="d-block mx-4">
                <Input
                  className="radio_animated"
                  disabled={isProcessing}
                  type="radio"
                  onChange={(e) =>
                    setState({ ...state, type: e.target.checked ? "Lab" : "" })
                  }
                  checked={state.type === "Lab"}
                />
                For Lab
              </Label>
            </FormGroup>
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
                onClick={() => setIsOpen(false)}
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
