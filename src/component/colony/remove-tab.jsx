/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { RemoveEntry } from "./remove-entry-form";

const RemoveTabs = ({ onClose, itemDetail }) => {
    return (
        <Fragment>
            <Tabs>
                <TabList className="nav nav-tabs tab-coupon mb-2">
                    {itemDetail?.total_items > 0 && (
                        <Tab className="nav-link">Remove Current Stock</Tab>
                    )}
                    {itemDetail?.children_total > 0 && (
                        <Tab className="nav-link">Remove Child Stock</Tab>
                    )}
                </TabList>

                {itemDetail?.total_items > 0 && (
                    <TabPanel>
                        <div className={"tab-pane fade active show"}>
                            <RemoveEntry itemDetail={itemDetail} onClose={onClose} type="colony" />
                            {/* <NewEntryForm onClose={onClose} itemDetail={itemDetail} /> */}
                        </div>
                    </TabPanel>
                )}
                {itemDetail?.children_total > 0 && (
                    <TabPanel>
                        <div>
                            <RemoveEntry itemDetail={itemDetail} onClose={onClose} type="birth" />
                        </div>
                    </TabPanel>

                )}
            </Tabs>
        </Fragment>
    );
};

export default RemoveTabs;
