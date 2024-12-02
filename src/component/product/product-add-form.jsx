// import MDEditor from "@uiw/react-md-editor";
import { Fragment, useState } from "react";
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from "reactstrap";

const ProductAddForm = () => {
    const [dummyImages, setDummyImages] = useState(["user.png", "user.png", "user.png", "user.png", "user.png", "user.png"]);
    const [quantity, setQuantity] = useState(1);
    const [value, setValue] = useState("");

    const onChange = (e) => {
      setValue(e);
    };

    const handleImgChange = (e, i) => {
        e.preventDefault();
        let reader = new FileReader();
        const image = e.target.files && e.target.files[0];

        if (image) {
            reader.onload = () => {
                const updatedDummyImages = [...dummyImages];
                updatedDummyImages[i] = reader.result; // Ensure result is a string
                setDummyImages(updatedDummyImages);
            };

            reader.readAsDataURL(image);
        }
    };

    const IncrementItem = () => {
        if (quantity < 9) {
            setQuantity(quantity + 1);
        } else {
            return null;
        }
    };
    const DecreaseItem = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        } else {
            return null;
        }
    };
    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    return (
        <Fragment>
            {/*  */}
            <Col xl="5">
                <div className="add-product">
                    <Row>
                        <Col xl="9 " className="xl-50" sm="6" xs="9">
                            <div className="add-product-image">
                                <img src={`/assets/images/pro3/2.jpg`} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
                            </div>
                        </Col>
                        <Col xl="3" className="xl-50" xs="3" sm="6 ">
                            <ul className="file-upload-product">
                                {dummyImages.map((res, i) => {
                                    return (
                                        <li key={i}>
                                            <div className="box-input-file">
                                                <Input className="upload" type="file" onChange={(e) => handleImgChange(e, i)} />
                                                <img alt="" src={`/assets/images/dashboard/${res}`} style={{ width: 50, height: 50 }} />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Col>
            {/*  */}
            <Col xl="7">
                <div className="needs-validation add-product-form" onSubmit={() => {}}>
                    {/*  */}
                    <Form className=" form-label-center">
                        <FormGroup className=" mb-3">
                            <Row>
                                <Col xl="3" sm="4">
                                    <Label className="fw-bold mb-0">Product Name :</Label>
                                </Col>
                                <Col xl="8" sm="7">
                                    <Input name="product_name" id="validationCustom01" type="text" required />
                                </Col>
                            </Row>
                            <div className="valid-feedback">Looks good!</div>
                        </FormGroup>

                        <FormGroup className="mb-3 ">
                            <Row>
                                <Col xl="3" sm="4">
                                    <Label className="fw-bold mb-0">Price :</Label>
                                </Col>
                                <Col sm="7" xl="8">
                                    <Input className="mb-0" name="price" id="validationCustom02" type="number" required />
                                </Col>
                                <div className="valid-feedback">Looks good!</div>
                            </Row>
                        </FormGroup>

                        <FormGroup className=" mb-3">
                            <Row>
                                <Col xl="3" sm="4">
                                    <Label className="fw-bold mb-0">Product Code :</Label>
                                </Col>
                                <Col sm="7" xl="8">
                                    <Input name="product_code" id="validationCustomUsername" type="number" required />
                                </Col>
                                <div className="invalid-feedback offset-sm-4 offset-xl-3">Please choose Valid Code.</div>
                            </Row>
                        </FormGroup>
                    </Form>

                    <FormGroup className=" mb-3">
                        <Row>
                            <Col xl="3" sm="4">
                                <Label className=" fw-bold mb-0">Total Products :</Label>
                            </Col>
                            <fieldset className="qty-box ms-0">
                                <InputGroup className="bootstrap-touchspin">
                                    <div className="input-group-prepend">
                                        <Button color="primary" className=" btn-square bootstrap-touchspin-down" onClick={DecreaseItem}>
                                            <i className="fa fa-minus"></i>
                                        </Button>
                                    </div>
                                    <div className="input-group-prepend">
                                        <InputGroupText className="bootstrap-touchspin-prefix"></InputGroupText>
                                    </div>
                                    <Input className="touchspin" type="text" value={quantity} onChange={handleChange} />
                                    <div className="input-group-append">
                                        <InputGroupText className=" bootstrap-touchspin-postfix"></InputGroupText>
                                    </div>
                                    <div className="input-group-append ms-0">
                                        <Button color="primary" className="btn-square bootstrap-touchspin-up" onClick={IncrementItem}>
                                            <i className="fa fa-plus"></i>
                                        </Button>
                                    </div>
                                </InputGroup>
                            </fieldset>
                        </Row>
                    </FormGroup>

                    {/*  */}
                    <Form>
                        <FormGroup className=" mb-3">
                            <Row>
                                <Col xl="3" sm="4">
                                    <Label className="fw-bold mb-0">Select Size :</Label>
                                </Col>
                                <Col xl="8" sm="7">
                                    <select className="form-control digits" id="exampleFormControlSelect1">
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                        <option>Extra Large</option>
                                    </select>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup className=" mb-3 ">
                            <Row>
                                <Col xl="3" sm="4">
                                    <Label className="fw-bold">Add Description :</Label>
                                </Col>
                                <Col xl="8" sm="7" className=" description-sm">
                                    {/* <MDEditor value={value} onChange={onChange} /> */}
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>

                    <div className="offset-xl-3 offset-sm-4">
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                        <Button color="light">Discard</Button>
                    </div>
                </div>
            </Col>

        </Fragment>
    );
};

export default ProductAddForm;
