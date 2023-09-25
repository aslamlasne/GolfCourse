import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GolfCourse } from "../../Models/GolfCourse";
import CourseForm from "../Shared/CourseForm";
import CourseHoles from "../Shared/CourseHoles";

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($changedCourse: GolfCourseInput!) {
    updateGolfCourse(changedCourse: $changedCourse) {
      id
      name
      address
      zip
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation CreateCourse($newCourse: GolfCourseInput) {
    createGolfCourse(newCourse: $newCourse) {
      id
      name
      address
      zip
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    golfcourse(id: $id) {
      id
      name
      address
      zip
      holes {
        hole_number
        hole_index
        distance_to_hole
        par_strokes
      }

    }
  }
`;


function CoursePage() {
  const navigate = useNavigate();
  const { id } = useParams()
  const course = new GolfCourse();

  const [updateGolfCourse, changedCourse] = useMutation(UPDATE_COURSE, {
    update(cache, {data: {updateGolfCourse}}) {
      navigate(`/courses/${updateGolfCourse.id}`);
    }
  });

  const [createGolfCourse, newCourse] = useMutation(CREATE_COURSE, {
    update(cache, {data: {createGolfCourse}}) {
      navigate(`/courses/${createGolfCourse.id}`);
    }
  });


  const saveCourse = (changedCourse: GolfCourse) => {
    try {
      if (changedCourse.id) {
        updateGolfCourse({
          variables: { changedCourse }
        });
      } else {
        createGolfCourse({
          variables: { newCourse: changedCourse }
        });
      }
    } catch {
      alert("Failed To Save Course!!!");
    }
  }

  const refreshCourse = (changedCourse: GolfCourse) => {
    course.address = changedCourse.address;
    course.id = changedCourse.id;
    course.name = changedCourse.name;
    course.zip = changedCourse.zip;
    course.holes = changedCourse.holes;
  }
  
  const LoadCourse = () => {
    const { data, error, loading } = useQuery(GET_COURSE, {
      variables: { id },
    });
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error || !data) {
      return <div>ERROR</div>;
    }
    const retrievedCourse = data.golfcourse;
    return <>
    <CourseForm selectedCourse={ retrievedCourse } onCourseSelected={ saveCourse } />
    <CourseHoles selectedCourse={ retrievedCourse } onCourseSelected={ refreshCourse } />
    </>
  }

  return (
    <div className='container-fluid'>
      <h1>Golf Course</h1>
      { 
        id ? <>
        <LoadCourse />
      </>
      :
      <>
        <CourseForm selectedCourse={ course } onCourseSelected={ saveCourse }/>
      </>
      }
    </div>
  );

}

export default CoursePage;

