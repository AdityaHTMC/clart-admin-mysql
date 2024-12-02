import { Fragment } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Button } from "reactstrap";
import GeneralCouponForm from "./general-coupon-form";
import RestrictionForm from "./restriction-form";
import UsageForm from "./usasge-form";
// import RestrictionForm from "./restriction-form";
// import UsageForm from "./usasge-form";

const CouponTabs = () => {
  return (
    <Fragment>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">General</Tab>
          <Tab className="nav-link">Restriction</Tab>
          <Tab className="nav-link">Usage</Tab>
        </TabList>
        <TabPanel>
          <div className="tab-pane fade active show">
            <GeneralCouponForm />
          </div>
        </TabPanel>
        <TabPanel>
          <RestrictionForm />
        </TabPanel>
        <TabPanel>
          <UsageForm />
        </TabPanel>
      </Tabs>
      <div className="pull-right">
        <Button>Save</Button>
      </div>
    </Fragment>
  );
};

export default CouponTabs;
