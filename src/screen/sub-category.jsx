import { ArcElement, BarController, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Title, Tooltip } from "chart.js";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useState } from "react";
import Datatable from "../component/common/data-table";
import { ProductCategoryData } from "../Data/Product/Physical";
// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarController, BarElement, ArcElement, Filler, RadialLinearScale);

const SubCategoryPage = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        setOpen(true);
    };
    const onCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <CommonBreadcrumb title="Sub Category" parent="Physical" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Sub Category
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                                                Add Sub Category
                                            </h5>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label htmlFor="recipient-name" className="col-form-label">
                                                       Sub Category Name :
                                                    </Label>
                                                    <Input type="text" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="message-text" className="col-form-label">
                                                       Sub Category Image :
                                                    </Label>
                                                    <Input id="validationCustom02" type="file" />
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={onCloseModal}>
                                                Save
                                            </Button>
                                            <Button color="secondary" onClick={onCloseModal}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    <Datatable myData={ProductCategoryData} multiSelectOption={false} pageSize={10} pagination={true} class="-striped -highlight" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SubCategoryPage;
