import { GolfCourse } from "./GolfCourse";
import { Hole } from "./Hole";
import { User } from "./User";
import { SigninUser } from "./SigninUser";
import { SignedinUser } from "./SignedinUser";

export interface UserSelected { 
  selectedUser: User 
  onUserSelected(user:User): void
}

export interface UserSignIn { 
  onUserSignIn(user:SigninUser): void
}

export interface UserSignedIn { 
  onUserSignedIn(user:SignedinUser): void
}

export interface CourseSelected {
  selectedCourse: GolfCourse
  onCourseSelected(course: GolfCourse): void
}

export interface HoleSelected {
  selectedHole: Hole
  onHoleSelected(hole: Hole): void
}

export interface ScreenMessages { 
  screenMessages: string[] 
}

export interface Props {
  children: React.ReactNode
}
