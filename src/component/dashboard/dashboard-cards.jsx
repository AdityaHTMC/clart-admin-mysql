/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import CountUp from "react-countup";
import { Card, CardBody, Col, Media } from "reactstrap";
import { useSettingContext } from "../../helper/SettingProvider";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingFlag,
  faFlask,
  faHouseMedicalFlag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
const TopDashboardCards = () => {
  const { getDashboardCount, dashboardCountList } = useSettingContext();

  useEffect(() => {
    getDashboardCount();
  }, []);



  return (
    <>
     <Col md="6" xl="3">
      <Card className=" o-hidden widget-cards">
          <Link to="/" style={{ textDecoration: "none" }}>
            <CardBody className="bg-secondary">
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">
                    <FontAwesomeIcon
                      icon={faBuildingFlag}
                      className="font-secondary"
                      size="2x"
                    />
                  </div>
                </div>
                <Media body className="col-8">
                  <span className="m-0" style={{color:'#fff', fontSize:'12px'}}>Today's Weaning</span>
                  <h3 className="mb-0">
                    <CountUp
                      className="counter"
                      end={dashboardCountList?.data?.readyToCulled}
                    />
                    <small> </small>  
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Link>
        </Card>
      </Col>
      <Col md="6" xl="3">
      <Card className=" o-hidden widget-cards">
          <Link to="/" style={{ textDecoration: "none" }}>
            <CardBody className="bg-primary">
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">
                    <FontAwesomeIcon
                      icon={faBuildingFlag}
                      className="font-secondary"
                      size="2x"
                    />
                  </div>
                </div>
                <Media body className="col-8">
                  <span className="m-0"> Today's Culling</span>
                  <h3 className="mb-0">
                    <CountUp
                      className="counter"
                      end={dashboardCountList?.data?.culling}
                    />
                    <small> </small>
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Link>
        </Card>
      </Col>
      <Col md="6" xl="3">
      <Card className=" o-hidden widget-cards">
          <Link to="/pending-orders" style={{ textDecoration: "none" }}>
            <CardBody className="bg-warning">
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">
                    <FontAwesomeIcon
                      icon={faBuildingFlag}
                      className="font-secondary"
                      size="2x"
                    />
                  </div>
                </div>
                <Media body className="col-8">
                  <span className="m-0"> Pending Order </span>
                  <h3 className="mb-0">
                    <CountUp
                      className="counter"
                      end={dashboardCountList?.data?.pending_orders}
                    />
                    <small> </small>
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Link>
        </Card>
      </Col>
      <Col md="6" xl="3">
      <Card className=" o-hidden widget-cards">
          <Link to="/" style={{ textDecoration: "none" }}>
            <CardBody style={{backgroundColor:'#5c6bca'}}>
              <Media className="static-top-widget row">
                <div className="icons-widgets col-4">
                  <div className="align-self-center text-center">
                    <FontAwesomeIcon
                      icon={faBuildingFlag}
                      className="font-secondary"
                      size="2x"
                    />
                  </div>
                </div>
                <Media body className="col-8">
                  <span className="m-0" style={{color:'#fff'}}> Ready to Culled</span>
                  <h3 className="mb-0">
                    <CountUp
                      className="counter"
                      end={dashboardCountList?.data?.readyToCulled}
                    />
                    <small> </small>  
                  </h3>
                </Media>
              </Media>
            </CardBody>
          </Link>
        </Card>
      </Col>
    </>
  );
};

export default TopDashboardCards;
