import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import { useLocation } from "react-router-dom";

export const NotFound = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean); // ["featured-section"]
  const featuredSection = path[path.length - 1]; // "featured-section"

  console.log(featuredSection);

  return (
    <div>
      <CommonBreadcrumb title={featuredSection} parent="Physical" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              {/* <CommonCardHeader title="Product Sub Categoty" /> */}
              <CardBody>
                <div className="btn-popup pull-right">
                  {/* <Button color="primary"onClick={onOpenModal}>
                      Add Vendor
                    </Button> */}
                </div>
                <div className="clearfix"></div>
                <div id="basicScenario" className="product-physical">
                  <div className="promo-code-list">
                    {featuredSection} Page Coming Soon
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
