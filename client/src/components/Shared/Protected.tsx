import { Navigate } from "react-router-dom";
import useSignedUser from "../../Services/useSignedUser";
import { Props } from "../../Models/Interfaces";
const Protected: React.FunctionComponent<Props> = (props:Props) => {
  const { setSignedInUser, signedInUser } = useSignedUser();
  if (!signedInUser || !signedInUser.authenticated) {
    return <Navigate to="/" replace />;
  }
  return <div id="page-content-wrapper">
    {props.children}
  </div>
};
export default Protected;
