/* eslint-disable no-unused-vars */
import { Badge, Button, Card, CardBody, CardFooter, CardText, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";

import { Fragment, useEffect, useState } from "react";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import ReactQuill from "react-quill";
import { Plus, Upload } from "react-feather";
import { useCategoryContext } from "../../helper/CategoryProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CommonCardHeader from "../../component/common/card-header";
import { AiOutlineDelete } from "react-icons/ai";
import { useMasterContext } from "../../helper/MasterProvider";

export const AddAnimal = () => {
    const { addProduct, getproductList } = useCategoryContext();
    const { getAllSpeciesList , allspecies} = useMasterContext();
    const [formData, setFormData] = useState({ title: '', description: '', species_for: 'Lab', gov_price: '', non_gov_price: '', winning: '', calling: '', status: '', species_id: '', birth_cycle: '',})
    const [selectedImage, setSelectedImage] = useState(null);
    const [multipleImages, setMultipleImages] = useState([])
    const [files, setFiles] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [file, setFile] = useState(null)
    const Navigate = useNavigate()

    useEffect(() => {
        getAllSpeciesList()
    }, [])

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        const img = e.target.files[0];
        setFile(img)
        if (img) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(img);
        }
    };

    const handleMultipleChange = (e) => {
        const filesArr = Array.from(e.target.files);
        setFiles(files.concat(filesArr))
        const fileUrls = filesArr.map((file) => URL.createObjectURL(file));
        setMultipleImages(multipleImages.concat(fileUrls));
    }

    const removeImage = (i) => {
        setMultipleImages(multipleImages.filter((_, index) => index !== i))
        setFiles(files.filter((_, index) => index !== i))
    }

    const onReset = () => {
        setFormData({ title: '', description: '', species_for: 'Lab', gov_price: '', non_gov_price: '', winning: '', calling: '', status: '', species_id: '' })
        setSelectedImage(null);
        setMultipleImages([])
        setFiles([])
    }

    const onProductAdd = async () => {
        if (!formData.title) return toast.info('Animal name required');
        if (!formData.status) return toast.info('Status name required');
        if (!formData.winning) return toast.info('Winning name required');
        if (!formData.calling) return toast.info('Culling name required');
        if (!formData.species_id) return toast.info('species required');
        // if (!formData.birth_cycle) return toast.info('Birth cycle name required');

        var filesArr = [...files]
        if (file) {
            filesArr.unshift(file)
        }

        const bodyData = new FormData();

        for (let key in formData) {
            bodyData.append(key, formData[key]);
        }

        if (filesArr.length > 0) {
            for (let i = 0; i < filesArr.length; i++) {
                bodyData.append(`images[${i}]`, filesArr[i]);
            }
        }
        

   
     addProduct(bodyData)
      
    }

    return (
        <Fragment>
            <CommonBreadcrumb title="Add Animal" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody>
                                <Row className="product-adding product" >
                                    <Col md={4} >
                                        <Card className="p-3" style={{ background: '#ffffff' }}>
                                            <div className="position-relative product_image_box d-flex justify-content-center align-items-center flex-column gap-3" style={{ placeItems: 'center' }} >
                                                <input type="file" className="position-absolute top-0 z-3" style={{ opacity: 0, left: 0, width: '100%', height: '100%' }} onChange={handleImageChange} />

                                                {selectedImage ? (
                                                       <div className="p-2 position-relative" style={{ width: '100%', height: '100%' }}>
                                                       <img 
                                                           src={selectedImage} 
                                                           style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} 
                                                       />
                                                       <Badge 
                                                           className="position-absolute" 
                                                           color="warning" 
                                                           onClick={() => setSelectedImage(null)} 
                                                           style={{ cursor: 'pointer', top: 10, right: 10, zIndex:'9999' }}
                                                       >
                                                           <AiOutlineDelete size={16} />
                                                       </Badge>
                                                   </div>
                                                ) : (
                                                    <>
                                                        <Upload size={32} color="#000" />
                                                        <CardText className="">Upload Your File</CardText>
                                                    </>
                                                )}
                                            </div>
                                            <div className="d-flex overflow-x-scroll gap-2 mt-3" style={{}}>
                                                <div className="position-relative product_image_box_sm d-flex justify-content-center align-items-center flex-column gap-3" style={{ placeItems: 'center' }} >
                                                    <input type="file" multiple className="position-absolute top-0 z-3" style={{ opacity: 0, left: 0, width: '100%', height: '100%' }} onChange={handleMultipleChange} />
                                                    <Plus size={32} color="#ff8084" />
                                                </div>
                                                {multipleImages.map((image, i) => (
                                                    <div className="product_image_box_sm p-1 position-relative" key={i} style={{ borderColor: '#808080', borderStyle: 'solid' }}>
                                                        <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                                                        <Badge className="position-absolute" color="warning" onClick={() => removeImage(i)} style={{ cursor: 'pointer', top: 2, right: 2 }}>
                                                            <AiOutlineDelete size={12} />
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>
                                        <Card className="p-3">
                                            <div>
                                                <FormGroup>
                                                    <Label htmlFor="species_for" className="col-form-label">
                                                        Status :
                                                    </Label>
                                                    <select
                                                        className="form-select"
                                                        id="status"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={onChange}
                                                    >
                                                        <option value="''">-- Select --</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="category" className="col-form-label">
                                                        species:
                                                    </Label>
                                                    <Input
                                                        type="select"
                                                        name="species_id"
                                                        value={formData.species_id}
                                                        onChange={onChange}
                                                        id="species_id"
                                                    >
                                                        <option value="">-- Select --</option>
                                                        {allspecies?.data?.map((cat) => (
                                                            <option key={cat.id} value={cat.id}>
                                                                {cat.species}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </FormGroup>
                                                {/* <FormGroup>
                                                    <Label htmlFor="species_for" className="col-form-label">
                                                        Life Stage :
                                                    </Label>
                                                    <select
                                                        className="form-select"
                                                        id="birth_cycle"
                                                        name="birth_cycle"
                                                        value={formData.birth_cycle}
                                                        onChange={onChange}
                                                    >
                                                        <option value="''">-- Select --</option>
                                                        <option value="Kid">Kid</option>
                                                        <option value="Young">Young</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>

                                                </FormGroup> */}
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col md={8} >
                                        <Card className="px-3" style={{ background: '#ffffff' }}>
                                            <div>
                                                <FormGroup>
                                                    <Label htmlFor="title" className="col-form-label">
                                                        Title :
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="title"
                                                        placeholder="Enter animal name"
                                                        value={formData.title}
                                                        onChange={onChange}
                                                    />
                                                </FormGroup>

                                                <FormGroup>
                                                    <div className="mb-4">
                                                        <label htmlFor="description" className="form-label mb-1">
                                                            Description:
                                                        </label>
                                                        <ReactQuill
                                                            id="description"
                                                            name="description"
                                                            value={formData.description}
                                                            onChange={(value) => setFormData({ ...formData, description: value })}
                                                            theme="snow"
                                                            placeholder="Enter a detailed description"
                                                        />
                                                        <small className="form-text text-muted">
                                                            Describe your content in detail to attract viewers.
                                                        </small>
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="birth_cycle" className="col-form-label">
                                                      Birth Cycle :
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="birth_cycle"
                                                        placeholder="Enter Birth Cycle"
                                                        value={formData.birth_cycle}
                                                        onChange={onChange}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="title" className="col-form-label">
                                                        Winning Period In Days :
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        name="winning"
                                                        placeholder="Enter winning period in days"
                                                        value={formData.winning}
                                                        onChange={onChange}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label htmlFor="title" className="col-form-label">
                                                        Culling Period In Days :
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        name="calling"
                                                        placeholder="Enter calling period in days"
                                                        value={formData.calling}
                                                        onChange={onChange}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                    <Label className="d-block">
                                                        <Input
                                                            className="radio_animated" type="radio" name="species_for" value='Sell'
                                                            onChange={onChange}
                                                            checked={formData.species_for === 'Sell'}
                                                        />
                                                        For Sell
                                                    </Label>
                                                    <Label className="d-block mx-4">
                                                        <Input
                                                            className="radio_animated"
                                                            type="radio"
                                                            name="species_for"
                                                            value='Lab'
                                                            onChange={onChange}
                                                            checked={formData.species_for === "Lab"}
                                                        />
                                                        For Lab
                                                    </Label>
                                                    <Label className="d-block">
                                                        <Input
                                                            className="radio_animated"
                                                            type="radio"
                                                            name="species_for"
                                                            value='Both'
                                                            onChange={onChange}
                                                            checked={formData.species_for === "Both"}
                                                        />
                                                        For Both
                                                    </Label>
                                                </FormGroup>
                                                {formData.species_for !== 'Lab' && (
                                                    <>
                                                        <FormGroup>
                                                            <Label htmlFor="title" className="col-form-label">
                                                                Goverment Price :
                                                            </Label>
                                                            <Input
                                                                type="number"
                                                                name="gov_price"
                                                                placeholder="Enter goverment price"
                                                                value={formData.gov_price}
                                                                onChange={onChange}
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label htmlFor="title" className="col-form-label">
                                                                Non Goverment Price :
                                                            </Label>
                                                            <Input
                                                                type="number"
                                                                name="non_gov_price"
                                                                placeholder="Enter non goverment price"
                                                                value={formData.non_gov_price}
                                                                onChange={onChange}
                                                            />
                                                        </FormGroup>

                                                    </>
                                                )}
                                            </div>
                                            <CardFooter className="px-0 justify-content-end d-flex">
                                                <Button
                                                    type="button"
                                                    onClick={onReset}
                                                    className="mx-3"
                                                    disabled={isProcessing}
                                                >
                                                    Reset
                                                </Button>
                                                <Button type="button" color="primary" onClick={onProductAdd} disabled={isProcessing} >
                                                    Save
                                                </Button>

                                            </CardFooter>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
