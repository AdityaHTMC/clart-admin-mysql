/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import CommonBreadcrumb from "../component/common/bread-crumb";
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
import { useEffect, useState } from "react";
import { useCategoryContext } from "../helper/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale
);

import { Spinner } from "reactstrap";
import { useCommonContext } from "../helper/CommonProvider";
import avtar from "../../src/assets/profile.png";
import { BsFillEyeFill } from "react-icons/bs";
import Switch from '@mui/material/Switch';
import { LoadingComponent } from "../component/common/loading";

const PromoCodeList = () => {
  const navigate = useNavigate();

  const { promoCode, getPromoCodeList } = useCommonContext();




  const toggleStatus = (index) => {

  };

  const deletePromoCode = (index) => {

  };

  useEffect(() => {
    getPromoCodeList();
  }, []);




  const handleStatusToggle = async (product) => {
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    //   await switchUser(product._id, newStatus); // Your API call here
  };

  const navigatePage = (id) => {
    navigate(`/addcoupons`);
  };

  return (
    <>
      <CommonBreadcrumb title="Promo Code List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={navigatePage}>
                    Add Coupon
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Discount</th>
                          <th>Min Amount</th>
                          <th>Started At</th>
                          <th>Expired At</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {promoCode?.data?.map((promo, index) => (
                          <tr key={index}>
                            <td>{promo.title}</td>
                            <td>{promo.discount}</td>
                            <td>{promo.min_order_amount}</td>
                            <td>
                              {" "}
                              {new Date(promo?.start_date).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}{" "}
                            </td>
                            <td>
                              {new Date(promo?.expiry_date).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </td>
                            <td>
                              <Switch
                                checked={promo.status}
                                onChange={() => toggleStatus(index)}
                                color="secondary"
                              />
                            </td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() =>
                                    console.log(`Edit promo code ${promo.code}`)
                                  }
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => deletePromoCode(index)}
                                >
                                  <FaTrashAlt />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {!promoCode.loading && promoCode?.data?.length === 0 && (
                      <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No data found</p>
                    )}
                    {promoCode.loading && <LoadingComponent />}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PromoCodeList;
