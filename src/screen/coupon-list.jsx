
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CommonCardHeader from "../component/common/card-header";
import Datatable from "../component/common/data-table";
import { CouponsListData } from "../Data/Coupons";

const ListCoupons = () => {
  return (
    <>
      <CommonBreadcrumb title="List Coupons" parent="Coupons" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CommonCardHeader title="Product Coupons" />
              <CardBody>
                <div id="batchDelete" className="category-table order-table coupon-list-delete">
                  <Datatable multiSelectOption={true} myData={CouponsListData} pageSize={10} pagination={true} class="-striped -highlight" />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListCoupons;
