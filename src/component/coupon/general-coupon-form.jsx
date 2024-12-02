import { Col, Form, Row, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";
// import GeneFormTop from "./GeneralFormTop";

const GeneralCouponForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDate = (date) => {
        setStartDate(date);
    };

    const handleEndDate = (date) => {
        setEndDate(date);
    };

    return (
        <Form className="needs-validation" noValidate>
            <h4>General</h4>
            <Row>
                <Col sm="12">
                    <FormGroup>
                        <Row>
                            <Col xl="3" md="4">
                                <Label>* Name</Label>
                            </Col>
                            <Col md="7">
                                <Input id="validationCustom0" type="text" required />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xl="3" md="4">
                                <Label>* Code</Label>
                            </Col>
                            <Col md="7">
                                <Input id="validationCustom1" type="text" required />
                            </Col>
                            <div className="valid-feedback">Please Provide a Valid Coupon Code.</div>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xl="3" md="4">
                                <Label>Start Date</Label>
                            </Col>
                            <Col md="7">
                                <DatePicker selected={startDate} onChange={handleStartDate} />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xl="3" md="4">
                                <Label>End Date</Label>
                            </Col>
                            <Col md="7">
                                <DatePicker selected={endDate} onChange={handleEndDate} />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xl="3" md="4">
                                <Label>Free Shipping</Label>
                            </Col>
                            <Col md="7">
                                <Label className="d-block">
                                    <Input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                    Allow Free Shipping
                                </Label>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xl="3" md="4">
                                <Label>Quantity</Label>
                            </Col>
                            <Col md="7">
                                <Input type="number" required />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xl="3" md="4">
                                <Label>Discount Type</Label>
                            </Col>
                            <Col md="7">
                                <select className="form-select" required>
                                    <option value="">--Select--</option>
                                    <option value="1">Percent</option>
                                    <option value="2">Fixed</option>
                                </select>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xl="3" md="4">
                                <Label>Status</Label>
                            </Col>
                            <Col md="7">
                                <Label className="d-block">
                                    <Input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                    Enable the Coupon
                                </Label>
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
};

export default GeneralCouponForm;
