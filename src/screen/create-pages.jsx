import { Card, CardBody, Container } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import CommonCardHeader from "../component/common/card-header";
import PageTabs from "../component/pages/page-tabs";

const CreatePage = () => {
  return (
    <>
      <CommonBreadcrumb title="Create Page" parent="Pages" />
      <Container fluid>
        <Card>
          <CommonCardHeader title="Add Page" />
          <CardBody>
            <PageTabs />
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default CreatePage;
