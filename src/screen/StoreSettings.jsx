/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
  FormGroup,
  Input,
  Label,
  Container,
  Card,
  CardBody,
  Button,
  Spinner,
} from "reactstrap";
import { toast } from "react-toastify";

import { useMasterContext } from "../helper/MasterProvider";
import CommonBreadcrumb from "../component/common/bread-crumb";

const StoreSettings = () => {
  const [details, setDetails] = useState(null);
  const { getSettingDetails, storeSetting, edit_store_setting } =
  useMasterContext();

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!storeSetting.data?.id) {
      getSettingDetails();
    }
    if (storeSetting.data?.id) {
      setDetails(storeSetting.data);
    }
  }, [storeSetting.data]);

  console.log(storeSetting, details , 'data')

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const data = await edit_store_setting(details);
    setIsProcessing(false);
    if (data && data.success) {
      toast.success("Store settings updated successfully");
      getSettingDetails();
    }
  };

  return (
    <>
      <CommonBreadcrumb title="Store Setting" parent="Home" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                {!storeSetting.loading && details && (
                  <div className="tab-pane fade active show">
                    <Form className="needs-validation" onSubmit={handleSubmit}>
                      <h4>Store Details</h4>
                      <Row>
                        <Col sm="12">
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Store Name</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="text"
                                  required
                                  name="store_name"
                                  value={details.store_name}
                                  onChange={onChange}
                                  placeholder="Enter store name"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Short Description</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="textarea"
                                  rows={3}
                                  name="store_description"
                                  value={details.store_description || ""}
                                  onChange={onChange}
                                  placeholder="Enter store descrition"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Default Curreny</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="text"
                                  name="default_currency"
                                  value={details.default_currency || ""}
                                  onChange={onChange}
                                  placeholder="Enter default currency"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Default Language</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="text"
                                  name="default_language"
                                  value={details.default_language || ""}
                                  onChange={onChange}
                                  placeholder="Enter default language"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Address</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="text"
                                  name="address"
                                  value={details.address || ""}
                                  onChange={onChange}
                                  placeholder="Enter address"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Support Email</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="email"
                                  required
                                  name="support_email"
                                  value={details.support_email || ""}
                                  onChange={onChange}
                                  placeholder="Enter support email"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Support Phone</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="text"
                                  required
                                  name="support_phone"
                                  value={details.support_phone || ""}
                                  onChange={onChange}
                                  placeholder="Enter support phone"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Gst Number</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="text"
                                  name="gst_number"
                                  value={details.gst_number || ""}
                                  onChange={onChange}
                                  placeholder="Enter gst number"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Cin Number</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="text"
                                  name="cin_number"
                                  value={details.cin_number || ""}
                                  onChange={onChange}
                                  placeholder="Enter cin number"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Facebook</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="url"
                                  name="facebook"
                                  value={details.facebook || ""}
                                  onChange={onChange}
                                  placeholder="Facebook url"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Instagram</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="url"
                                  name="instagram"
                                  value={details.instagram || ""}
                                  onChange={onChange}
                                  placeholder="Instagram url"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Twitter</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="url"
                                  name="twitter"
                                  value={details.twitter || ""}
                                  onChange={onChange}
                                  placeholder="Twitter url"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                          <FormGroup>
                            <Row>
                              <Col xl="3" md="4">
                                <Label>* Linkedin</Label>
                              </Col>
                              <Col md="7">
                                <Input
                                  type="url"
                                  name="linkedin"
                                  value={details.linkedin || ""}
                                  onChange={onChange}
                                  placeholder="Linkedin url"
                                />
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button type="submit" disabled={isProcessing}>
                        Save
                      </Button>
                    </Form>
                  </div>
                )}

                {storeSetting.loading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spinner color="secondary" className="my-4" />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StoreSettings;
