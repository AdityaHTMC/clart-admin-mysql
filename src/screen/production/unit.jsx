import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { useMasterContext } from "../../helper/MasterProvider"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FaEdit } from "react-icons/fa"
import { LoadingComponent } from "../../component/common/loading"

export const Unit = () => {
    const { getUnitList, unitList, create_unit, edit_unit } = useMasterContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [unitDetail, setUnitDetail] = useState(null)
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTitle(unitDetail?.title || '')
    }, [unitDetail])

    useEffect(() => {
        if (unitList.data.length === 0 && unitList.loading === true) {
            getUnitList()
        }
    }, [unitList.data])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (title === '') return toast.info("Unit name can not be empty")
        setIsProcessing(true)
        let res;
        if (isEditing) {
            res = await edit_unit(unitDetail.id, { title })
        } else {
            res = await create_unit({ title })
        }
        setIsProcessing(false)
        if (res?.success === true) {
            toast.success(res.message)
            setTitle('')
            setIsOpen(false)
            getUnitList({ page: 1, limit: 20 })
        } else {
            toast.error(res?.message || "Unit can not be created")
        }
    }

    return (
        <>
            <CommonBreadcrumb title="Units Management" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Unit Management" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={() => { setIsOpen(true); setIsEditing(false); setUnitDetail(null); }}>
                                        Add Unit
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="px-sm-3">
                                    <Table responsive hover borderless align="center" >
                                        <thead className="border-bottom border-top py-4" >
                                            <tr>
                                                <th>REF</th>
                                                <th className="text-center">TITLE</th>
                                                <th className="text-center">TOTAL ROOMS</th>
                                                <th className="text-end">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!unitList.loading && unitList?.data?.map((item, i) => (
                                                <tr key={i}>
                                                    <td><Badge >#{item?.ref}</Badge></td>
                                                    <td className="text-center">{item?.title}</td>
                                                    <td className="text-center">{item?.total_rooms}</td>
                                                    <td className="d-flex gap-2 justify-content-end align-items-center">
                                                        <Badge
                                                            color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setIsEditing(true); setUnitDetail(item); setIsOpen(true); }}
                                                        >
                                                            <FaEdit style={{ fontSize: 14 }} />
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {!unitList.loading && unitList?.data?.length === 0 && (
                                        <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                                    )}
                                    {unitList.loading && <LoadingComponent />}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={setIsOpen}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        {isEditing ? `Edit ${unitDetail?.ref}` : "Add New Unit"}
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Unit Name :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter unit name" onChange={(e) => setTitle(e.target.value)} value={title} disabled={isProcessing} />
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