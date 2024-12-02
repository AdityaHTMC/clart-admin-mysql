import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { useMasterContext } from "../../helper/MasterProvider"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FaEdit } from "react-icons/fa"
import { LoadingComponent } from "../../component/common/loading"
import { useColonyContext } from "../../helper/ColonyProvider"
import { Autocomplete, TextField } from "@mui/material"

export const PackingBox = () => {
    const { getPackingBoxList, packingBox, create_packing_box, edit_packing_box } = useMasterContext()
    const { allSpecies, getAllSpecies } = useColonyContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [packingDetail, setPackingDetail] = useState(null)
    const [initialData, setInitialData] = useState({ title: '', stock: '', capacity: '', price: '', species_id: '', })

    useEffect(() => {
        if (allSpecies.length === 0) {
            getAllSpecies()
        }
    }, [allSpecies])

    useEffect(() => {
        setInitialData({
            title: packingDetail?.title || '',
            stock: packingDetail?.stock || '',
            capacity: packingDetail?.capacity || '',
            price: packingDetail?.price || '',
            species_id: packingDetail?.species_id || '',
        })
    }, [packingDetail])

    const onChange = (e) => {
        setInitialData({ ...initialData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (packingBox.data.length === 0 && packingBox.loading === true) {
            getPackingBoxList()
        }
    }, [packingBox.data])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (initialData.title === '') return toast.info("Packing box name can not be empty")
        if (!initialData.species_id) return toast.info("species required")
        setIsProcessing(true)
        let res;
        if (isEditing) {
            res = await edit_packing_box(packingDetail._id, initialData)
        } else {
            res = await create_packing_box(initialData)
        }
        setIsProcessing(false)
        if (res?.success === true) {
            toast.success(res.message)
            setInitialData({
                title: '',
                stock: '',
                capacity: '',
                price: '',
                species_id: '',
            })
            setIsOpen(false)
            getPackingBoxList({ page: 1, limit: 20 })
        } else {
            toast.error(res?.message || "Packing box can not be created")
        }
    }

    return (
        <>
            <CommonBreadcrumb title="Packing Box" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Unit Management" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={() => { setIsOpen(true); setIsEditing(false); setPackingDetail(null); }}>
                                        Add Packing Box
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="px-sm-3">
                                    <Table responsive hover borderless align="center" >
                                        <thead className="border-bottom border-top py-4" >
                                            <tr>
                                                <th className="">TITLE</th>
                                                <th className="text-center">CAPACITY</th>
                                                <th className="text-center">SPECIES</th>
                                                <th className="text-center">PRICE</th>
                                                <th className="text-center">STOCK</th>
                                                <th className="text-end">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!packingBox.loading && packingBox?.data?.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="">{item?.title}</td>
                                                    <td className="text-center">{item?.capacity}</td>
                                                    <td className="text-center">{item?.capacity}</td>
                                                    <td className="text-center">{item?.species_name}</td>
                                                    <td className="text-center">{item?.stock}</td>
                                                    <td className="d-flex gap-2 justify-content-end align-items-center">
                                                        <Badge
                                                            color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setIsEditing(true); setPackingDetail(item); setIsOpen(true); }}
                                                        >
                                                            <FaEdit style={{ fontSize: 14 }} />
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {!packingBox.loading && packingBox?.data?.length === 0 && (
                                        <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                                    )}
                                    {packingBox.loading && <LoadingComponent />}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={setIsOpen}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        {isEditing ? `Edit Bedding Material` : "Add New Bedding Material"}
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <Autocomplete
                            disablePortal
                            options={allSpecies}
                            style={{ paddingTop: '16px' }}
                            disabled={isProcessing}
                            value={allSpecies?.find((sp) => sp._id === initialData.species_id) || ''}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setInitialData({ ...initialData, species_id: newValue._id });
                                } else {
                                    setInitialData({ ...initialData, species_id: '' });
                                }
                            }}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Select animal" />}
                        />
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Packing box name :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter packing box name" onChange={onChange} value={initialData.title} name="title" disabled={isProcessing} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Stock :
                            </Label>
                            <Input type="number" required min={0} placeholder="Enter stock" onChange={onChange} name="stock" value={initialData.stock} disabled={isProcessing} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Packing box capacity :
                            </Label>
                            <Input type="number" required min={1} placeholder="Enter packing box capacity" onChange={onChange} value={initialData.capacity} name="capacity" disabled={isProcessing} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Packing box price :
                            </Label>
                            <Input type="number" required min={0} placeholder="Enter packing box price" onChange={onChange} name="price" value={initialData.price} disabled={isProcessing} />
                        </FormGroup>
                        <ModalFooter className="px-0">
                            <Button size="sm" type="submit" color="primary" disabled={isProcessing}>
                                Save
                            </Button>
                            <Button size="sm" type="button" color="secondary" onClick={() => setIsOpen(false)} disabled={isProcessing}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}