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
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  ModalHeader,
  Label,
  Input,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import avtar from "../../../src/assets/profile.png";
import { useCommonContext } from "../../helper/CommonProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { LoadingComponent } from "../../component/common/loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Chip, Pagination, Stack } from "@mui/material";
const CultColonyList = () => {
  const navigate = useNavigate();

  const {
    getColonyCultList,
    allCultColonyList,
    getColonyCultRemove,
    allCultColonyanimal,removeCult
  } = useCommonContext();


  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [animalList, setAnimalList] = useState([]);
  const [removedAnimalIds, setRemovedAnimalIds] = useState([]); 
  const [colonyId, setColonyId] = useState(''); 
  const itemperPage = 10;

  const totalPages =
    allCultColonyList?.total &&
    Math.ceil(allCultColonyList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
    };
    getColonyCultList(dataToSend);
  }, [currentPage]);

  const onCloseModal = () => {
    setOpen(false);
  };

  const handleaddUser = () => {
    navigate("/add-customer");
  };

  const handleGetAnimal = (id) => {
    setOpen(true);
    setColonyId(id)
    const dataToSend = {
      colony_id: id,
    };
    getColonyCultRemove(dataToSend);
  };

  useEffect(() => {
    if (open) {
      setAnimalList(allCultColonyanimal);
      setRemovedAnimalIds([]);
    }
  }, [open, allCultColonyanimal]);


  const handleRemoveChip = (animalId) => {
    setAnimalList((prevState) => ({
      ...prevState, // Keep other properties of animalList
      data: prevState.data.filter((animal) => animal.id !== animalId), // Update only the data array
    }));
    setRemovedAnimalIds((prev) => [...prev, animalId]);
  };

  console.log(removedAnimalIds, 'removedAnimalIds');
  

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  const handleSubmit = async () => {
    const dataToSend = {
      items: removedAnimalIds,
      id: colonyId,
    };
  
    const response = await removeCult(dataToSend); 
  
    if (response !== null) { 
      const dataToSend = {
        page: currentPage,
        limit: itemperPage,
      };
      getColonyCultList(dataToSend);  
    }
  
    onCloseModal();
  };
  

  return (
    <>
      <CommonBreadcrumb title="Culled Colony List" parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Colony</th>
                          <th>Breed Name</th>
                          <th>Total Male</th>
                          <th>Total Female</th>
                          <th>Total Culled</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Show loading spinner */}
                        {allCultColonyList?.loading ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <Spinner color="secondary" className="my-4" />
                            </td>
                          </tr>
                        ) : allCultColonyList?.data?.length === 0 ? (
                          // Show "No products found" when there's no data
                          <tr>
                            <td colSpan="7" className="text-center">
                              No Customer List Found
                            </td>
                          </tr>
                        ) : (
                          allCultColonyList?.data?.map((product, index) => (
                            <tr key={index}>
                              <td> {product.ref} </td>
                              <td>{product?.breed_name || "NA"}</td>
                              <td>{product?.total_male || "NA"}</td>
                              <td>{product?.total_female || "NA"}</td>
                              <td>{product?.total_cult || "NA"}</td>
                              <td>
                                {" "}
                                <div className="circelBtnBx">
                                  <Button
                                    className="btn"
                                    color="link"
                                    onClick={() => handleGetAnimal(product?.id)}
                                  >
                                    <FaEdit />
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={open} toggle={onCloseModal} className="modal-xg">
        <ModalHeader toggle={onCloseModal}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Remove
          </h5>
        </ModalHeader>
        <ModalBody>
          {" "}
          <Form>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{ gap: 1.5, p: 2, borderRadius: "8px", bgcolor: "#f8f9fa" }}
            >
              {animalList?.data?.map((animal) => (
                <Chip
                  key={animal.id}
                  label={animal.id} // Use meaningful label
                  onDelete={() => handleRemoveChip(animal.id)}
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    padding: "5px 10px",
                    borderRadius: "20px",
                   
                  }}
                />
              ))}
            </Stack>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CultColonyList;
