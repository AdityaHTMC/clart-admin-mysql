import React from "react";
import { Button, Table } from "reactstrap";
import "./BalbMiceStockTable.css";
import { AuthProvider, useAuthContext } from "../../helper/AuthProvider";
import CommonBreadcrumb from "../../component/common/bread-crumb";

const BalbMiceStockTable = () => {
  const { user } = useAuthContext();
  console.log("User:", user);
  const dummyData = [
    {
      date: "01-06-2024",
      totalOpening: 100,
      opening: [10, 12, 15, 14, 20, 5],
      addition: [8, 2],
      groupAdd: [1, 2, 3, 4, 5],
      death: 1,
      sold: 3,
      soldTable: 1,
      soldBreed: 1,
      labUse: 2,
      euth: 0,
      culledSold: 1,
      groupDeduct: [1, 1, 2],
      closing: [9, 10, 12, 13, 15, 3],
      totalClosing: 92,
      remarks: "Stable",
      officer: "Dr. A",
    },
    {
      date: "02-06-2024",
      totalOpening: 92,
      opening: [9, 10, 12, 13, 15, 3],
      addition: [5, 1],
      groupAdd: [0, 1, 1, 2, 3],
      death: 0,
      sold: 2,
      soldTable: 0,
      soldBreed: 1,
      labUse: 1,
      euth: 1,
      culledSold: 1,
      groupDeduct: [0, 1, 1],
      closing: [8, 9, 11, 12, 13, 2],
      totalClosing: 84,
      remarks: "Slight drop",
      officer: "Dr. B",
    },
  ];
  const exportToCSV = () => {
    const groupedHeaders = [
      "",
      "",
      "OPENING STOCK",
      "",
      "",
      "",
      "",
      "",
      "ADDITION",
      "",
      "GROUP ADD",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "DEDUCTION BY GROUP",
      "",
      "",
      "CLOSING STOCK",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    const actualHeaders = [
      "DATE",
      "TOTAL OPENING STOCK",
      "BUCK",
      "DOE",
      "YOUNG MALE",
      "YOUNG FEMALE",
      "SUCKLING",
      "CULLED",
      "BIRTH",
      "PURCHASE",
      "BUCK",
      "DOE",
      "YOUNG MALE",
      "YOUNG FEMALE",
      "SUCKLING",
      "DEATH",
      "SOLD",
      "SOLD FOR TABLE PURPOSE",
      "SOLD FOR BREEDING PURPOSE",
      "ISSUED FOR INTERNAL LAB USE",
      "DISCARDED FOR EUTHENASIA",
      "SOLD AS CULLED ANIMAL",
      "YOUNG MALE",
      "YOUNG FEMALE",
      "SUCKLING",
      "BUCK",
      "DOE",
      "YOUNG MALE",
      "YOUNG FEMALE",
      "SUCKLING",
      "CULLED",
      "TOTAL CLOSING",
      "REMARKS",
      "OFFICER'S SIGNATURE",
    ];

    const rows = dummyData.map((row) => [
      row.date,
      row.totalOpening,
      ...row.opening,
      ...row.addition,
      ...row.groupAdd,
      row.death,
      row.sold,
      row.soldTable,
      row.soldBreed,
      row.labUse,
      row.euth,
      row.culledSold,
      ...row.groupDeduct,
      ...row.closing,
      row.totalClosing,
      row.remarks,
      row.officer,
    ]);

    const csvContent = [groupedHeaders, actualHeaders, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "balb_mice_stock.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <CommonBreadcrumb title="Inventory" parent="Animals" />
      <div className="btn-popup pull-right">
        <Button color="primary" onClick={exportToCSV}>
          CSV
        </Button>
      </div>
      <div className="stock-table-wrapper container mt-4">
        {/* <h5 className="text-center mb-3">
          PHYSICAL STOCK REPORT OF BALB C MICE IN CLART AS ON ...............
          2024
        </h5> */}
        <div className="table-scroll">
          <Table bordered className="text-center small stock-table mb-0">
            <thead>
              <tr>
                <th rowSpan="2" className="vertical-header">
                  DATE
                </th>
                <th rowSpan="2" className="vertical-header">
                  TOTAL OPENING STOCK
                </th>
                <th colSpan="6">OPENING STOCK</th>
                <th colSpan="2">ADDITION</th>
                <th colSpan="5">ADDITION BY GROUP TRANSFER</th>
                <th rowSpan="2" className="vertical-header">
                  DEATH
                </th>
                <th rowSpan="2" className="vertical-header">
                  SOLD
                </th>
                <th rowSpan="2" className="vertical-header">
                  SOLD FOR TABLE PURPOSE
                </th>
                <th rowSpan="2" className="vertical-header">
                  SOLD FOR BREEDING PURPOSE
                </th>
                <th rowSpan="2" className="vertical-header">
                  ISSUED FOR INTERNAL LAB USE
                </th>
                <th rowSpan="2" className="vertical-header">
                  DISCARDED FOR EUTHENASIA
                </th>
                <th rowSpan="2" className="vertical-header">
                  SOLD AS CULLED ANIMAL
                </th>
                <th colSpan="3">DEDUCTION BY GROUP TRANSFER</th>
                <th colSpan="6">CLOSING STOCK</th>
                <th rowSpan="2" className="vertical-header">
                  TOTAL CLOSING
                </th>
                <th rowSpan="2" className="vertical-header">
                  REMARKS
                </th>
                <th rowSpan="2" className="vertical-header">
                  OFFICER'S SIGNATURE
                </th>
              </tr>
              <tr>
                <th className="vertical-header">BUCK</th>
                <th className="vertical-header">DOE</th>
                <th className="vertical-header">YOUNG MALE</th>
                <th className="vertical-header">YOUNG FEMALE</th>
                <th className="vertical-header">SUCKLING</th>
                <th className="vertical-header">CULLED</th>

                <th className="vertical-header">BIRTH</th>
                <th className="vertical-header">PURCHASE</th>

                <th className="vertical-header">BUCK</th>
                <th className="vertical-header">DOE</th>
                <th className="vertical-header">YOUNG MALE</th>
                <th className="vertical-header">YOUNG FEMALE</th>
                <th className="vertical-header">SUCKLING</th>

                <th className="vertical-header">YOUNG MALE</th>
                <th className="vertical-header">YOUNG FEMALE</th>
                <th className="vertical-header">SUCKLING</th>

                <th className="vertical-header">BUCK</th>
                <th className="vertical-header">DOE</th>
                <th className="vertical-header">YOUNG MALE</th>
                <th className="vertical-header">YOUNG FEMALE</th>
                <th className="vertical-header">SUCKLING</th>
                <th className="vertical-header">CULLED</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.totalOpening}</td>
                  {row.opening.map((val, j) => (
                    <td key={`open-${i}-${j}`}>{val}</td>
                  ))}
                  {row.addition.map((val, j) => (
                    <td key={`add-${i}-${j}`}>{val}</td>
                  ))}
                  {row.groupAdd.map((val, j) => (
                    <td key={`gadd-${i}-${j}`}>{val}</td>
                  ))}
                  <td>{row.death}</td>
                  <td>{row.sold}</td>
                  <td>{row.soldTable}</td>
                  <td>{row.soldBreed}</td>
                  <td>{row.labUse}</td>
                  <td>{row.euth}</td>
                  <td>{row.culledSold}</td>
                  {row.groupDeduct.map((val, j) => (
                    <td key={`gded-${i}-${j}`}>{val}</td>
                  ))}
                  {row.closing.map((val, j) => (
                    <td key={`close-${i}-${j}`}>{val}</td>
                  ))}
                  <td>{row.totalClosing}</td>
                  <td>{row.remarks}</td>
                  <td>{row.officer}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default BalbMiceStockTable;
