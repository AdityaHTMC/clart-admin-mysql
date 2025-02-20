import { useAppSelector } from "../../Redux/Hooks";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
    const { sidebar } = useAppSelector((store) => store.LayoutReducer);
    const currentYear = new Date().getFullYear();

    return (
        <div>
            <footer className={`footer ${sidebar && "open"}`}>
                <Container fluid>
                    <Row>
                        <Col md="6" className="footer-copyright">
                            <p className="mb-0">Clart | Copyright © {currentYear} All Rights Reserved</p>
                        </Col>
                        <Col md="6">

                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default Footer;