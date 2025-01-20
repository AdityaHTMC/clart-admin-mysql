/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Fragment } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { TransferEntry } from "./transfer-entry-form";

const TransferTabs = ({ onClose, itemDetail }) => {
    return (
        <Fragment>
            <Tabs>
                <TabList className="nav nav-tabs tab-coupon mb-2">
                    {itemDetail?.total_items > 0 && (
                        <Tab className="nav-link">Transfer Current Stock</Tab>
                    )}
                    {itemDetail?.children_total > 0 && (
                        <Tab className="nav-link">Transfer Child Stock</Tab>
                    )}
                </TabList>

                {itemDetail?.total_items > 0 && (
                    <TabPanel>
                        <div className={"tab-pane fade active show"}>
                            {/* <RemoveEntry itemDetail={itemDetail} onClose={onClose} type="colony" /> */}
                            <TransferEntry itemDetail={itemDetail} onClose={onClose} type={'colony'} />
                        </div>
                    </TabPanel>
                )}
                {itemDetail?.children_total > 0 && (
                    <TabPanel>
                        <div>
                            <TransferEntry itemDetail={itemDetail} onClose={onClose} type={'birth'} />
                        </div>
                    </TabPanel>

                )}
            </Tabs>
        </Fragment>
    );
};

export default TransferTabs;
