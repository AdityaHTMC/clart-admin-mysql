import { Badge, Button, Card, CardBody, Col, Container, Row } from "reactstrap"
import CommonBreadcrumb from "../../component/common/bread-crumb"
import { useSettingContext } from "../../helper/SettingProvider"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../../component/common/loading"
import { FaEdit, FaPlus } from "react-icons/fa"
import { GoGrabber } from "react-icons/go";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { SubStoreMenu } from "./component/sub-store-menu"
import { toast } from "react-toastify"

export const StoreMenu = () => {

    const { getStoreMenu, storeMenu, reorderStoreMenu, reorderStoreSubMenu } = useSettingContext()
    const [isDrag, setIsDrag] = useState(false)

    const [MenuState, setMenuState] = useState([])

    useEffect(() => {
        if (storeMenu?.data?.length === 0 && storeMenu.loading === true) {
            getStoreMenu()
        }
    }, [storeMenu?.data])

    useEffect(() => {
        if (storeMenu?.data?.length > 0) {
            setMenuState(storeMenu.data)
        }
    }, [storeMenu?.data])

    function reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };


    const onEnd = async (result) => {
        const { destination, source, type } = result;

        if (!destination) { return; }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'menu') {
            const items = reorder(
                MenuState,
                source.index,
                destination.index,
            ).map((item, index) => ({ ...item, order: index + 1 }));
            setMenuState(items);

            let body = []
            items.forEach((item) => {
                body.push({_id: item._id, order: item.order })
            })
            setIsDrag(true)
            const res = await reorderStoreMenu(body)
            if(res.success){
                toast.success(res.message)
            }else {
                toast.error(res?.message || 'Reorder Failed')
            }
        }

        if (type === 'sub_menu') {
            let newSideBarData = [...MenuState];
            // Source and destination list
            const sourceList = newSideBarData.find(menu => menu?._id === source.droppableId);
            const destList = newSideBarData.find(menu => menu?._id === destination.droppableId);

            if (!sourceList || !destList) return
            // Check if cards exists on the sourceList
            if (!sourceList.sub_menu || sourceList.sub_menu?.length === 0) sourceList.sub_menu = [];
            // Check if cards exists on the destList
            if (!destList.sub_menu || destList?.sub_menu?.length === 0) destList.sub_menu = [];

            if (source.droppableId === destination.droppableId) {

                const reordered_sub_menus = reorder(
                    sourceList.sub_menu,
                    source.index,
                    destination.index,
                );
                reordered_sub_menus.forEach((menu, idx) => {
                    menu.order = idx + 1;
                });
                sourceList.sub_menu = reordered_sub_menus;
                setMenuState(newSideBarData);

                let body = []
                sourceList?.sub_menu?.forEach((item) => {
                    body.push({_id: item._id, order: item.order })
                })

                setIsDrag(true)
                const res = await reorderStoreMenu(body)
                if(res.success){
                    toast.success(res.message)
                }else {
                    toast.error(res?.message || 'Reorder Failed')
                }

            } else {
                const [movedCard] = sourceList?.sub_menu?.splice(source.index, 1);
                // Assign the new listId to the moved card
                movedCard.parentId = destination.droppableId;
                // Add card to the destination list
                destList?.sub_menu.splice(destination.index, 0, movedCard);

                sourceList?.sub_menu?.forEach((mnu, idx) => {
                    mnu.order = idx + 1;
                });

                // Update the order for each card in the destination list
                destList?.sub_menu?.forEach((mnu, idx) => {
                    mnu.order = idx + 1;
                });

                setMenuState(newSideBarData);

                let body = []

                destList?.sub_menu?.forEach((item) => {
                    body.push({_id: item._id, order: item.order })
                })

                setIsDrag(true)
                const res = await reorderStoreSubMenu({parent_id: destination.droppableId, data: body})
                if(res.success){
                    toast.success(res.message)
                }else {
                    toast.error(res?.message || 'Reorder Failed')
                }

            }
        }

        setIsDrag(false)
    }


    return (
        <>
            <CommonBreadcrumb title="Store Menu" parent="Home" />
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button color="primary">
                                        Add New Menu
                                    </Button>
                                </div>

                                <div className="clearfix"></div>
                                {!storeMenu.loading && storeMenu?.data?.length > 0 && (
                                    <DragDropContext onDragEnd={onEnd} >
                                        <Droppable droppableId="menus" type="menu" direction="vertical">
                                            {(provided) => (
                                                <div
                                                    className="d-grid gap-3" style={{ width: '100%', height: 'auto', opacity: isDrag ? '0.5' : '1' }}
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {!storeMenu.loading && MenuState.map((item, i) => (
                                                        <Draggable draggableId={item._id} index={i} key={item._id} isDragDisabled={isDrag} >
                                                            {(provided) => (
                                                                <div key={i} style={{ width: 'auto' }}
                                                                    {...provided.draggableProps}
                                                                    ref={provided.innerRef}>
                                                                    <div {...provided.dragHandleProps} className="menu-dragItem">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div className="d-flex justify-content-center gap-2 align-items-center">
                                                                                <GoGrabber style={{ fontSize: '18px', color: '#000' }} />
                                                                                <span>{item?.title}</span>
                                                                            </div>
                                                                            <div className="d-flex align-items-center gap-2">
                                                                                <Badge
                                                                                    style={{ cursor: 'pointer' }}
                                                                                >
                                                                                    <FaEdit style={{ fontSize: 14 }} />
                                                                                </Badge>
                                                                            </div>
                                                                        </div>

                                                                        {item?.type === 'sub' && (
                                                                            <SubStoreMenu item={item} isDrag={isDrag} />
                                                                        )}

                                                                        {item?.type === 'sub' && (
                                                                            <div className="sub-menu-add mx-3 mt-3 d-flex justify-content-center align-items-center gap-1">
                                                                                <FaPlus />
                                                                                Add New Menu
                                                                            </div>
                                                                        )}

                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                )}

                                {!storeMenu.loading && storeMenu?.data?.length === 0 && (
                                    <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Data found</p>
                                )}

                                {storeMenu.loading && <LoadingComponent />}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>
    )
}