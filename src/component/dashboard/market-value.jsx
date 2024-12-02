import { Bar } from "react-chartjs-2";
import { Card, CardBody, Col } from "reactstrap";
import { MarketValueChartData, MarketValueChartOptions } from "../../Data/Dashboard";
import CommonCardHeader from "../common/card-header";

const MarketValue = () => {
    return (
        <Col xl="6 xl-100">
            <Card>
                <CommonCardHeader title="Market Value" />
                <CardBody>
                    <div className="market-chart">
                        <Bar data={MarketValueChartData} options={MarketValueChartOptions} width={778} style={{width: '100%'}} height={308} />
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default MarketValue;
