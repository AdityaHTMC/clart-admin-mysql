/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import CommonBreadcrumb from "../component/common/bread-crumb";
import {
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
import { useCommonContext } from "../helper/CommonProvider";
import avtar from '../../src/assets/profile.png'
import { LoadingComponent } from "../component/common/loading";
const UserList = () => {
  const navigate = useNavigate();

  const { getUserList, userList,switchUser } = useCommonContext();

  useEffect(() => {
    getUserList();
  }, []);

  

  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    await switchUser(product._id, newStatus); // Your API call here
  };

  return (
    <>
      <CommonBreadcrumb title="Customer List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!userList?.loading && (
                        userList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={product.image || avtar}
                                alt="img"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />
                            </td>
                            <td>{product.name}</td>
                            <td> {product.email} </td>
                            <td> {product.mobile}</td>
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
