/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IconButton, Pagination, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { useCategoryContext } from "../../helper/CategoryProvider";
const AnimalList = () => {
  const navigate = useNavigate();

  const { productList, getproductList, ProductDelete } = useCategoryContext();

  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 15;

  const totalPages =
    productList?.total && Math.ceil(productList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      keyword_search: searchTerm,
    };
    getproductList(dataToSend);
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onOpenModal = () => {
    navigate("/add-animal");
  };
  const handleEdit = (id) => {
    navigate(`/product-edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      ProductDelete(id);
    }
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };
  console.log("productList", productList);
  return (
    <>
      <CommonBreadcrumb title="Animal List" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <form
                    className="searchBx"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TextField
                      id="search-box"
                      label="Search Animal"
                      variant="outlined"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      fullWidth
                      sx={{
                        maxWidth: "400px",
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                      }}
                    />
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon style={{ fill: "#979797" }} />
                    </IconButton>
                  </form>

                  {/* Add Test Button */}
                  <div className="btn-popup">
                    <Button
                      color="primary"
                      onClick={onOpenModal}
                      style={{ marginLeft: "15px" }}
                    >
                      Add Animal
                    </Button>
                  </div>
                </div>

                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <div
                      style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                      className="table-responsive"
                    >
                      <Table hover responsive bordered className="align-middle">
                        <thead>
                          <tr>
                            <th>Product Image</th>
                            <th className="text-center">Breed</th>
                            <th className="text-center">Species</th>{" "}
                            <th className="text-center">Suckling Period</th>
                            <th className="text-center">Post Weaning Period</th>
                            <th className="text-center">Young Period</th>
                            <th className="text-center">Buck Period</th>
                            <th className="text-center">Deo Period</th>
                            <th className="text-center">Culled Period</th>
                            <th className="text-center">For</th>
                            <th className="text-center">Gov Price</th>
                            <th className="text-center">Non Gov Price</th>
                            <th className="text-center">Status</th>
                            <th className="text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productList?.loading ? (
                            <tr>
                              <td colSpan="10" className="text-center">
                                <Spinner color="secondary" className="my-4" />
                              </td>
                            </tr>
                          ) : productList?.data?.length === 0 ? (
                            <tr>
                              <td colSpan="10" className="text-center">
                                No List Found
                              </td>
                            </tr>
                          ) : (
                            productList?.data?.map((product, index) => (
                              <tr key={index}>
                                <td>
                                  {product?.images && (
                                    <img
                                      src={product?.images[0]}
                                      alt="img"
                                      style={{
                                        width: "100px",
                                        height: "60px",
                                        objectFit: "cover",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  )}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product?.title}{" "}
                                </td>
                                <td className="text-center">
                                  <Badge color="danger">
                                    {product?.species}
                                  </Badge>
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product.suckling_period}{" "}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product.post_weaning_period}{" "}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product.young_period}{" "}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product.buck_period}{" "}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product.doe_period}{" "}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product.culled_period}
                                  {" "}
                                </td>
                                <td className="text-center">
                                  <Badge>{product.species_for}</Badge>
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product?.gov_price || "N/A"}{" "}
                                </td>
                                <td className="text-center">
                                  {" "}
                                  {product?.non_gov_price || "N/A"}{" "}
                                </td>
                                <td className="text-center">
                                  <Badge
                                    color={
                                      product.status === "Active"
                                        ? "success"
                                        : "warning"
                                    }
                                  >
                                    {product?.status}
                                  </Badge>
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
                    </div>

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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AnimalList;
