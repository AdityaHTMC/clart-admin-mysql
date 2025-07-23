import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
} from "reactstrap";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";

import { Spinner } from "reactstrap";
import { useMasterContext } from "../../helper/MasterProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";

const LocationManagement = () => {
    const navigate = useNavigate();

    const { getCountryList, countryList, addCountry, editCountry, CountryDelete } = useMasterContext();

    const [formData, setFormData] = useState({
        country_name: "",
        iso_code: "",
    });

    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [selectedvarity, setSelectedvarity] = useState({
        country_name: "",
        iso_code: "",
        id: "",
    });

    useEffect(() => {
        getCountryList();
    }, []);

    const onOpenModal = () => {
        setOpen(true);
    };

    const onOpenModal1 = (product) => {
        setModalOpen(true);
        setSelectedvarity(product);
    };

    const handleState = (id) => {
        navigate(`/state-management/${id}`);
    };

    // Close the modal
    const onCloseModal2 = () => {
        setModalOpen(false);
        setSelectedvarity({ title: "", image: "", _id: "" });
    };

    const onCloseModal = () => {
        setOpen(false);
    };



    // Handle form input change
    const handleInputChanges = (e) => {
        const { name, value } = e.target;
        setSelectedvarity((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle submit for updating the brand
    const handleSubmits = () => {
        editCountry(selectedvarity.id, selectedvarity);
        onCloseModal2();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you wish to delete this ?")) {
            CountryDelete(id);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    // Handle form submission
    const handleSubmit = () => {
        addCountry(formData);
        onCloseModal();
    };

    return (
        <>
            <CommonBreadcrumb title="State List" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Product Sub Categoty" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={onOpenModal}>
                                        Add Country
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    <Table striped responsive>
                                        <thead>
                                            <tr>
                                                <th>Country Name</th>
                                                <th>Iso Code</th>
                                                <th>View States</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {countryList?.loading ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        <Spinner color="secondary" className="my-4" />
                                                    </td>
                                                </tr>
                                            ) : countryList?.data?.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        No Data Found
                                                    </td>
                                                </tr>
                                            ) : (
                                                countryList?.data?.map((product, index) => (
                                                    <tr key={index}>
                                                        <td>{product?.country_name}</td>
                                                        <td>{product?.iso_code}</td>
                                                        <td>   <div className="circelBtnBx">
                                                            <Button
                                                                className="btn"
                                                                color="link"
                                                                onClick={() => handleState(product.country_name)}
                                                            >
                                                                <BsFillEyeFill />
                                                            </Button>
                                                        </div></td>
                                                        <td>
                                                            <div className="circelBtnBx">
                                                                <Button
                                                                    className="btn"
                                                                    color="link"
                                                                    onClick={() => onOpenModal1(product)}
                                                                >
                                                                    <FaEdit />
                                                                </Button>
                                                                <Button
                                                                    className="btn"
                                                                    color="link"
                                                                    onClick={() => handleDelete(product.id)}
                                                                >
                                                                    <FaTrashAlt />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal
                isOpen={open}
                toggle={onCloseModal}
                className="modal-xg" // Increases the width
            >
                <ModalHeader toggle={onCloseModal}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        Add Country
                    </h5>
                </ModalHeader>
                <ModalBody>
                    {" "}
                    {/* Scroll in Y-axis */}
                    <Form>
                        <FormGroup>
                            <Label htmlFor="country_name" className="col-form-label">
                                Country Name
                            </Label>
                            <Input
                                type="text"
                                name="country_name"
                                value={formData.country_name}
                                onChange={handleInputChange}
                                id="country_name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="iso_code" className="col-form-label">
                                Iso Code
                            </Label>
                            <Input
                                type="text"
                                name="iso_code"
                                value={formData.iso_code}
                                onChange={handleInputChange}
                                id="iso_code"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={modalOpen}
                toggle={onCloseModal2}
                className="modal-xg"
            >
                <ModalHeader toggle={onCloseModal2}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        Edit Country
                    </h5>
                </ModalHeader>
                <ModalBody style={{ maxHeight: "450px", overflowY: "auto" }}>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="country_name" className="col-form-label">
                                Country Name
                            </Label>
                            <Input
                                type="text"
                                name="country_name"
                                value={selectedvarity.country_name}
                                onChange={handleInputChanges}
                                id="country_name"
                            />
                        </FormGroup>
                    </Form>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="iso_code" className="col-form-label">
                                Iso Code
                            </Label>
                            <Input
                                type="text"
                                name="iso_code"
                                value={selectedvarity.iso_code}
                                onChange={handleInputChanges}
                                id="iso_code"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmits}>
                        Save
                    </Button>
                    <Button color="secondary" onClick={onCloseModal2}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default LocationManagement;
