/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useColonyContext } from "../../helper/ColonyProvider";
import {
  Button,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../common/loading";
import { FaXmark } from "react-icons/fa6";
import { Autocomplete, TextField } from "@mui/material";

export const TransferEntry = ({ itemDetail, onClose, type }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [entryData, setEntryData] = useState({
    male: "",
    female: "",
  });
  const [colonyRef, setColonyRef] = useState(null);

  const {
    getColonyList,
    searchColony,
    transferItem,
    colonyData,
    birthTransferItem,
    getColonyBreed,
    colonybreedList,
  } = useColonyContext();
  const [selectedProducts, setSelectedProducts] = useState([]);

  console.log(itemDetail, "itemDetail");

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search && search !== "" && search && search.length > 2) {
        searchColony(search);
      } else {
        // toast.info("Keyword length much be greater than 2")
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [search]);

  const onChange = (e) => {
    setEntryData({ ...entryData, [e.target.name]: e.target.value });
  };

  const onTransfer = async () => {
    const allSelectedProductIds = [
        ...selectedProducts.map((product) => product.id),
    ];

    if (!colonyRef)
      return toast.info("Transferred colony reference is required");

    if(allSelectedProductIds?.length === 0) return toast.info("Select atleast one animal to transfer");

    setIsProcessing(true);
    let res = {};

    const body = {
      colony_from: itemDetail?.id,
      colony_to: colonyRef,
      items: allSelectedProductIds
      
    };

    if (type === "colony") {
      res = await transferItem(body);
    } else {
      res = await birthTransferItem(body);
    }
    setIsProcessing(false);
    if (res && res.success) {
      toast.success(res.message);
      setEntryData({
        male: "",
        female: "",
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
        {colonyRef && (
          <div
            style={{ marginTop: 10 }}
            className="d-flex justify-content-between align-items-center"
          >
            <span>Transfer to Colony : {colonyRef}</span>
            <span
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => {
                setColonyRef(null);
                setSearch("");
              }}
            >
              <FaXmark />
            </span>
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
                if (
                  e.target.value &&
                  e.target.value !== "" &&
                  e.target.value.length > 2
                ) {
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
                  {!colonyData.loading &&
                    colonyData?.data?.map((item, i) => (
                      <ListGroupItem
                        key={i}
                        onClick={() => {
                          setSearch("");
                          setColonyRef(item.ref);
                        }}
                        style={{ cursor: "pointer" }}
                      >
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
          onClick={onTransfer}
        >
          Save
        </Button>
      </div>
    </>
  );
};
