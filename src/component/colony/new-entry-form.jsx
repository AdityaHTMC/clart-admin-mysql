/* eslint-disable react/prop-types */
import { Button, Label, Input } from "reactstrap";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import { useColonyContext } from "../../helper/ColonyProvider";

export const NewEntryForm = ({ itemDetail, onClose }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [entryData, setEntryData] = useState({
        date_of_birth: '',
        life_cycle: '',
        total_male: '',
        total_female: '',
        species_id: '',
    })

    useEffect(() => {
        if(itemDetail && itemDetail._id){
            setEntryData({
                date_of_birth: itemDetail?.date_of_birth ? new Date(itemDetail?.date_of_birth).toISOString().split('T')[0] : '',
                life_cycle: itemDetail?.life_cycle || '',
                total_male: '',
                total_female: '',
                species_id: itemDetail?.species_id || '',
            })
        }
    }, [itemDetail])

    const { getColonyList, newStockEntry, getAllSpecies, allSpecies } = useColonyContext()

    useEffect(() => {
        if (allSpecies.length === 0) {
            getAllSpecies()
        }
    }, [allSpecies])

    const onChange = (e) => {
        setEntryData({ ...entryData, [e.target.name]: e.target.value })
    }

    const onNewEntry = async () => {
        if (!entryData.species_id) return toast.info("Animal required")
        if (!entryData.life_cycle) return toast.info("Life cycle required")
        if (!entryData.date_of_birth) return toast.info("Date of Birth required")
        if (!entryData.total_male && !entryData.total_female) return toast.info("STock can not be empty")
        setIsProcessing(true)
        const res = await newStockEntry(itemDetail?._id, entryData)
        setIsProcessing(false)
        if (res && res.success) {
            toast.success("New entry created successfully!")
            setEntryData({
                date_of_birth: '',
                life_cycle: '',
                total_male: '',
                total_female: '',
                species_id: '',
            })
            onClose(false)
            getColonyList();
        } else {
            toast.error(res?.message || "Failed to create new entry!")
        }
    }
    return (
        <>
            <div style={{maxHeight: '50vh', overflow: 'auto'}}>
                <Autocomplete
                    disablePortal
                    options={allSpecies}
                    style={{paddingTop: '16px'}}
                    disabled={isProcessing}
                    value={allSpecies?.find((sp) => sp._id === entryData.species_id) || ''}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setEntryData({ ...entryData, species_id: newValue._id });
                        } else {
                            setEntryData({ ...entryData, species_id: '' });
                        }
                    }}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Select animal" />}
                />

                <div>
                    <Label htmlFor="recipient-name" className="col-form-label">
                        Life Stage :
                    </Label>

                    <Input
                        id="exampleSelect"
                        name="life_cycle"
                        onChange={onChange}
                        value={entryData.life_cycle}
                        disabled={isProcessing}
                        type="select"
                    >
                        <option value={''}>
                            select life stage
                        </option>
                        <option value={'Kid'}>
                            Kid
                        </option>
                        <option value={'Young'}>
                            Young
                        </option>
                    </Input>
                </div>
                <div>
                    <Label htmlFor="recipient-name" className="col-form-label">
                        Total Male :
                    </Label>
                    <Input type="number" name="total_male" onChange={onChange} value={entryData.total_male} required min={0} placeholder="Total male entry" disabled={isProcessing} />
                </div>

                <div>
                    <Label htmlFor="recipient-name" className="col-form-label">
                        Total Female :
                    </Label>
                    <Input type="number" name="total_female" onChange={onChange} value={entryData.total_female} required min={0} placeholder="Total female entry" disabled={isProcessing} />
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
                <Button color="primary" size="sm" disabled={isProcessing} onClick={onNewEntry}>
                    Save
                </Button>
            </div>
        </>
    )
} 