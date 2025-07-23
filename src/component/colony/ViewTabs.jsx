import React, { Fragment, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useColonyContext } from "../../helper/ColonyProvider";
import { Table } from "reactstrap";

const ViewTabs = ({ onClose, itemDetail }) => {
  const { getColonyBreed, colonybreedList } = useColonyContext();

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (itemDetail && itemDetail.id) {
      const type = tabIndex === 0 ? "General" : "Children";
      const dataToSend = {
        colony_id: itemDetail.id,
        type,
      };
      getColonyBreed(dataToSend);
    }
  }, [itemDetail, tabIndex]); 

//   console.log(itemDetail, "itemDetail in ViewTabs");
//   console.log(colonybreedList, "colonybreedList in ViewTabs");

  return (
    <Fragment>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="nav nav-tabs tab-coupon mb-2">
          <Tab className="nav-link">Colony Animal</Tab>
          <Tab className="nav-link">Colony Children</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-pane fade active show">
            <h5 className="mb-3">Colony Animal Details</h5>
            {/* Show General data here */}
            <Table striped responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DOB</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {colonybreedList?.data?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{new Date(item.date_of_birth).toLocaleDateString()}</td>
                    <td>{item.sex}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </TabPanel>

        <TabPanel>
          <div>
            <h5 className="mb-3">Colony Children Details</h5>
            {/* Show Children data here */}
            <Table striped responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DOB</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {colonybreedList?.data?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{new Date(item.date_of_birth).toLocaleDateString()}</td>
                    <td>{item.sex}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </TabPanel>
      </Tabs>
    </Fragment>
  );
};

export default ViewTabs;
