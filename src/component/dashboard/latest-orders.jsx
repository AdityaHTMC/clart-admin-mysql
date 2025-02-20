/* eslint-disable no-unused-vars */

import { Button, Card, CardBody, Col, Table } from "reactstrap";
import CommonCardHeader from "../common/card-header";
import { useCmsContext } from "../../helper/CmsProvider";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LatestOrders = () => {
  const { getAllOrderList, allOrderlist } = useCmsContext();

  useEffect(() => {
    getAllOrderList();
  }, []);

  console.log(allOrderlist, "allOrderlist");

  return (
    <Col xl="6 xl-100">
      <Card>
        <CommonCardHeader title="Latest Orders" />
        <CardBody>
          <div className="user-status table-responsive latest-order-table">
            <Table borderless>
              <thead>
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {allOrderlist.data?.slice(0, 5).map((order, index) => (
                  <tr key={index}>
                    <td>{order.order_id}</td>
                    <td className="digits">{order.total_amount}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.payment_status}</td>
                    <td>
                              {order?.order_date
                                ? new Date(order.order_date).toLocaleDateString(
                                    "en-GB"
                                  )
                                : ""}
                            </td>
                  </tr>
                ))}
              </tbody>
            </Table>
             <Link to= '/all-orders'><Button color="primary">  View All Orders </Button> </Link> 
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LatestOrders;
