import { toast } from "react-toastify"
import { useColonyContext } from "../../helper/ColonyProvider"
import { Button, Input, Label } from "reactstrap"
import { useState } from "react"


export const RemoveEntry = ({ itemDetail, onClose, type }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [entryData, setEntryData] = useState({
        male: '',
        female: '',
    })

    const { removeColonyItem, getColonyList, removeBirthItem } = useColonyContext()

    const onChange = (e) => {
        setEntryData({ ...entryData, [e.target.name]: e.target.value })
    }

    const onRemove = async () => {
        if (!entryData.male && !entryData.female) return toast.info("At least 1 male or female required")
            
        if(type === 'colony'){
            if(itemDetail?.total_male < Number(entryData.male)){
                toast.error("Male item can't be more than total male stock")
                return
            }
            if(itemDetail?.total_female < Number(entryData.female)){
                toast.error("Female item can't be more than total female stock")
                return
            }
        }else {
            if(itemDetail?.children?.male < Number(entryData.male)){
                toast.error("Male item can't be more than total male stock")
                return
            }
            if(itemDetail?.children?.female < Number(entryData.female)){
                toast.error("Female item can't be more than total female stock")
                return
            }
        }


        setIsProcessing(true)
        let res = {}
        const body = {male : Number(entryData?.male) || 0, female : Number(entryData?.female) || 0}
        if(type === 'colony'){
            res = await removeColonyItem(itemDetail?._id, body)
        }else {
            res = await removeBirthItem(itemDetail?._id, body)
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
                    <Input type="number" name="female" onChange={onChange} value={entryData.female} required min={0} placeholder="Enter no of female to be remove" disabled={isProcessing} />
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