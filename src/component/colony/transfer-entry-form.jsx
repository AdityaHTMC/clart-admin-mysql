import { toast } from "react-toastify"
import { useColonyContext } from "../../helper/ColonyProvider"
import { Button, Input, Label, ListGroup, ListGroupItem } from "reactstrap"
import { useEffect, useState } from "react"
import { LoadingComponent } from "../common/loading"
import { FaXmark } from "react-icons/fa6";


export const TransferEntry = ({ itemDetail, onClose, type }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [search, setSearch] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [entryData, setEntryData] = useState({
        male: '',
        female: '',
    })
    const [colonyRef, setColonyRef] = useState(null)

    const { getColonyList, searchColony, transferItem, colonyData, birthTransferItem } = useColonyContext()

    useEffect(() => {

        const timeout = setTimeout(() => {
            if (search && search !== '' && search && search.length > 2) {
                searchColony(search)
            } else {
                // toast.info("Keyword length much be greater than 2")
            }
        }, 600)

        return () => clearTimeout(timeout)
    }, [search])

    const onChange = (e) => {
        setEntryData({ ...entryData, [e.target.name]: e.target.value })
    }

    const onTransfer = async () => {
        if (!entryData.male && !entryData.female) return toast.info("At least 1 male or female required")

        if(!colonyRef) return toast.info("Transferred colony reference is required")

        if (type === 'colony') {
            if (itemDetail?.total_male < Number(entryData.male)) {
                toast.error("Male item can't be more than total male stock")
                return
            }
            if (itemDetail?.total_female < Number(entryData.female)) {
                toast.error("Female item can't be more than total female stock")
                return
            }
        } else {
            if (itemDetail?.children?.male < Number(entryData.male)) {
                toast.error("Male item can't be more than total male stock")
                return
            }
            if (itemDetail?.children?.female < Number(entryData.female)) {
                toast.error("Female item can't be more than total female stock")
                return
            }
        }


        setIsProcessing(true)
        let res = {}
        const body = { total_male: Number(entryData?.male) || 0, total_female: Number(entryData?.female) || 0, colony_id: itemDetail?._id, ref: colonyRef }
        if (type === 'colony') {
            res = await transferItem(body)
        } else {
            res = await birthTransferItem(body)
        }
        setIsProcessing(false)
        if (res && res.success) {
            toast.success(res.message)
            setEntryData({
                male: '',
                female: '',
            })
            onClose(false)
            getColonyList();
        } else {
            toast.error(res?.message || "Failed to create new entry!")
        }
    }



    return (
        <>
            <div style={{ maxHeight: '50vh', overflow: 'auto' }}>

                {colonyRef && (
                    <div style={{ marginTop: 10 }} className="d-flex justify-content-between align-items-center">
                        <span>Transfer to Colony : {colonyRef}</span>
                        <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => { setColonyRef(null); setSearch(''); }}><FaXmark /></span>
                    </div>
                )}

                {!colonyRef && (
                    <div style={{ position: "relative" }} className="mb-3">
                        <Label>Transfer Colony To :</Label>
                        <Input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                if (e.target.value && e.target.value !== '' && e.target.value.length > 2) {
                                    setDropdownOpen(true);
                                } else {
                                    setDropdownOpen(false);
                                }
                            }}
                            placeholder="Search colony min(3word)"
                        />

                        {dropdownOpen && (
                            <div className="custom-drop-down-search">
                                <ListGroup flush>
                                    {!colonyData.loading && colonyData?.data?.map((item, i) => (
                                        <ListGroupItem key={i} onClick={() => { setSearch(''); setColonyRef(item.ref); }} style={{ cursor: 'pointer' }} >
                                            {item.ref}
                                        </ListGroupItem>
                                    ))}

                                    {colonyData.loading && <LoadingComponent />}

                                    {!colonyData.loading && colonyData.data?.length === 0 && (
                                        <ListGroupItem>No Data found</ListGroupItem>
                                    )}

                                </ListGroup>
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <Label htmlFor="recipient-name" className="col-form-label">
                        No OF Male :
                    </Label>
                    <Input type="number" name="male" onChange={onChange} value={entryData.male} required min={0} placeholder="Enter no of male to be remove" disabled={isProcessing} />
                </div>

                <div className="mb-2">
                    <Label htmlFor="recipient-name" className="col-form-label">
                        No Of Female :
                    </Label>
                    <Input type="number" name="female" onChange={onChange} value={entryData.female} required min={0} placeholder="Enter no of female to be transfer" disabled={isProcessing} />
                </div>



            </div>
            <hr />
            <div className="d-flex justify-content-end align-items-end">
                <Button color="primary" size="sm" disabled={isProcessing} onClick={onTransfer}>
                    Save
                </Button>
            </div>
        </>
    )
}