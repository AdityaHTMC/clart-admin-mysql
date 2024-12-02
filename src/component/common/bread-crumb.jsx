
import { Link } from "react-router-dom";
import { Home } from "react-feather";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from "reactstrap";

const CommonBreadcrumb = ({ title, parent }) => {
  return (
    <Container fluid>
      <div className="page-header">
        <Row>
          <Col lg="6">
            <div className="page-header-left">
              <h3>
                {title}
                <small>Clart Admin panel</small>
              </h3>
            </div>
          </Col>
          <Col lg="6">
            <Breadcrumb className=" pull-right">
              <BreadcrumbItem>
                <Link to="/dashboard">
                  <Home />
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>{parent}</BreadcrumbItem>
              <BreadcrumbItem className=" active">{title}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CommonBreadcrumb;
