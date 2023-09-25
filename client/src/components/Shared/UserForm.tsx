import { useEffect, useState } from "react";
import ValidationSummary from "./ValidationSummary";
import { FormatDate, ValidateDate } from "../../Models/Utility";
import { UserSelected } from "../../Models/Interfaces";
import { User } from "../../Models/User";
import { useNavigate } from "react-router-dom";

const UserForm: React.FC<UserSelected> = ({ selectedUser, onUserSelected }) => {
  const [screenMessages, setScreenMessages] = useState<string[]>([]);
  const [user_Name, setUser_Name] = useState<string>('');
  const [user_UserName, setUser_UserName] = useState<string>('');
  const [user_DateOfBirth, setUser_DateOfBirth] = useState<string>('');
  const [user_Gender, setUser_Gender] = useState<string>('');
  const [user_Password, setUser_Password] = useState<string>('');
  const [user_Handicap, setUser_Handicap] = useState<string>('');
  const [user_CalculatedOn, setUser_CalculatedOn] = useState<string>('');
  const [user_Email, setUser_Email] = useState<string>('');
  const navigate = useNavigate();
  
  const validateForm = () => {
    let summary: string[] =[];
    if (!user_Name || user_Name === '') {
      summary.push(`Invalid input for name. you entered '${user_Name}'`)
    }
    if (!user_Password || user_Password === '') {
      summary.push(`Invalid input for password. you entered '${user_Password}'`)
    }
    if (!user_UserName || user_UserName === '') {
      summary.push(`Invalid input for username. you entered '${user_UserName}'`)
    }
    if (!user_Gender || user_Gender === '') {
      summary.push(`Invalid input for gender. you entered '${user_Gender}'`)
    } else {
      if (!(user_Gender === 'Male' || user_Gender === 'Female'))
      {
        summary.push(`Invalid input for gender. you entered '${user_Gender}'`)
      }
    }
    if (!user_DateOfBirth || user_DateOfBirth === '') {
      summary.push(`Invalid input for date_of_birth. you entered '${user_DateOfBirth}'`)
    }
    else {
      if (!ValidateDate(user_DateOfBirth)) {
        summary.push(`Invalid input for dateOfBirth. you entered '${user_DateOfBirth}'`)
      }
    }
    if (!user_Email || user_Email === '') {
      summary.push(`Invalid input for email. you entered '${user_Email}'`)
    }
    if (user_Handicap) {
      let handicap = parseInt(user_Handicap);
      if (isNaN(handicap)) {
        summary.push(`Invalid input for handicap. you entered '${user_Handicap}'`)
      }
    }
    if (user_CalculatedOn) {
      if (!ValidateDate(user_CalculatedOn)) {
        summary.push(`Invalid input for calculatedOn. you entered '${user_CalculatedOn}'`)
      }
    }
    setScreenMessages(summary);
    return summary.length === 0;
  }

  const setUser = (user: User) => {
    setUser_Name(user.name);
    setUser_UserName(user.username);
    setUser_DateOfBirth(FormatDate(user.date_of_birth));
    setUser_Gender(user.gender);
    setUser_Password(user.password);
    setUser_Handicap(user.handicap ? user.handicap?.toString() : '' );
    setUser_CalculatedOn(user.calculated_on ? FormatDate(user.calculated_on?.toString()) : '');
    setUser_Email(user.email);
  }
  const timestamp = (dateIn: string) => {
    const datetime = (new Date(dateIn));
    var dateString = new Date(
      datetime.getTime() - datetime.getTimezoneOffset() * 60000
    );
    var curr_time = dateString.toISOString();
    return curr_time;
  }

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    alert(timestamp(user_DateOfBirth));
    try {
      if (validateForm()) {
        const changedUser:User = {
          id: selectedUser.id,
          name: user_Name,
          username: user_UserName,
          password: user_Password,
          gender: user_Gender,
          date_of_birth: timestamp(user_DateOfBirth),
          handicap: parseInt(user_Handicap),
          calculated_on: user_CalculatedOn ? timestamp(user_CalculatedOn) : null,
          email: user_Email
        };
        alert(`submit - changedUser - ${JSON.stringify(changedUser)}`);
        onUserSelected(changedUser);
      }
    } catch (ex) {
      setScreenMessages(["Failed to save the user!!!"]);
    }

  }

  const goto_user_list = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate(`/users`)
  }

  const goto_signup_page = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate(`/signup`)
  }

  useEffect(() => {
    setUser(selectedUser);
  },[selectedUser])

  return (
    <div className='row g-3 align-items-center'>
        {
          <ValidationSummary screenMessages={ screenMessages }/>
        }
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control  input-lg" name="name" value={user_Name} onChange={(e) => setUser_Name(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select className="form-control" name="gender" value={user_Gender}  onChange={(e) => setUser_Gender(e.target.value)}>
            <option value="">Select one</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input type="text" className="form-control" name="date_of_birth" value={user_DateOfBirth}  onChange={(e) => setUser_DateOfBirth(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" name="email" value={user_Email}  onChange={(e) => setUser_Email(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input type="text" className="form-control" name="username" value={user_UserName}   onChange={(e) => setUser_UserName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" value={user_Password}   onChange={(e) => setUser_Password(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="handicap">Handicap?</label>
          <input type="text" className="form-control" name="handicap" value={user_Handicap ?? ''}  onChange={(e) => setUser_Handicap(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="calculated_on">Calculated On</label>
          <input type="text" className="form-control" name="calculated_on" value={user_CalculatedOn ?? ''}  onChange={(e) => setUser_CalculatedOn(e.target.value)}/>
        </div>
        <div className="form-group">
          <button onClick={(e) => submit(e)}>Save</button>&nbsp;&nbsp;
          <button onClick={(e) => goto_user_list(e)}>List</button>&nbsp;&nbsp;
          <button onClick={(e) => goto_signup_page(e)}>Signup</button>
        </div>
    </div>
  );
}

export default UserForm;

