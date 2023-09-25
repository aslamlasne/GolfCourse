import { gql, useMutation, useQuery } from "@apollo/client";
import { Hole } from "../../Models/Hole";
import { CourseSelected, HoleSelected } from "../../Models/Interfaces";
import { GolfCourse } from "../../Models/GolfCourse";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidationSummary from "./ValidationSummary";

export const SAVE_HOLE = gql`
  mutation AddUpdateHole($hole: HoleInput) {
    addUpdateHole(hole: $hole) {
      hole_number
      hole_index
      distance_to_hole
      par_strokes
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

const CourseHole: React.FC<HoleSelected> = ({ selectedHole, onHoleSelected }) => {
  const [hole_index, setHole_Index] = useState<string>('');
  const [distance_to_hole, setDistance_To_Hole] = useState<string>('');
  const [par_strokes, setPar_Strokes] = useState<string>('');
  const [screenMessages, setScreenMessages] = useState<string[]>([]);

  const setHole = (hole: Hole) => {
    //alert(`setHole is called`);
    setHole_Index(hole.hole_index? hole.hole_index.toString() : '');
    setDistance_To_Hole(hole.distance_to_hole ? hole.distance_to_hole.toString() : '');
    setPar_Strokes(hole.par_strokes ? hole.par_strokes.toString() : '');
  }

  const validateForm = () => {
    let summary: string[] =[];
    if (!hole_index || hole_index === '') {
      summary.push(`Invalid input for hole index. you entered '${hole_index}'`)
    } else {
      let hole_index_number = parseInt(hole_index);
      if (isNaN(hole_index_number)) {
        summary.push(`Invalid input for hole index. you entered '${hole_index}'`)
      }
    }
    if (!distance_to_hole || distance_to_hole === '') {
      summary.push(`Invalid input for distance to hole. you entered '${distance_to_hole}'`)
    } else {
      let distance_to_hole_number = parseInt(distance_to_hole);
      if (isNaN(distance_to_hole_number)) {
        summary.push(`Invalid input for distance to hole. you entered '${distance_to_hole}'`)
      }
    }
    if (!par_strokes || par_strokes === '') {
      summary.push(`Invalid input for par strokes. you entered '${par_strokes}'`)
    } else {
      let par_strokes_number = parseInt(par_strokes);
      if (isNaN(par_strokes_number)) {
        summary.push(`Invalid input for par strokes. you entered '${par_strokes}'`)
      }
    }
    setScreenMessages(summary);
    return summary.length === 0;
  }


  const onDetailsButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (validateForm()) {
      const changedHole:Hole = {
        id: null,
        course_id: 0,
        hole_number: selectedHole.hole_number,
        hole_index: parseInt(hole_index),
        distance_to_hole: parseInt(distance_to_hole),
        par_strokes: parseInt(par_strokes),
      };
      setHole(changedHole);
      onHoleSelected(changedHole);
    }
  }

  useEffect(() => {
    setHole(selectedHole);
  },[])

  return <tr key={selectedHole.id}>
  <td><button className='btn btn-link' onClick={(e) => { onDetailsButtonClick(e) }}>Save</button></td>
  <td>{`${selectedHole.hole_number}`}</td>
  <td><input type="text" className="form-control  input-lg" name="name" value={hole_index} onChange={(e) => setHole_Index(e.target.value)}/></td>
  <td><input type="text" className="form-control  input-lg" name="name" value={distance_to_hole} onChange={(e) => setDistance_To_Hole(e.target.value)}/></td>
  <td><input type="text" className="form-control  input-lg" name="name" value={par_strokes} onChange={(e) => setPar_Strokes(e.target.value)}/></td>
  <td><ValidationSummary screenMessages={screenMessages}/></td>
</tr>
}

const LoadCourseHoles: React.FC<CourseSelected>  = ({ selectedCourse, onCourseSelected }) => {
  const navigate = useNavigate();
  const [screenMessages, setScreenMessages] = useState<string[]>([]);
  const golfCourse: GolfCourse = new GolfCourse();
  const golfCourseHoles:Hole[] = [];

  const [addUpdateHole, changedHole] = useMutation(SAVE_HOLE, {
    update(cache, {data: {addUpdateHole}}) {
      onCourseSelected(selectedCourse);
      refetch();
    }
  });

  const onSelectedHole = (selectedHole: Hole) => {
    try {
      selectedHole.course_id = selectedCourse.id;
      addUpdateHole({
        variables: { hole: selectedHole }
      });
    } catch {
      alert("Failed To Save Hole!!!");
    }
  }

  const { data, error, refetch, loading } = useQuery(GET_COURSE, {
    variables: { id: selectedCourse.id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>ERROR</div>;
  }

  const courseholes:Hole[] = selectedCourse.holes ? selectedCourse.holes : [];
  for(let hcount=1; hcount<19; hcount++) {
    const courseHole = courseholes.find(chole=>chole.hole_number === hcount);
    const courseNewHole = new Hole();
    courseNewHole.hole_number = hcount;
    courseNewHole.course_id = selectedCourse.id;
    if (courseHole) {
      courseNewHole.hole_index = courseHole.hole_index;
      courseNewHole.distance_to_hole = courseHole.distance_to_hole;
      courseNewHole.par_strokes = courseHole.par_strokes;
    }
    golfCourseHoles.push(courseNewHole);
  }

  console.log(`holes ${JSON.stringify(golfCourseHoles)}`);
  return<table className='table table-striped'><tbody>
    <tr>
    <th></th>
    <th>Number</th>
    <th>Index</th>
    <th>Distance</th>
    <th>Strokes</th>
    <th>Messages</th>
    </tr>
  {
    golfCourseHoles.map((eachHole:Hole): ReactElement => {
      return <CourseHole key={eachHole.hole_number} selectedHole={ eachHole } onHoleSelected={ onSelectedHole } />
    })
  }
  </tbody></table>
  
}


const CourseHoles: React.FC<CourseSelected> = ({ selectedCourse, onCourseSelected }) => {

    return <><LoadCourseHoles selectedCourse={ selectedCourse } onCourseSelected={ onCourseSelected } /></>
}

export default CourseHoles;