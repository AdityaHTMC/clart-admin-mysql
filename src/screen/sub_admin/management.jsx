import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { LoadingComponent } from "../../component/common/loading"
import { toast } from "react-toastify"
import { useAuthContext } from "../../helper/AuthProvider"
// import { UnitTable } from "../../component/table/unit-table"

export const SubAdminManagement = () => {
    const { getSubAdminList, subAdminList, create_sub_admin, update_sub_admin, allRoles, getAllRoles } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [adminDetail, setAdminDetail] = useState(null)
    const [title, setTitle] = useState('')
    const [unit, setUnit] = useState('')

    useEffect(() => {
        if (subAdminList.data.length === 0 && subAdminList.loading === true) {
            getSubAdminList()
        }
    }, [subAdminList.data])

    useEffect(() => {
        if (isOpen && allRoles.length === 0) {
            getAllRoles()
        }
    }, [isOpen, allRoles])

    const onChange = (e) => {
        setAdminDetail({ ...adminDetail, [e.target.name]: e.target.value })
    }


    const onSubmit = async (e) => {
        e.preventDefault()
   
        setIsProcessing(true)
        let res;
        if (isEditing) {
            const body = {name: adminDetail.name, role_id: adminDetail.role_id}
            res = await update_sub_admin(adminDetail._id, body)
        } else {
            res = await create_sub_admin(adminDetail)
        }
        setIsProcessing(false)
        if (res?.success === true) {
            toast.success(res.message)
            setAdminDetail(null)
            setIsOpen(false)
            getSubAdminList({ page: 1, limit: 20 })
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
                                    <Button color="primary" onClick={() => { setIsEditing(false); setAdminDetail({}); setIsOpen(true); }}>
                                        Add Admin
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="px-sm-3">
                                    <Table responsive hover borderless align="center" >
                                        <thead className="border-bottom border-top py-4" >
                                            <tr>
                                                <th>Name</th>
                                                <th className="text-center">Mobile</th>
                                                <th className="text-center">Email</th>
                                                <th className="text-center">Role</th>
                                                <th className="text-end">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!subAdminList.loading && subAdminList?.data?.map((item, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <div className="d-flex gap-2 align-items-center">
                                                            <div className="media align-items-center">
                                                                {item.image && (
                                                                    <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={item.image} alt="header-user" />
                                                                )}
                                                            </div>
                                                            <span>{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{item?.mobile}</td>
                                                    <td className="text-center">{item?.email}</td>
                                                    <td className="text-center">
                                                        <Badge>{item?.role_name}</Badge>
                                                    </td>
                                                    <td className="d-flex gap-2 justify-content-end align-items-center">
                                                        <Badge
                                                            color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setIsEditing(true); setAdminDetail(item); setIsOpen(true); }}
                                                        >
                                                            <FaEdit style={{ fontSize: 14 }} />
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {!subAdminList.loading && subAdminList?.data?.length === 0 && (
                                        <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No data found</p>
                                    )}
                                    {subAdminList.loading && <LoadingComponent />}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={setIsOpen}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        {isEditing ? `Edit Sub Admin` : "Add Sub Admin"}
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Name :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter name" name="name" onChange={onChange} value={adminDetail?.name || ''} disabled={isProcessing} />
                        </FormGroup>
                        {!isEditing && (
                            <FormGroup>
                                <Label htmlFor="recipient-name" className="col-form-label">
                                    Email :
                                </Label>
                                <Input type="email" required placeholder="Enter email" name="email" onChange={onChange} value={adminDetail?.email || ''} disabled={isProcessing} />
                            </FormGroup>
                        )}
                        {!isEditing && (
                            <FormGroup>
                                <Label htmlFor="recipient-name" className="col-form-label">
                                    Mobile :
                                </Label>
                                <Input type="text" required placeholder="Enter mobile" name="mobile" onChange={onChange} value={adminDetail?.mobile || ''} disabled={isProcessing} />
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label for="exampleSelect">
                                Select Roles
                            </Label>
                            <Input
                                id="exampleSelect"
                                name="role_id"
                                value={adminDetail?.role_id || ''}
                                onChange={onChange}
                                disabled={isProcessing}
                                required
                                type="select"
                            >
                                <option value={''}>
                                    -- Select --
                                </option>
                                {allRoles.map((role) => (
                                    <option key={role._id} value={role._id}>
                                        {role.role}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        {!isEditing && (
                            <FormGroup>
                                <Label htmlFor="recipient-name" className="col-form-label">
                                    Password :
                                </Label>
                                <Input type="password" name="password" required placeholder="Enter password" onChange={onChange} value={adminDetail?.password || ''} disabled={isProcessing} />
                            </FormGroup>
                        )}
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