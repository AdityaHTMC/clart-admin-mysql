import { Fragment } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { NewEntryForm } from "./new-entry-form";
import { BirthEntryForm } from "./birth-entry-form";

const EntryTabs = ({ onClose, itemDetail }) => {
    return (
        <Fragment>
            <Tabs>

                <TabList className="nav nav-tabs tab-coupon mb-2">
                    {itemDetail?.total_items === 0 && (
                        <Tab className="nav-link">New Entry</Tab>
                    )}
                    {itemDetail?.total_items > 0 && (
                        <Tab className="nav-link">Birth Entry</Tab>

                    )}
                </TabList>

                {itemDetail?.total_items === 0 && (
                    <TabPanel>
                        <div className={"tab-pane fade active show"}>
                            <NewEntryForm onClose={onClose} itemDetail={itemDetail} />
                        </div>
                    </TabPanel>
                )}
                {itemDetail?.total_items > 0 && (
                    <TabPanel>
                        <div className={itemDetail?.total_items > 0 ? "tab-pane fade active show" : ''}>
                            <BirthEntryForm itemDetail={itemDetail} onClose={onClose} />
                        </div>
                    </TabPanel>

                )}

            </Tabs>
        </Fragment>
    );
};

export default EntryTabs;
