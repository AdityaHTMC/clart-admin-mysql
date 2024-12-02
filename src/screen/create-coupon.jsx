import { Card, CardBody, Container } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CouponTabs from "../component/coupon/coupon-tabs";
import CommonCardHeader from "../component/common/card-header";

const CreateCoupons = () => {
  return (
    <>
      <CommonBreadcrumb title="Create Coupon" parent="Coupon" />
      <Container fluid>
        <Card>
          <CommonCardHeader title="Discount Coupon Details" />
          <CardBody>
            <CouponTabs />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default CreateCoupons;
