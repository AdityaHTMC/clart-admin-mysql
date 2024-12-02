import { Badge, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { Fragment, useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { LoadingComponent } from "../../component/common/loading"
import { toast } from "react-toastify"
import { useAuthContext } from "../../helper/AuthProvider"
// import { UnitTable } from "../../component/table/unit-table"

export const RoleManagement = () => {
    const { getRolesList, rolesList, create_role, update_role, getAllPermission, allPermission, role_detail } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [roleDetail, setRoleDetail] = useState(null)
    const [role, setRole] = useState('')
    const [permissions, setPermissions] = useState([])

    const actions = ['view', 'create', 'update', 'delete']

    useEffect(() => {
        if (rolesList.data.length === 0) {
            getRolesList()
        }
    }, [rolesList.data])

    useEffect(() => {
        const fetchDetail = async () => {
            const data = await role_detail(roleDetail._id)
            if (data.success) {
                setRole(roleDetail?.role || '')
                let p = []
                data.data?.forEach((el) => {
                    p.push({ permission_id: el.permission_id, actions: el.actions})
                })
                setPermissions(p)
            } else {
                toast.error(data.message)
                setRoleDetail(null)
                setIsEditing(false)
                setIsOpen(false)
            }
        }
        if (roleDetail?._id && roleDetail?.total_permission > 0) {
            fetchDetail()
        }else {
            setRole(roleDetail?.role || '')
        }
    }, [roleDetail])

    useEffect(() => {
        if (isOpen && allPermission.length === 0) {
            getAllPermission()
        }
    }, [isOpen, isEditing, allPermission])

    const onPermissionChange = (e, permission_id) => {
        setPermissions(e.target.checked ? [...permissions, { permission_id, actions: [] }] : permissions.filter((p) => p.permission_id?.toString() !== permission_id?.toString()))
    }

    const onActionChange = (e, permission_id, action) => {
        setPermissions((prevPermissions) => {
            const permissionIndex = prevPermissions.findIndex((p) => p.permission_id === permission_id);

            if (permissionIndex > -1) {
                // If the permission_id already exists
                const updatedActions = e.target.checked
                    ? [...prevPermissions[permissionIndex].actions, action] // Add action
                    : prevPermissions[permissionIndex].actions.filter((a) => a !== action); // Remove action

                // Update the specific permission object
                const updatedPermissions = [...prevPermissions];
                updatedPermissions[permissionIndex] = {
                    ...updatedPermissions[permissionIndex],
                    actions: updatedActions,
                };

                return updatedPermissions;
            } else {
                // If the permission_id does not exist, add it with the new action
                return [...prevPermissions, { permission_id, actions: [action] }];
            }
        });
    };

    const getActionCheckedStatus = (permission_id, action) => {
        const permission = permissions.find((p) => p.permission_id === permission_id);
        return permission ? permission?.actions?.includes(action) : false;
    };


    const onSubmit = async () => {
        if (role === '') return toast.info("Role name can not be empty")
        setIsProcessing(true)
        let res;
        if (isEditing) {
            res = await update_role(roleDetail._id, {role, permissions})
        } else {
            res = await create_role({ role, permissions })
        }
        setIsProcessing(false)
        if (res?.success === true) {
            toast.success(res.message)
            setIsOpen(false)
            setPermissions([])
            setRole('')
            getRolesList({ page: 1, limit: 20 })
        } else {
            toast.error(res?.message || "Role can not be created")
        }
    }

    return (
        <>
            <CommonBreadcrumb title="Roles Management" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            {/* <CommonCardHeader title="Unit Management" /> */}
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary" onClick={() => { setIsEditing(false); setRoleDetail(null); setIsOpen(true); }}>
                                        Add Role
                                    </Button>
                                </div>
                                <div className="clearfix"></div>
                                <div className="px-sm-3">
                                    <Table responsive hover borderless align="center" >
                                        <thead className="border-bottom border-top py-4" >
                                            <tr>
                                                <th>Role</th>
                                                <th className="text-center">Total Permission</th>
                                                <th className="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!rolesList.loading && rolesList?.data?.map((item, i) => (
                                                <tr key={i}>
                                                    <td><Badge >{item?.role}</Badge></td>
                                                    <td className="text-center">{item?.total_permission || 0}</td>
                                                    <td className="d-flex gap-2 justify-content-end align-items-center">
                                                        <Badge
                                                            color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => { setIsEditing(true); setRoleDetail(item); setIsOpen(true); }}
                                                        >
                                                            <FaEdit style={{ fontSize: 14 }} />
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    {!rolesList.loading && rolesList?.data?.length === 0 && (
                                        <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No data found</p>
                                    )}
                                    {rolesList.loading && <LoadingComponent />}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={isOpen} toggle={setIsOpen}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">
                        {isEditing ? `Edit Role` : "Add Role"}
                    </h5>
                </ModalHeader>
                <ModalBody style={{ maxHeight: '60vh' }} className="overflow-overflow-y-scroll">
                    <div>
                        <FormGroup>
                            <Label htmlFor="recipient-name" className="col-form-label">
                                Role Name :
                            </Label>
                            <Input type="text" required min={3} placeholder="Enter role name" value={role} onChange={(e) => setRole(e.target.value)} disabled={isProcessing} />
                        </FormGroup>
                        <div className="d-flex flex-column gap-3">
                            {allPermission.map((item, i) => (
                                <div key={i}>
                                    <Input type="checkbox" className="checkbox_animated" id={item.title}
                                        checked={permissions.some((p) => p.permission_id === item._id)}
                                        onChange={(e) => onPermissionChange(e, item._id)}
                                    />
                                    <Label htmlFor={item.title} className="col-form-label p-0" style={{ fontWeight: 600 }}>
                                        {item.title}
                                    </Label>
                                    {permissions.some((p) => p.permission_id === item._id) && (
                                        <div className="d-flex gap-3 mt-3 mx-3">
                                            {actions.map((el, index) => (
                                                <div key={index} className="mb-0">
                                                    <Input
                                                        type="checkbox"
                                                        className="checkbox_animated"
                                                        id={`${el}-${index}`}
                                                        checked={getActionCheckedStatus(item._id, el)} // Check if the action exists for the permission_id
                                                        onChange={(e) => onActionChange(e, item._id, el)} // Handle action change
                                                    />
                                                    <Label className="" htmlFor={`${el}-${index}`} style={{ textTransform: "capitalize" }}>
                                                        {el}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" disabled={isProcessing} onClick={onSubmit}>
                        Save
                    </Button>
                    <Button size="sm" type="button" color="secondary" onClick={() => setIsOpen(false)} disabled={isProcessing}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}