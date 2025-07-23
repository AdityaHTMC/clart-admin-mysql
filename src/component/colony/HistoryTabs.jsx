import React, { useEffect, useState } from "react";
import { useColonyContext } from "../../helper/ColonyProvider";
import { Table } from "reactstrap";
import { Pagination, Stack } from "@mui/material";

const HistoryTabs = ({ onClose, itemDetail }) => {
  const { getColonyHistory, colonyHistory } = useColonyContext();
   const [currentPage, setCurrentPage] = useState(1);
      const [searchTerm, setSearchTerm] = useState("");
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const itemperPage = 6;
    
      const totalPages =
        colonyHistory?.total && Math.ceil(colonyHistory?.total / itemperPage);
    
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
    
    const handlepagechange = (newpage) => {
      setCurrentPage(newpage);
    };


  useEffect(() => {
    if (itemDetail && itemDetail.id) {
      const dataToSend = {
        colony_id: itemDetail.id,
             page: currentPage,
          limit: itemperPage,
        //   startDate: startDate ? formatDate(startDate) : null,
        //   endDate: endDate ? formatDate(endDate) : null,
      };
      getColonyHistory(dataToSend);
    }
  }, [itemDetail,itemperPage,currentPage, startDate, endDate]);

//   console.log(colonyHistory, "colonyHistory in HistoryTabs");

  return (
    <div>
      <h5 className="mb-3">Colony History</h5>

      <Table striped responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Breed</th>
            <th>Male</th>
            <th>Female</th>
            <th>P. Colony</th>
            <th>T. Colony</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {colonyHistory?.data?.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.breed_title}</td>
              <td>{item.total_male}</td>
              <td>{item.total_female}</td>
              <td>{item.colony_ref}</td>
              <td>{item.transferred_colony_ref}</td>
              <td>{item.action_type}</td>
              <td>{item.action}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Stack className="rightPagination mt10" spacing={2}>
        <Pagination
          color="primary"
           count={totalPages }
           page={currentPage }
          shape="rounded"
          onChange={(event, value) => handlepagechange(value)}
        />
      </Stack>
    </div>
  );
};

export default HistoryTabs;
