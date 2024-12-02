import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { FaEdit } from "react-icons/fa"
import { LoadingComponent } from "../../component/common/loading"
import { useAuthContext } from "../../helper/AuthProvider"

export const PermissionManagement = () => {
    const { getPermissionList, permissionList, create_permission, update_permission } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [permissionDetail, setPermissionDetail] = useState(null)
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTitle(permissionDetail?.title || '')
    }, [permissionDetail])

    useEffect(() => {
        if (permissionList.data.length === 0 && permissionList.loading === true) {
            getPermissionList()
        }
    }, [permissionList.data])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (title === '') return toast.info("Permission name can not be empty")
        setIsProcessing(true)
        let res;
        if (isEditing) {
            res = await update_permission(permissionDetail._id, { title })
        } else {
            res = await create_permission({ title })
        }
        setIsProcessing(false)
        if (res?.success === true) {
            toast.success(res.message)
            setTitle('')
            setIsOpen(false)
            getPermissionList({ page: 1, limit: 20 })
        } else {
            toast.error(res?.message || "Permission can not be created")
        }
    }

    return (
        <>
            <CommonBreadcrumb title="Permission Management" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Unit Management" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={() => { setIsOpen(true); setIsEditing(false); setPermissionDetail(null); }}>
                                        Add Permission
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="px-sm-3">
                                    <Table responsive hover borderless align="center" >
                                        <thead className="border-bottom border-top py-4" >
                                            <tr>
                                                <th >Title</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!permissionList.loading && permissionList?.data?.map((item, i) => (
                                                <tr key={i}>
                                                    <td><Badge >{item.title}</Badge></td>
                                                    <td className="d-flex gap-2 align-items-center">
                                                        <Badge
                                                            color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setIsEditing(true); setPermissionDetail(item); setIsOpen(true); }}
                                                        >
                                                            <FaEdit style={{ fontSize: 14 }} />
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {!permissionList.loading && permissionList?.data?.length === 0 && (
                                        <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                                    )}
                                    {permissionList.loading && <LoadingComponent />}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={setIsOpen}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        {isEditing ? `Edit ${permissionDetail?.ref}` : "Add New Permission"}
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Permission Name :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter permission name" onChange={(e) => setTitle(e.target.value)} value={title} disabled={isProcessing} />
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