import { Settings, User } from "react-feather";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import DeactivateAccount from "./deactivate-account";
import DeleteAccount from "./delete-account";
import Notifications from "./notification";
import TabTable from "./tab-table";

const TabProfile = () => {
  return (
    <div>
      <Tabs>
        <TabList className="nav nav-tabs tab-coupon">
          <Tab className="nav-link">
            <User className="me-2" />
            Profile
          </Tab>
          <Tab className="nav-link">
            <Settings className="me-2" />
            Contact
          </Tab>
        </TabList>
        <TabPanel>
          <TabTable />
        </TabPanel>
        <TabPanel>
          <Notifications />
          <DeactivateAccount />
          <DeleteAccount />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabProfile;
