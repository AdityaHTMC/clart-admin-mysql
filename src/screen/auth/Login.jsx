/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import { Container, Row } from "reactstrap";
import LoginSlider from "./component/login-slider";
import LoginTabs from "./component/login-tabs";
import { useAuthContext } from "../../helper/AuthProvider";

const Login = () => {

  const { initialLoading, user } = useAuthContext()

  if(initialLoading === true){
    return null
  }

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="authentication-box">
          <Container>
            <Row>
              <LoginSlider />
              <LoginTabs />
            </Row>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
