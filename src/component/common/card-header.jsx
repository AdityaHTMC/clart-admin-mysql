import { CardHeader } from "reactstrap";

const CommonCardHeader = ({ title }) => {
  return (
    <CardHeader>
      <h5>{title}</h5>
    </CardHeader>
  );
};

export default CommonCardHeader;
