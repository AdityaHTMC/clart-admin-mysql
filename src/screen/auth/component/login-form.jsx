// import Cookies from "js-cookie";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
// import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Spinner } from "reactstrap";
import SocialMediaIcons from "./social-media-icon";
import { useAuthContext } from "../../../helper/AuthProvider";

const LoginForm = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const  { admin_login } = useAuthContext()
  const [isProcessing, setIsProcessing] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // const { email, password } = formValues;

  const handleUserValue = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const formSubmitHandle = async (event) => {
    event.preventDefault();
    setIsProcessing(true)
    await admin_login(formValues)
    setIsProcessing(false)
  };

  return (
    <Form className="form-horizontal auth-form" onSubmit={formSubmitHandle}>
      <FormGroup>
        <Input required onChange={handleUserValue} type="email" value={formValues.email} placeholder="Enter email" name="email" />
      </FormGroup>
      <FormGroup>
        <InputGroup onClick={() => setShowPassWord(!showPassWord)}>
          <Input required onChange={handleUserValue} type={showPassWord ? "text" : "password"} name="password"  value={formValues.password} placeholder="Password" />
          <InputGroupText>{showPassWord ? <Eye /> : <EyeOff />}</InputGroupText>
        </InputGroup>
      </FormGroup>

      <div className="form-terms">
        <div className="custom-control custom-checkbox me-sm-2">
          <Label className="d-block">
            <Input className="checkbox_animated" id="chk-ani2" type="checkbox" />
            Reminder Me
            <span className="pull-right">
              <Button color="transparent" className="forgot-pass p-0">
                lost your password
              </Button>
            </span>
          </Label>
        </div>
      </div>

      <div className="form-button">
        <Button color="primary" type="submit" disabled={isProcessing}>
          {isProcessing ? <Spinner size={'sm'} /> : 'Login'}
        </Button>
      </div>
      <div className="form-footer">
        <span>Or Login up with social platforms</span>
        <SocialMediaIcons />
      </div>
    </Form>
  );
};

export default LoginForm;
