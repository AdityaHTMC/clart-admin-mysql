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
  Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";

const ReviewsList = () => {
  const navigate = useNavigate();
  const {
    productList,
    getproductList,
    ProductDelete,
    getproductReviewList,
    riviewList,
  } = useCategoryContext();

  const [open, setOpen] = useState(false);

  console.log(productList, "productList");

  useEffect(() => {
    getproductList();
  }, []);

  const onOpenModal = (id) => {
    setOpen(true);
    getproductReviewList(id);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <CommonBreadcrumb title="Animal Review List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList?.loading ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            <Spinner color="secondary" className="my-4" />
                          </td>
                        </tr>
                      ) : productList?.data?.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        productList?.data?.map((product, index) => (
                          <tr key={index}>
                            <td>{product.title}</td>
                            <td>
                              <div className="circelBtnBx">
                                <Button
                                  className="btn"
                                  color="link"
                                  onClick={() => onOpenModal(product.id)}
                                >
                                  <IoEye />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={open} toggle={onCloseModal} className="modal-lg">
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title fw-bold">Reviews</h5>
        </ModalHeader>
        <ModalBody>
          {riviewList?.loading ? (
            <div className="text-center">
              <Spinner color="secondary" />
            </div>
          ) : riviewList?.data?.length === 0 ? (
            <p>No Reviews Found</p>
          ) : (
            <ul>
              {riviewList?.data?.map((review, index) => (
                <li key={index}>
                  <strong>{review.userName}</strong>: {review.comment}
                </li>
              ))}
            </ul>
          )}
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ReviewsList;
