import { Draggable, Droppable } from "@hello-pangea/dnd"
import { FaEdit } from "react-icons/fa"
import { GoGrabber } from "react-icons/go"
import { Badge } from "reactstrap"


export const SubStoreMenu = ({ item, isDrag }) => {
    return (
        <Droppable droppableId={item?._id} type="sub_menu">
            {(provided1) => (
                <div className="mx-3 mt-3 d-grid gap-3" ref={provided1.innerRef} {...provided1.droppableProps}>
                    {item?.sub_menu?.map((sub_item, j) => (
                        <Draggable draggableId={sub_item?._id} index={j} key={sub_item?._id} isDragDisabled={isDrag}>
                            {(provided2) => (
                                <div className="" {...provided2.draggableProps} {...provided2.dragHandleProps} ref={provided2.innerRef}>
                                    <div className="d-flex justify-content-between sub-menu-dragItem">
                                        <div className="d-flex justify-content-center gap-2 align-items-center">
                                            <GoGrabber style={{ fontSize: '18px', color: '#000' }} />
                                            <span>{sub_item?.title}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <Badge
                                                color="danger"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <FaEdit style={{ fontSize: 14 }} />
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))}
                </div>
            )}
        </Droppable>
    )
}