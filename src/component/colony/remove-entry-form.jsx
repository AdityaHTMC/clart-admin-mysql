/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useColonyContext } from "../../helper/ColonyProvider";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export const RemoveEntry = ({ itemDetail, onClose, type }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [entryData, setEntryData] = useState({
    total_male: "",
    total_female: "",
  });

  const {
    removeColonyItem,
    getColonyList,
    removeBirthItem,
    getColonyBreed,
    colonybreedList,
  } = useColonyContext();

  const [selectedProducts, setSelectedProducts] = useState([]);
  

    useEffect(() => {
      if (type === "colony") {
        const dataToSend = {
          colony_id: itemDetail?.id,
          type: "General",
        };
        getColonyBreed(dataToSend);
      } else {
        const dataToSend = {
          colony_id: itemDetail?.id,
          type: "Children",
        };
        getColonyBreed(dataToSend);
      }
    }, []);

  const onChange = (e) => {
    setEntryData({ ...entryData, [e.target.name]: e.target.value });
  };

  const onRemove = async () => {
   
    const allSelectedProductIds = [
        ...selectedProducts.map((product) => product.id),
    ];


      if(allSelectedProductIds?.length === 0) return toast.info("Select atleast one animal to transfer");

  

    setIsProcessing(true);
    let res = {};
    const body = {
        colony_from: itemDetail?.id,
        items: allSelectedProductIds
    };
    if (type === "colony") {
      res = await removeColonyItem(itemDetail?.id, body);
    } else {
      res = await removeBirthItem(itemDetail?.id, body);
    }
    setIsProcessing(false);
    if (res && res.success) {
      toast.success(res.message);
      setEntryData({
        total_male: "",
        total_female: "",
      });
      onClose(false);
      getColonyList();
    } else {
      toast.error(res?.message || "Failed to create new entry!");
    }
  };
  return (
    <>
      <div style={{ maxHeight: "50vh", overflow: "auto" }}>
        

        <div className="mb-2">
        <FormGroup>
            <Label for="New">Transfer Breed</Label>
            <Autocomplete
              sx={{ m: 1 }}
              multiple
              options={colonybreedList.data || []}
              getOptionLabel={(option) => option?.id || ""}
              value={selectedProducts}
              onChange={(event, newValue) => setSelectedProducts(newValue)}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Breed"
                  placeholder="Select Breed"
                />
              )}
            />
          </FormGroup>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-end align-items-end">
        <Button
          color="primary"
          size="sm"
          disabled={isProcessing}
          onClick={onRemove}
        >
          Save
        </Button>
      </div>
    </>
  );
};
