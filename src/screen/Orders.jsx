import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import Datatable from "../component/common/data-table";
import CommonCardHeader from "../component/common/card-header";
import { SaleOrdersData } from "../Data/Sales";

const SalesOrders = () => {
  return (
    <>
      <CommonBreadcrumb title="Orders" parent="Sales" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title="Manage Order" />
              <CardBody className="order-datatable">
                <Datatable multiSelectOption={false} myData={SaleOrdersData} pageSize={10} pagination={true} class="-striped -highlight" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SalesOrders;
