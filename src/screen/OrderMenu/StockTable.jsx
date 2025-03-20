/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import CommonBreadcrumb from "../../component/common/bread-crumb";
import { Container } from "reactstrap";

const StockTable = () => {
    const dummyData = [
        { date: 1, totalOpeningStock: 10, buck: 2, doe: 3, youngMale: 2, youngFemale: 1, suckling: 1, culled: 1, birth: 0, purchase: 4, additionBuck: 0, additionDoe: 0, additionYoungMale: 0, additionYoungFemale: 0, additionSuckling: 0, sold: 1, death: 0, soldForTable: 0, breedingPurpose: 0, internalUse: 0, discarded: 0, euthanasia: 0, soldAsCulled: 0, deductionYoungMale: 0, deductionYoungFemale: 0, deductionSuckling: 0, closingBuck: 1, closingDoe: 3, closingYoungMale: 2, closingYoungFemale: 1, closingSuckling: 1, closingCulled: 1, totalClosing: 9, officerSignature: "Good",  },
        { date: 2, totalOpeningStock: 9, buck: 1, doe: 3, youngMale: 2, youngFemale: 1, suckling: 1, culled: 1, birth: 0, purchase: 6, additionBuck: 0, additionDoe: 0, additionYoungMale: 0, additionYoungFemale: 0, additionSuckling: 0, sold: 1, death: 0, soldForTable: 0, breedingPurpose: 0, internalUse: 0, discarded: 0, euthanasia: 0, soldAsCulled: 0, deductionYoungMale: 0, deductionYoungFemale: 0, deductionSuckling: 0, closingBuck: 1, closingDoe: 3, closingYoungMale: 2, closingYoungFemale: 1, closingSuckling: 1, closingCulled: 1, totalClosing: 10, officerSignature: "Stable",  },
      ];

  return (
    <>
     <CommonBreadcrumb title="Stock List" parent="Physical" />
     <Container fluid>
     
     <TableContainer component={Paper}>
      <Table hover responsive bordered className="align-middle">
        <TableHead>
          <TableRow>
            <TableCell rowSpan={2} align="center" sx={{ border: "1px solid black" }}>DATE</TableCell>
            <TableCell rowSpan={2} align="center" sx={{ border: "1px solid black" }}>TOTAL OPENING STOCK</TableCell>
            <TableCell colSpan={6} align="center" sx={{ border: "1px solid black" }}>OPENING STOCK</TableCell>
            <TableCell colSpan={2} align="center" sx={{ border: "1px solid black" }}>ADDITION</TableCell>
            <TableCell colSpan={5} align="center" sx={{ border: "1px solid black" }}>ADDITION BY GROUP TRANSFER</TableCell>
            <TableCell colSpan={7} align="center" sx={{ border: "1px solid black" }}>DEDUCTION</TableCell>
            <TableCell colSpan={3} align="center" sx={{ border: "1px solid black" }}>DEDUCTION BY GROUP TRANSFER</TableCell>
            <TableCell colSpan={6} align="center" sx={{ border: "1px solid black" }}>CLOSING STOCK</TableCell>
            <TableCell rowSpan={2} align="center" sx={{ border: "1px solid black" }}>TOTAL CLOSING</TableCell>
            <TableCell rowSpan={2} align="center" sx={{ border: "1px solid black" }}>REMARKS</TableCell>
            <TableCell rowSpan={2} align="center" sx={{ border: "1px solid black" }}>OFFICER'S SIGNATURE</TableCell>
          </TableRow>
          <TableRow>
            {["Buck", "Doe", "Young Male", "Young Female", "Suckling", "Culled", "Birth", "Purchase", "Buck", "Doe", "Young Male", "Young Female", "Suckling", "Sold", "Death", "Sold for Table", "Breeding Purpose", "Internal Use", "Discarded", "Euthanasia", "Sold as Culled", "Young Male", "Young Female", "Suckling", "Buck", "Doe", "Young Male", "Young Female", "Suckling",].map((header, index) => (
              <TableCell key={index} align="center" sx={{ border: "1px solid black" }}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, i) => (
                <TableCell key={i} align="center" sx={{ border: "1px solid black" }}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     </Container>
    </>
  );
};

export default StockTable;
