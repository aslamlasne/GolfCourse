import { useEffect, useState } from "react";
import ValidationSummary from "./ValidationSummary";
import { FormatDate, ValidateDate } from "../../Services/Utility";
import { UserSignIn } from "../../Models/Interfaces";
import { User } from "../../Models/User";
// import { useNavigate } from "react-router-dom";
import { SigninUser } from "../../Models/SigninUser";

const UserSigninForm: React.FC<UserSignIn> = ({ onUserSignIn }) => {
  const [screenMessages, setScreenMessages] = useState<string[]>([]);
  const [user_UserName, setUser_UserName] = useState<string>('');
  const [user_Password, setUser_Password] = useState<string>('');
  // const navigate = useNavigate();
  
  const validateForm = () => {
    let summary: string[] =[];
    if (!user_Password || user_Password === '') {
      summary.push(`Invalid input for password. you entered '${user_Password}'`)
    }
    if (!user_UserName || user_UserName === '') {
      summary.push(`Invalid input for username. you entered '${user_UserName}'`)
    }
    setScreenMessages(summary);
    return summary.length === 0;
  }

  const setUser = (user: User) => {
    setUser_UserName(user.username);
    setUser_Password(user.password);
  }

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const signedinUser:SigninUser = {
          username: user_UserName,
          password: user_Password,
        };
        onUserSignIn(signedinUser);
      }
    } catch (ex) {
      setScreenMessages(["Failed to save the user!!!"]);
    }

  }

//  const goto_forgot_password = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // navigate(`/users`)
//  }

//  const goto_signup_page = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // navigate(`/signup`)
//  }

  useEffect(() => {
    
  },[])

  return (
    <div className='row g-3 align-items-center'>
        {
          <ValidationSummary screenMessages={ screenMessages }/>
        }
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input type="text" className="form-control" name="username" value={user_UserName}   onChange={(e) => setUser_UserName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" value={user_Password}   onChange={(e) => setUser_Password(e.target.value)}/>
        </div>
        <div className="form-group">
          <button onClick={(e) => submit(e)}>Log In</button>
        </div>
    </div>
  );
}

export default UserSigninForm;

