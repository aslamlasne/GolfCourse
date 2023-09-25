import React, { ReactElement } from 'react';
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { CourseSelected } from '../../Models/Interfaces';
import { GolfCourse } from '../../Models/GolfCourse';

export const ALL_COURSES = gql`
  query Courses {
    golfcourses {
      id
      name
      address
      zip
    }
  }
`;

const CourseList = () => {
  const { data, error, loading } = useQuery(ALL_COURSES);
  const navigate = useNavigate();

  const onSelectedCourse = ( selectedCourse: GolfCourse ) => {
    navigate(`/courses/${selectedCourse.id}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }
  const courses = data.golfcourses;
  return<table className='table table-striped'><tbody>
    <tr>
    <th></th>
    <th>Name</th>
    <th>Address</th>
    <th>Zip</th>
    </tr>
  {
    courses.map((eachCourse:GolfCourse): ReactElement => {
      return <CourseListItem key={eachCourse.id} selectedCourse={ eachCourse } onCourseSelected={ onSelectedCourse } />
    })
  }
  </tbody></table>
};


const CourseListItem: React.FC<CourseSelected> = ({ selectedCourse, onCourseSelected }) => {
  const onDetailsButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onCourseSelected(selectedCourse);
  }
  return <tr key={selectedCourse.id}>
  <td><button className='btn btn-link' onClick={(e) => { onDetailsButtonClick(e) }}>Details</button></td>
  <td>{`${selectedCourse.name}`}</td>
  <td>{`${selectedCourse.address}`}</td>
  <td>{`${selectedCourse.zip}`}</td>
</tr>
}

function CourseListPage() {
  return (
    <div className='container-fluid'>
        <h1>Courses</h1>
        <div className='row g-3 align-items-center'>
          {
            <CourseList />
          }
      </div>
    </div>
  );
}

export default CourseListPage;