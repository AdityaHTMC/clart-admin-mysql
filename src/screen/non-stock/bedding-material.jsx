import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { useMasterContext } from "../../helper/MasterProvider"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FaEdit } from "react-icons/fa"
import { LoadingComponent } from "../../component/common/loading"

export const BeddingMaterial = () => {
    const { getMaterialList, material, create_material, edit_material } = useMasterContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [materialDetail, setMaterialDetail] = useState(null)
    const [title, setTitle] = useState('')
    const [stock, setStock] = useState('')

    useEffect(() => {
        setTitle(materialDetail?.title || '')
        setStock(materialDetail?.stock || '')
    }, [materialDetail])

    useEffect(() => {
        if (material.data.length === 0 && material.loading === true) {
            getMaterialList()
        }
    }, [material.data])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (title === '') return toast.info("Material name can not be empty")
        setIsProcessing(true)
        let res;
        if (isEditing) {
            res = await edit_material(materialDetail._id, { title, stock })
        } else {
            res = await create_material({ title, stock })
        }
        setIsProcessing(false)
        if (res?.success === true) {
            toast.success(res.message)
            setTitle('')
            setStock('')
            setIsOpen(false)
            getMaterialList({ page: 1, limit: 20 })
        } else {
            toast.error(res?.message || "Material can not be created")
        }
    }

    return (
        <>
            <CommonBreadcrumb title="Bedding Material" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Unit Management" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={() => { setIsOpen(true); setIsEditing(false); setMaterialDetail(null); }}>
                                        Add Bedding Material
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="px-sm-3">
                                    <Table responsive hover borderless align="center" >
                                        <thead className="border-bottom border-top py-4" >
                                            <tr>
                                                <th>Serial No</th>
                                                <th className="text-center">TITLE</th>
                                                <th className="text-center">STOCK</th>
                                                <th className="text-end">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!material.loading && material?.data?.map((item, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <Badge color="danger">#{i+1}</Badge>
                                                    </td>
                                                    <td className="text-center">{item?.title}</td>
                                                    <td className="text-center">{item?.stock}</td>
                                                    <td className="d-flex gap-2 justify-content-end align-items-center">
                                                        <Badge
                                                            color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setIsEditing(true); setMaterialDetail(item); setIsOpen(true); }}
                                                        >
                                                            <FaEdit style={{ fontSize: 14 }} />
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {!material.loading && material?.data?.length === 0 && (
                                        <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                                    )}
                                    {material.loading && <LoadingComponent />}
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
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Material Name :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter material name" onChange={(e) => setTitle(e.target.value)} value={title} disabled={isProcessing} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Stock :
                            </Label>
                            <Input type="number" required min={0} placeholder="Enter stock" onChange={(e) => setStock(e.target.value)} value={stock} disabled={isProcessing} />
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