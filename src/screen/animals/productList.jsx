/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Badge, Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { useEffect } from "react";
import { useCategoryContext } from "../../helper/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { LoadingComponent } from "../../component/common/loading";
import { toast } from "react-toastify";
// Register the necessary Chart.js components
const ProductList = () => {

  const navigate = useNavigate()
  const { productList, getproductList, ProductDelete } = useCategoryContext()

  useEffect(() => {
    if(productList.data?.length === 0 && productList.loading === true){
      getproductList();
    }
  }, [productList.data]);

  const onOpenModal = () => {
    navigate('/add-animal')
  };
  const handleEdit = (id) => {
    navigate(`/product-edit/${id}`); // Corrected URL template
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      const res = await ProductDelete(id)
      if(res.success === true) {
        getproductList();
        toast.success(res.message)
      }else {
        toast.error(res?.message || 'An error has occurred while deleting')
      }
    }

  };

  return (
    <>
      <CommonBreadcrumb title="Animal List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  <Button color="primary" onClick={onOpenModal}>
                    Add Animal
                  </Button>
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <Table responsive hover borderless align="center">
                    <thead className="border-bottom border-top py-4" >
                      <tr>
                        <th>Product Image</th>
                        <th className="text-center">Species Name</th>
                        <th className="text-center">Breed Name</th>
                        <th className="text-center">Winning Period</th>
                        <th className="text-center">Culling Period</th>
                        <th className="text-center">For</th>
                        <th className="text-center">Gov Price</th>
                        <th className="text-center">Non Gov Price</th>
                        <th className="text-center">status</th>
                        {/* <th className="text-center">Birth Cycle</th> */}
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList?.data?.map((product, index) => (
                        <tr key={index}>
                          <th>
                            <img
                              src={product?.images[0]}
                              alt="img"
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                          </th>
                          <td className="text-center"> {product.item_name} </td>
                          <td className="text-center">
                              <Badge color="danger">{product.breed_name}</Badge>
                          </td>
                          <td className="text-center"> {product.winning} </td>
                          <td className="text-center"> {product.calling} </td>
                          <td className="text-center"> 
                              <Badge>{product.species_for}</Badge>
                          </td>
                          <td className="text-center"> {product.gov_price || 'N/A'} </td>
                          <td className="text-center"> {product.non_gov_price || 'N/A'} </td>
                          <td className="text-center"> 
                              <Badge color={product.status === 'Active'? 'success' : 'warning'}>{product.status}</Badge>
                          </td>
                          {/* <td className="text-center"> {product.birth_cycle} </td> */}
                          <td>
                            <div className="d-flex justify-content-end align-items-center gap-2">
                              <Badge color="danger" onClick={() => handleEdit(product._id)} style={{cursor: 'pointer'}}>
                                <FaEdit size={14} />
                              </Badge>
                              <Badge color="warning" onClick={() => handleDelete(product._id)} style={{cursor: 'pointer'}}>
                                <AiOutlineDelete size={14} />
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {!productList.loading && productList?.data?.length === 0 && (
                    <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                  )}

                  {productList.loading && <LoadingComponent />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
