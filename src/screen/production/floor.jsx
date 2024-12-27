import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { useMasterContext } from "../../helper/MasterProvider"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { LoadingComponent } from "../../component/common/loading"
import { toast } from "react-toastify"

export const FloorPage = () => {
    const { getFloorList, floorList, create_floor, edit_floor, getAllRoom, allRoom } = useMasterContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [floorDetail, setFloorDetail] = useState(null)
    const [floorData, setFloorData] = useState({
        title: '',
        room_id: '',
        direction: '',
    })

    const onChange = (e) => {
        setFloorData({...floorData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if (floorList.data.length === 0 && floorList.loading === true) {
            getFloorList()
        }
    }, [floorList.data])

    useEffect(() => {
        if (!isEditing && isOpen && allRoom.length === 0) {
            getAllRoom()
        }
    }, [isOpen, isEditing, allRoom])


    useEffect(() => {
        console.log(floorDetail)
        setFloorData({
            title: floorDetail?.title || '',
            room_id: floorDetail?.room_id || '',
            direction: floorDetail?.direction || ''
        })
    }, [floorDetail])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (floorData.title === '') return toast.info("Unit name can not be empty")
     
        setIsProcessing(true)
        let res;
        if (isEditing) {
            res = await edit_floor(floorDetail.id, { title: floorData.title, direction: floorData.direction })
        } else {
            res = await create_floor(floorData)
        }
        setIsProcessing(false)
        if (res?.success === true) {
            toast.success(res.message)
            setFloorData({
                title: '',
                direction: '',
                room_id: ''
            })
            setIsOpen(false)
            getFloorList({ page: 1, limit: 20 })
        } else {
            toast.error(res?.message || "Room can not be created")
        }
    }

    return (
        <>
            <CommonBreadcrumb title="Floor Management" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Unit Management" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={() => { setIsEditing(false); setFloorDetail(null); setIsOpen(true); }}>
                                        Add Floor
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="px-sm-3">
                                    <Table responsive hover borderless align="center" >
                                        <thead className="border-bottom border-top py-4" >
                                            <tr>
                                                <th>REF</th>
                                                <th className="text-center">Title</th>
                                                <th className="text-center">Direction</th>
                                                <th className="text-center">Room Name</th>
                                                <th className="text-center">TOTAL RACKS</th>
                                                <th className="text-end">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!floorList.loading && floorList?.data?.map((item, i) => (
                                                <tr key={i}>
                                                    <td><Badge >#{item?.ref}</Badge></td>
                                                    <td className="text-center">{item?.title}</td>
                                                    <td className="text-center">{item?.direction}</td>
                                                    <td className="text-center">{item?.room_title}</td>
                                                    <td className="text-center">{item?.total_racks}</td>
                                                    <td className="d-flex gap-2 justify-content-end align-items-center">
                                                        <Badge
                                                            color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setIsEditing(true); setFloorDetail(item); setIsOpen(true); }}
                                                        >
                                                            <FaEdit style={{ fontSize: 14 }} />
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {!floorList.loading && floorList?.data?.length === 0 && (
                                        <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No data found</p>
                                    )}
                                    {floorList.loading && <LoadingComponent />}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={setIsOpen}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        {isEditing ? `Edit ${floorDetail?.ref}` : "Add New Unit"}
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        {!isEditing && (
                            <FormGroup>
                                <Label for="exampleSelect">
                                    Select Rooms
                                </Label>
                                <Input
                                    id="exampleSelect"
                                    name="room_id"
                                    value={floorData.room_id}
                                    onChange={onChange}
                                    type="select"
                                >
                                    <option value={''}>
                                        select room
                                    </option>
                                    {allRoom.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.title} ({room.ref})
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Floor name :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter floor name" name="title" onChange={onChange} value={floorData.title} disabled={isProcessing} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Floor Direction :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter floor direction" name="direction" onChange={onChange} value={floorData.direction} disabled={isProcessing} />
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