/* eslint-disable no-unused-vars */
import CommonBreadcrumb from "../../component/common/bread-crumb";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FaEye, FaMinus, FaPlus } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { LoadingComponent } from "../../component/common/loading";
import { useColonyContext } from "../../helper/ColonyProvider";
import { RiQrScan2Line } from "react-icons/ri";
import EntryTabs from "../../component/colony/entry-tabs";
import RemoveTabs from "../../component/colony/remove-tab";
import { BiTransfer } from "react-icons/bi";
import TransferTabs from "../../component/colony/transfer-tabs";
import { IconButton, Pagination, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export const ColonyList = () => {




  const [qrOpen, setQrOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [IsTransfer, setIsTransfer] = useState(false);
  const [itemDetail, setItemDetail] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { getColonyList, colonyList } = useColonyContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 8;

  const totalPages =
    colonyList?.total && Math.ceil(colonyList?.total / itemperPage);

  useEffect(() => {
    const dataToSend = {
      page: currentPage,
      limit: itemperPage,
      keyword_search: searchTerm,
    };
    getColonyList(dataToSend);
  }, [currentPage,searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlepagechange = (newpage) => {
    setCurrentPage(newpage);
  };

  return (
    <>
      <CommonBreadcrumb title="Colony Management" parent="Home" />
      <Container fluid>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div id="basicScenario" className="product-physical">
                <form
                    className="searchBx"
                    style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
                  >
                    <TextField
                      id="search-box"
                      label="Search Colony"
                      variant="outlined"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      fullWidth
                      sx={{
                        maxWidth: "400px",
                        backgroundColor: "#fff",
                        borderRadius: "4px",
                      }}
                    />
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon style={{ fill: "#979797" }} />
                    </IconButton>
                  </form>
                  <Table responsive hover borderless align="center">
                    <thead className="border-bottom border-top py-4">
                      <tr>
                        <th>Ref</th>
                        <th className="text-center">Rack Title</th>
                        <th className="text-center">Breed Name</th>
                        <th className="text-center">Total Male</th>
                        <th className="text-center">Total Female</th>
                        <th className="text-center">Use For</th>
                        <th className="text-center">Children</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!colonyList.loading &&
                        colonyList?.data?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <Badge>{item?.ref}</Badge>
                            </td>
                            <td className="text-center">
                              {" "}
                              {item?.rack_title || "N/A"}{" "}
                            </td>
                            <td className="text-center">
                              <Badge color="danger">
                                {item?.breed_name || "N/A"}
                              </Badge>
                            </td>
                            <td className="text-center">
                              {" "}
                              {item?.total_male || 0}{" "}
                            </td>
                            <td className="text-center">
                              {" "}
                              {item?.total_female || 0}{" "}
                            </td>
                            <td className="text-center">
                              <Badge
                                color={
                                  item?.use_for === "Lab" ? "danger" : "success"
                                }
                                style={{ textTransform: "capitalize" }}
                              >
                                {item?.use_for}
                              </Badge>
                            </td>
                            <td className="text-center">
                              {" "}
                              {item?.children_total > 0
                                ? `Available (${item?.children_total})`
                                : "Not Available"}{" "}
                            </td>
                            <td>
                              <div className="d-flex justify-content-end align-items-center gap-2">
                                <Dropdown
                                  isOpen={activeIndex === index}
                                  toggle={() =>
                                    setActiveIndex(
                                      activeIndex === index ? -1 : index
                                    )
                                  }
                                  direction="down"
                                >
                                  <DropdownToggle
                                    tag="button"
                                    color="danger"
                                    size="sm"
                                    className="p-0 m-0 btn "
                                    style={{ background: "none" }}
                                  >
                                    <IoMdMore size={24} className="m-0 p-0" />
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      className="d-flex gap-2 align-items-center"
                                      onClick={() => {
                                        setQrOpen(true);
                                        setItemDetail(item);
                                      }}
                                    >
                                      <Badge
                                        color="primary"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <RiQrScan2Line size={14} />
                                      </Badge>
                                      <span
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                        }}
                                      >
                                        QR Code
                                      </span>
                                    </DropdownItem>

                                    {(item?.total_items === 0 ||
                                      item?.children_total === 0) && (
                                      <DropdownItem
                                        className="d-flex gap-2 align-items-center"
                                        onClick={() => {
                                          setIsOpen(true);
                                          setItemDetail(item);
                                        }}
                                      >
                                        <Badge style={{ cursor: "pointer" }}>
                                          <FaPlus size={14} />
                                        </Badge>
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                          }}
                                        >
                                          Add Items
                                        </span>
                                      </DropdownItem>
                                    )}

                                    {(item?.total_items > 0 ||
                                      item?.children?.total > 0) && (
                                      <DropdownItem
                                        className="d-flex gap-2 align-items-center"
                                        onClick={() => {
                                          setIsRemove(true);
                                          setItemDetail(item);
                                        }}
                                      >
                                        <Badge
                                          color="warning"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <FaMinus size={14} />
                                        </Badge>
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                          }}
                                        >
                                          Remove Items
                                        </span>
                                      </DropdownItem>
                                    )}

                                    {(item?.total_items > 0 ||
                                      item?.children?.total > 0) && (
                                      <DropdownItem
                                        className="d-flex gap-2 align-items-center"
                                        onClick={() => {
                                          setIsTransfer(true);
                                          setItemDetail(item);
                                        }}
                                      >
                                        <Badge
                                          color="danger"
                                          style={{ cursor: "pointer" }}
                                        >
                                          <BiTransfer size={14} />
                                        </Badge>
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                          }}
                                        >
                                          Transfer Item
                                        </span>
                                      </DropdownItem>
                                    )}

                                    <DropdownItem className="d-flex gap-2 align-items-center">
                                      <Badge
                                        color="danger"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <FaEye size={14} />
                                      </Badge>
                                      <span
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                        }}
                                      >
                                        View Details
                                      </span>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Stack className="rightPagination mt10" spacing={2}>
                    <Pagination
                      color="primary"
                      count={totalPages}
                      page={currentPage}
                      shape="rounded"
                      onChange={(event, value) => handlepagechange(value)}
                    />
                  </Stack>
                  {!colonyList.loading && colonyList?.data?.length === 0 && (
                    <p
                      className="text-muted text-center my-4"
                      style={{ fontSize: 14 }}
                    >
                      No Data found
                    </p>
                  )}

                  {colonyList.loading && <LoadingComponent />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* QR Code Modal */}
      <Modal isOpen={qrOpen} toggle={setQrOpen}>
        <ModalHeader toggle={() => setQrOpen(false)}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            QR Code
          </h5>
        </ModalHeader>
        <ModalBody>
          {itemDetail?.qr && (
            <div
              className="d-flex justify-content-center"
              style={{ width: "100%", maxHeight: "200px" }}
            >
              <img
                src={itemDetail?.qr}
                alt=""
                style={{
                  width: "auto",
                  height: "100%",
                  aspectRatio: 1,
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setQrOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/* New Entry Modal */}
      <Modal isOpen={isOpen} toggle={setIsOpen}>
        <ModalHeader toggle={() => setIsOpen(false)}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Colony #{itemDetail?.ref}
          </h5>
        </ModalHeader>
        <ModalBody>
          <EntryTabs onClose={setIsOpen} itemDetail={itemDetail} />
        </ModalBody>
      </Modal>
      {/* Remove Stock */}
      <Modal isOpen={isRemove} toggle={setIsRemove}>
        <ModalHeader toggle={() => setIsRemove(false)}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Colony #{itemDetail?.ref}
          </h5>
        </ModalHeader>
        <ModalBody>
          <RemoveTabs onClose={setIsRemove} itemDetail={itemDetail} />
        </ModalBody>
      </Modal>
      {/* Transfer stock */}
      <Modal isOpen={IsTransfer} toggle={setIsTransfer}>
        <ModalHeader toggle={() => setIsTransfer(false)}>
          <h5 className="modal-title f-w-600" id="exampleModalLabel2">
            Colony #{itemDetail?.ref}
          </h5>
        </ModalHeader>
        <ModalBody>
          <TransferTabs onClose={setIsTransfer} itemDetail={itemDetail} />
        </ModalBody>
      </Modal>
    </>
  );
};
