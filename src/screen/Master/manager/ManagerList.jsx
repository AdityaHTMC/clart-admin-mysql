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
} from "reactstrap";
import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../../component/common/bread-crumb";
import { useMasterContext } from "../../../helper/MasterProvider";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { Spinner } from "reactstrap";
import { Pagination, Stack, Switch } from "@mui/material";
const ManagerList = () => {
  const { getManagerMasterList, managersMasterList,switchManager,deleteManager } = useMasterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemperPage = 8;
  const totalPages =
    managersMasterList?.total &&
    Math.ceil(managersMasterList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getManagerMasterList(dataToSend);
  }, [currentPage]);
  console.log(managersMasterList, "managersMasterList");
    const navigate = useNavigate();
    const onOpenModal = () => {
    navigate("/add-manager");
  };

    const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    await switchManager(product.id, newStatus);
  };

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you wish to delete this item?")) {
        // delete product logic here
        deleteManager(id);
      }
    };
  
 const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };
const handleEdit = (id) => {
    navigate(`/manager-edit/${id}`);
  };


  return (
    <>
      <CommonBreadcrumb title="Manageres" parent="master" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary"
                  onClick={onOpenModal}
                  >Add Manager</Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>SL No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managersMasterList?.loading ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : managersMasterList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        managersMasterList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {product?.image && (
                                <img
                                  src={product?.image}
                                  alt="img"
                            style={{
  width: "50px",
  height: "50px",
  objectFit: "cover",
  borderRadius: "50%",
}}

                                />
                              )}
                            </td>
                            <td>{product?.name}</td>
                            <td>{product?.email}</td>
                            <td>{product?.mobile}</td>
                            <td>
                       <Switch
                                  checked={product.status === "Active"}
                                  onChange={() => handleStatusToggle(product)}
                                  color="secondary"
                                />
                            </td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                   onClick={() => handleEdit(product.id)}
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  className="btn"
                                  color="link"
                                   onClick={() => handleDelete(product.id)}
                                >
                                  <FaTrashAlt />
                                </Button>
                              </div>
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
    </>
  );
};

export default ManagerList;
