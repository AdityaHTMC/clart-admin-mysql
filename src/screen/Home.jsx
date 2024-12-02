/* eslint-disable no-unused-vars */
import { ArcElement, BarController, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, RadialLinearScale, Title, Tooltip } from "chart.js";
import { Container, Row } from "reactstrap";
import CommonBreadcrumb from "../component/common/bread-crumb";
import TopDashboardCards from "../component/dashboard/dashboard-cards";
import MarketValue from "../component/dashboard/market-value";
import LatestOrders from "../component/dashboard/latest-orders";
import TotalSales from "../component/dashboard/total-sales";
import TotalPurchase from "../component/dashboard/total-purchase";
import TotalCash from "../component/dashboard/total-cash";
import DailyDeposits from "../component/dashboard/daily-deposit";
import BuySell from "../component/dashboard/buy-sell";
import ProductCart from "../component/dashboard/product-cart";
import SalesStatus from "../component/dashboard/sales-status";
import EmployeeStatus from "../component/dashboard/employee-status";
import TopProducts from "../component/dashboard/TopProducts";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarController, BarElement, ArcElement, Filler, RadialLinearScale);

const DashboardContainer = () => {
    return (
        <>
            <CommonBreadcrumb title="Dashboard" parent="Dashboard" />
            <Container fluid>
                <Row>
                    <TopDashboardCards />
                    {/* <MarketValue /> */}
                    <LatestOrders />
                    <TopProducts/>
                    <TotalSales />
                    <TotalPurchase />
                    <TotalCash />
                    <DailyDeposits />
                    <BuySell />
                    <ProductCart />
                    <EmployeeStatus />
                    <SalesStatus />
                </Row>
            </Container>
        </>
    );
};

export default DashboardContainer;
