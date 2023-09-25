import { useEffect, useState } from "react";
import ValidationSummary from "./ValidationSummary";
import { CourseSelected } from "../../Models/Interfaces";
import { GolfCourse } from "../../Models/GolfCourse";
import { useNavigate } from "react-router-dom";

const CourseForm: React.FC<CourseSelected> = ({ selectedCourse, onCourseSelected }) => {
  const [screenMessages, setScreenMessages] = useState<string[]>([]);
  const [course_Name, setCourse_Name] = useState<string>('');
  const [course_Address, setCourse_Address] = useState<string>('');
  const [course_Zip, setCourse_Zip] = useState<string>('');
  const navigate = useNavigate();
  
  const validateForm = () => {
    let summary: string[] =[];
    if (!course_Name || course_Name === '') {
      summary.push(`Invalid input for name. you entered '${course_Name}'`)
    }
    if (!course_Address || course_Address === '') {
      summary.push(`Invalid input for address. you entered '${course_Address}'`)
    }
    if (!course_Zip || course_Zip === '') {
      summary.push(`Invalid input for zip. you entered '${course_Zip}'`)
    }
    setScreenMessages(summary);
    return summary.length === 0;
  }

  const setCourse = (course: GolfCourse) => {
    setCourse_Name(course.name);
    setCourse_Address(course.address);
    setCourse_Zip(course.zip);
  }

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const changedCourse:GolfCourse = {
          id: selectedCourse.id,
          name: course_Name,
          address: course_Address,
          zip: course_Zip,
          holes: null
        };
        onCourseSelected(changedCourse);
      }
    } catch (ex) {
      setScreenMessages(["Failed to save the user!!!"]);
    }

  }

  const goto_course_list = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate(`/courses`)
  }

  useEffect(() => {
    setCourse(selectedCourse);
  },[selectedCourse])

  return (
    <div className='row g-3 align-items-center'>
        {
          <ValidationSummary screenMessages={ screenMessages }/>
        }
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control  input-lg" name="name" value={course_Name} onChange={(e) => setCourse_Name(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="username">Address</label>
          <input type="text" className="form-control" name="username" value={course_Address}   onChange={(e) => setCourse_Address(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Zip</label>
          <input type="text" className="form-control" name="date_of_birth" value={course_Zip}  onChange={(e) => setCourse_Zip(e.target.value)}/>
        </div>
        <div className="form-group">
          <button onClick={(e) => submit(e)}>Save</button>&nbsp;&nbsp;
          <button onClick={(e) => goto_course_list(e)}>List</button>&nbsp;&nbsp;
        </div>
      </div>
  ) 
}

export default CourseForm;

