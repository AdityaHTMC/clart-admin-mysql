import { toast } from "react-toastify"
import { useColonyContext } from "../../helper/ColonyProvider"
import { Button, Input, Label } from "reactstrap"
import { useState } from "react"


export const RemoveEntry = ({ itemDetail, onClose, type }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [entryData, setEntryData] = useState({
        total_male: '',
        total_female: '',
    })

    const { removeColonyItem, getColonyList, removeBirthItem } = useColonyContext()

    const onChange = (e) => {
        setEntryData({ ...entryData, [e.target.name]: e.target.value })
    }

    const onRemove = async () => {
        if (!entryData.total_male && !entryData.total_female) return toast.info("At least 1 total_male or total_female required")
            
        if(type === 'colony'){
            if(itemDetail?.total_male < Number(entryData.total_male)){
                toast.error("Male item can't be more than total male stock")
                return
            }
            if(itemDetail?.total_female < Number(entryData.total_female)){
                toast.error("Female item can't be more than total female stock")
                return
            }
        }else {
            if(itemDetail?.children?.total_male < Number(entryData.total_male)){
                toast.error("Male item can't be more than total total_male stock")
                return
            }
            if(itemDetail?.children?.total_female < Number(entryData.total_female)){
                toast.error("Female item can't be more than total total_female stock")
                return
            }
        }


        setIsProcessing(true)
        let res = {}
        const body = {total_male : Number(entryData?.total_male) || 0, total_female : Number(entryData?.total_female) || 0}
        if(type === 'colony'){
            res = await removeColonyItem(itemDetail?.id, body)
        }else {
            res = await removeBirthItem(itemDetail?.id, body)
        }
        setIsProcessing(false)
        if (res && res.success) {
            toast.success(res.message)
            setEntryData({
                total_male: '',
                total_female: '',
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
                <div>
                    <Label htmlFor="recipient-name" className="col-form-label">
                        No of Male :
                    </Label>
                    <Input type="number" name="total_male" onChange={onChange} value={entryData.total_male} required min={0} placeholder="Enter no of total_male to be remove" disabled={isProcessing} />
                </div>

                <div className="mb-2">
                    <Label htmlFor="recipient-name" className="col-form-label">
                        No of Female :
                    </Label>
                    <Input type="number" name="total_female" onChange={onChange} value={entryData.total_female} required min={0} placeholder="Enter no of total_female to be remove" disabled={isProcessing} />
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-end align-items-end">
                <Button color="primary" size="sm" disabled={isProcessing} onClick={onRemove}>
                    Save
                </Button>
            </div>
        </>
    )
}