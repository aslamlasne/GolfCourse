import { GolfCourse } from "./GolfCourse";
import { Hole } from "./Hole";
import { User } from "./User";

export interface UserSelected { 
  selectedUser: User 
  onUserSelected(user:User): void
}

export interface CourseSelected {
  selectedCourse: GolfCourse
  onCourseSelected(course: GolfCourse): void
}

export interface HoleSelected {
  selectedHole: Hole
  onHoleSelected(hole: Hole): void
}

export interface ScreenMessages { screenMessages: string[] }
