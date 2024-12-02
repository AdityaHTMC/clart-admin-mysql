import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import Datatable from "../component/common/data-table";
import { MenuListData } from "../Data/Menu";

const MenuList = () => {
    return (
        <>
            <CommonBreadcrumb title="List Menu" parent="Menu" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Menu Lists</h5>
                            </CardHeader>
                            <CardBody>
                                <div id="batchDelete" className="category-table order-table coupon-list-delete">
                                    <Datatable multiSelectOption={true} myData={MenuListData} pageSize={6} pagination={false} class="-striped -highlight" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MenuList;
