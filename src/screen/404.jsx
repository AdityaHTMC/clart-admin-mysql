import { Card, CardBody, Col, Container, Row } from "reactstrap"
import CommonBreadcrumb from "../component/common/bread-crumb"


export const NotFound = () => {
    return (
        <div>
            <CommonBreadcrumb title="" parent="" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                            <CardBody></CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}