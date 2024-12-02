/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Row,
  Container,
} from 'reactstrap';
import CommonBreadcrumb from '../component/common/bread-crumb';
import { useCommonContext } from '../helper/CommonProvider';

const AddCoupon = () => {
  
  const { addPromoCode } = useCommonContext();

  const [formData, setFormData] = useState({
    selectShops: '',
    title: '',
    discountType: '',
    discount: '',
    min_order_amount: '',
    limit: '',
    max_discount_amount: '',
    start_date: '',
    startTime: '',
    expiry_date: '',
    expiredTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

      const combineDateTime = (date, time) => {
        if (date && time) {
          const combined = new Date(`${date}T${time}`);
          return combined.toISOString();
        }
        return null;
      };



  const handleSubmit = (e) => {
    e.preventDefault();
    const startDateISO = combineDateTime(formData.start_date, formData.startTime);
    const expiredDateISO = combineDateTime(formData.expiry_date, formData.expiredTime);
    
    console.log('Start Date (ISO):', startDateISO);
    console.log('Expired Date (ISO):', expiredDateISO);

    const dataToSend = {
      title: formData.title,
      discountType: formData.discountType,
      discount: formData.discount,
      min_order_amount: formData.min_order_amount,
      max_discount_amount: formData.max_discount_amount,
      limit: formData.limit,
      start_date: startDateISO,
      expiry_date: expiredDateISO,
    }

    addPromoCode(dataToSend)
    // You can add an API call here to submit the form data
  };

  return (
    <>
     <CommonBreadcrumb title="Add coupon" parent="Physical" />
    <Container className="mt-5">
      <div className="border p-4 rounded shadow-sm bg-white">
        <h4 className="mb-4"><i className="fa fa-plus-circle mr-2"></i>Add New Coupon</h4>
        <Form onSubmit={handleSubmit}>
          {/* <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="selectShops">Select shops</Label>
                <Input
                  type="select"
                  name="selectShops"
                  id="selectShops"
                  value={formData.selectShops}
                  onChange={handleChange}
                >
                  <option value="">Select shops</option>
                  <option value="Shop 1">Shop 1</option>
                  <option value="Shop 2">Shop 2</option>
                </Input>
              </FormGroup>
            </Col>
          </Row> */}
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="title">Coupon Code *</Label>
                <Input
                  type="text"
                  name="title"
                  id="couponCode"
                  placeholder="Coupon code"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="discountType">Discount Type *</Label>
                <Input
                  type="select"
                  name="discountType"
                  id="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  required
                >
                  <option>Amount</option>
                  <option>Percentage</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="discount">Discount *</Label>
                <Input
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount"
                  value={formData.discount}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="min_order_amount">Minimum Order Amount *</Label>
                <Input
                  type="number"
                  name="min_order_amount"
                  id="min_order_amount"
                  placeholder="Minimum Order Amount"
                  value={formData.min_order_amount}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="limit">Limit For Single User</Label>
                <Input
                  type="number"
                  name="limit"
                  id="limit"
                  placeholder="exm: 5"
                  value={formData.limit}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="max_discount_amount">Maximum Discount Amount</Label>
                <Input
                  type="text"
                  name="max_discount_amount"
                  id="max_discount_amount"
                  placeholder="exm: $300"
                  value={formData.max_discount_amount}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="start_date">Start Date *</Label>
                <Input
                  type="date"
                  name="start_date"
                  id="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="startTime">Start Time *</Label>
                <Input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="expiry_date">Expired Date *</Label>
                <Input
                  type="date"
                  name="expiry_date"
                  id="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="expiredTime">Expired Time *</Label>
                <Input
                  type="time"
                  name="expiredTime"
                  id="expiredTime"
                  value={formData.expiredTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex justify-content-between mt-4">
            <Button color="secondary" onClick={() => setFormData({})}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Container>
    </>
  );
};

export default AddCoupon;
