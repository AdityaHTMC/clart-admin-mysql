
import { Line } from "react-chartjs-2";
import { Card, CardBody, Col } from "reactstrap";
import CommonCardHeader from "../common/card-header";
import { BuySellChartData, BuySellChartOptions } from "../../Data/Dashboard";

const BuySell = () => {
  return (
    <Col sm="12">
      <Card>
        <CommonCardHeader title="Buy/Sell" />
        <CardBody className="sell-graph">
          <Line data={BuySellChartData} options={BuySellChartOptions} width={700} height={350} />
        </CardBody>
      </Card>
    </Col>
  );
};

export default BuySell;
