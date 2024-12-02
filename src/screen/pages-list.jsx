import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CommonCardHeader from "../component/common/card-header";
import Datatable from "../component/common/data-table";
import { ListData } from "../Data/Lists";

const ListPages = () => {
    return (
        <>
            <CommonBreadcrumb title="List Pages" parent="Pages" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CommonCardHeader title="" />
                            <CardBody>
                                <div id="batchDelete" className="category-table order-table coupon-list-delete">
                                    <Datatable multiSelectOption={true} myData={ListData} pageSize={7} pagination={false} class="-striped -highlight" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListPages;
