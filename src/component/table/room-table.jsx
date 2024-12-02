import { Badge, Table } from "reactstrap"
import { useMasterContext } from "../../helper/MasterProvider"
import { LoadingComponent } from "../common/loading"
import { FaEdit } from "react-icons/fa"


export const RoomTable = () => {

    const { roomList } = useMasterContext()

    return (
        <div className="px-sm-3">
            <Table bordered responsive hover>
                <thead>
                    <tr className="table-secondary">
                        <th>REF</th>
                        <th>TITLE</th>
                        <th>UNIT NAME</th>
                        <th>TOTAL RACKS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {!roomList.loading && roomList?.data?.map((item, i) => (
                        <tr key={i}>
                            <td><Badge>#{item?.ref}</Badge></td>
                            <td>{item?.title}</td>
                            <td>{item?.unit_title}</td>
                            <td>{item?.total_racks}</td>
                            <td className="d-flex gap-2 align-items-center">
                                <span className="text-primary" style={{ cursor: 'pointer' }}>
                                    <FaEdit style={{ fontSize: 18 }} />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {!roomList.loading && roomList?.data?.length === 0 && (
                    <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Menu found</p>
                )}
                {roomList.loading && <LoadingComponent />}
            </Table>

        </div>
    )
}