/* eslint-disable react/prop-types */
import { toast } from "react-toastify"
import { useColonyContext } from "../../helper/ColonyProvider"
import { Button, Input, Label } from "reactstrap"
import { useState } from "react"


export const BirthEntryForm = ({ itemDetail, onClose }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [entryData, setEntryData] = useState({
        date_of_birth: '',
        total_male: '',
        total_female: '',
    })

    const { newBirthEntry, getColonyList } = useColonyContext()

    const onChange = (e) => {
        setEntryData({ ...entryData, [e.target.name]: e.target.value })
    }

    const onBirthEntry = async () => {
        if (!entryData.date_of_birth) return toast.info("Date of Birth required")
        if (!entryData.total_male && !entryData.total_female) return toast.info("At least 1 total_male or total_female required")

        setIsProcessing(true)
        const res = await newBirthEntry(itemDetail?.id, entryData)
        setIsProcessing(false)
        if (res && res.success) {
            toast.success("Birth entry submitted!")
            setEntryData({
                date_of_birth: '',
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
                        No OF Male :
                    </Label>
                    <Input type="number" name="total_male" onChange={onChange} value={entryData.total_male} required min={0} placeholder="Enter no of total_male" disabled={isProcessing} />
                </div>

                <div>
                    <Label htmlFor="recipient-name" className="col-form-label">
                        No Of Female :
                    </Label>
                    <Input type="number" name="total_female" onChange={onChange} value={entryData.total_female} required min={0} placeholder="Enter no of total_female" disabled={isProcessing} />
                </div>

                <div className="mb-2">
                    <Label htmlFor="recipient-name" className="col-form-label">
                        Date Of Birth :
                    </Label>
                    <Input type="date" name="date_of_birth" value={entryData.date_of_birth} label="Date Of Birth" disabled={isProcessing} onChange={onChange} />
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-end align-items-end">
                <Button color="primary" size="sm" disabled={isProcessing} onClick={onBirthEntry}>
                    Save
                </Button>
            </div>
        </>
    )
}