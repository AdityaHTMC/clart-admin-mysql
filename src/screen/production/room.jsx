import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { useMasterContext } from "../../helper/MasterProvider"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { LoadingComponent } from "../../component/common/loading"
import { toast } from "react-toastify"
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material"
import { useAuthContext } from "../../helper/AuthProvider"

export const RoomPage = () => {
    const { getRoomList, roomList, create_room, edit_room, getAllUnit, allUnit } = useMasterContext()
    const { subAdminList, getSubAdminList } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [roomDetail, setRoomDetail] = useState(null)
    const [title, setTitle] = useState('')
    const [unit, setUnit] = useState('')

    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const { target: { value } } = event;
        // let arr = []
        // console.log(value)
        // value?.forEach(element => {
        //     const name = subAdminList?.data?.find((item) => item._id === element)
        //     if(name && name?._id){
        //         arr.push({id: element, name: name?.name})
        //     }
        // });
        // console.log(arr)
        // setSelectedManager(arr);
        setPersonName(value || []);
    };

    useEffect(() => {
        if (roomList.data.length === 0 && roomList.loading === true) {
            getRoomList()
        }
    }, [roomList.data])

    useEffect(() => {
        if (subAdminList?.data?.length === 0 && subAdminList.loading === true) {
            getSubAdminList({ limit: 100 })
        }
    }, [subAdminList.data])

    useEffect(() => {
        if (!isEditing && isOpen && allUnit.length === 0) {
            getAllUnit()
        }
    }, [isOpen, isEditing, allUnit])


    useEffect(() => {
        setTitle(roomDetail?.title || '')
        if(subAdminList?.data?.length > 0 && roomDetail?.managers?.length > 0){
            const managerIds = roomDetail?.managers?.map((manager) => manager.admin_id)
            const managers = subAdminList?.data?.filter((subAdmin) => managerIds.includes(subAdmin._id))
            setPersonName(managers?.map((manager) => manager.email))
        }
    }, [roomDetail, subAdminList])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (title === '') return toast.info("Unit name can not be empty")
        if (personName.length === 0) return toast.info("please select at least one manager")

        let managers = []
        subAdminList?.data?.forEach((subAdmin) => { 
            if(personName.includes(subAdmin.email)){
                managers.push({admin_id: subAdmin._id})
            }
        })
        
        setIsProcessing(true)
        let res;
        if (isEditing) {
            res = await edit_room(roomDetail._id, { title, managers })
        } else {
            res = await create_room({ title, unit_id: unit, managers })
        }
        setIsProcessing(false)
        if (res?.success === true) {
            toast.success(res.message)
            setTitle('')
            setIsOpen(false)
            getRoomList({ page: 1, limit: 20 })
        } else {
            toast.error(res?.message || "Room can not be created")
        }
    }

    return (
        <>
            <CommonBreadcrumb title="Rooms Management" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Unit Management" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={() => { setIsEditing(false); setRoomDetail(null); setIsOpen(true); }}>
                                        Add Room
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="px-sm-3">
                                    <Table responsive hover borderless align="center" >
                                        <thead className="border-bottom border-top py-4" >
                                            <tr>
                                                <th>REF</th>
                                                <th className="text-center">TITLE</th>
                                                <th className="text-center">Unit Name</th>
                                                <th className="text-center">TOTAL Floors</th>
                                                <th className="text-center">TOTAL Managers</th>
                                                <th className="text-end">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!roomList.loading && roomList?.data?.map((item, i) => (
                                                <tr key={i}>
                                                    <td><Badge >#{item?.ref}</Badge></td>
                                                    <td className="text-center">{item?.title}</td>
                                                    <td className="text-center">{item?.unit_name}</td>
                                                    <td className="text-center">{item?.total_floor}</td>
                                                    <td className="text-center">{item?.managers?.length || 0}</td>
                                                    <td className="d-flex gap-2 justify-content-end align-items-center">
                                                        <Badge
                                                            color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setIsEditing(true); setRoomDetail(item); setIsOpen(true); }}
                                                        >
                                                            <FaEdit style={{ fontSize: 14 }} />
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {!roomList.loading && roomList?.data?.length === 0 && (
                                        <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No data found</p>
                                    )}
                                    {roomList.loading && <LoadingComponent />}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={setIsOpen}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        {isEditing ? `Edit ${roomDetail?.ref}` : "Add New Unit"}
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        {!isEditing && (
                            <FormGroup>
                                <Label for="exampleSelect">
                                    Select Unit
                                </Label>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    type="select"
                                >
                                    <option value={''}>
                                        select unit
                                    </option>
                                    {allUnit.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.title} ({unit.ref})
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Room Name :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter room name" onChange={(e) => setTitle(e.target.value)} value={title} disabled={isProcessing} />
                        </FormGroup>

                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-multiple-chip-label">Managers</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {subAdminList?.data?.map((emp) => (
                                    <MenuItem
                                        key={emp._id}
                                        value={emp.email}
                                    >
                                        {emp.email}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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