import Datatable from "../component/common/data-table";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CommonCardHeader from "../component/common/card-header";
import { SalesTransactionData } from "../Data/Sales";

const SalesTransaction = () => {
  return (
    <>
      <CommonBreadcrumb title="Transactions" parent="Sales" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title="Transaction Details" />
              <CardBody>
                <div id="batchDelete" className="transactions">
                  <Datatable multiSelectOption={false} myData={SalesTransactionData} pageSize={10} pagination={true} class="-striped -highlight" />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SalesTransaction;
