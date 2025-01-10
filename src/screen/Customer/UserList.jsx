/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import avtar from '../../../src/assets/profile.png'
import { useCommonContext } from "../../helper/CommonProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { LoadingComponent } from "../../component/common/loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
const UserList = () => {
  const navigate = useNavigate();

  const { getUserList, userList,switchUser,deleteCustomer } = useCommonContext();

  useEffect(() => {
    getUserList();
  }, []);

  const handleaddUser = () => {
    navigate("/add-customer");
  };

  const handleEdit = (id) => {
    navigate(`/edit-customer/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
        deleteCustomer(id);
    }
  };

  
  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    await switchUser(product.id, newStatus); // Your API call here
  };

  return (
    <>
      <CommonBreadcrumb title="Customer List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
              <div className="btn-popup pull-right">
                    <Button color="primary" onClick={handleaddUser} >
                      Add
                    </Button>
                  </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!userList?.loading && (
                        userList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name || "NA"}</td>
                            <td> {product.email || "NA"} </td>
                            <td> {product.mobile || "NA"}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`flexSwitchCheckChecked-${index}`}
                                  checked={product.status === "Active"}
                                  onChange={() => handleStatusToggle(product)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`flexSwitchCheckChecked-${index}`}
                                >
                                  {product.status === "Active"
                                    ? "Active"
                                    : "Inactive"}
                                </label>
                              </div>
                            </td>
                            <td>
                                <div className="circelBtnBx">
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleEdit(product?.id)}
                                  >
                                    <FaEdit />
                                  </Button>
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleDelete(product?.id)}
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
                  {!userList.loading && userList?.data?.length === 0 && (
                    <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No data found</p>
                  )}
                  {userList.loading && <LoadingComponent />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserList;
