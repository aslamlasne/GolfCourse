import './App.css';
import PageHeader from './components/Shared/PageHeader';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/Home/AboutPage';
import SignUpPage from './components/User/SignUpPage';
import UserListPage from './components/User/UserListPage';
import UserPage from './components/User/UserPage';
import CoursePage from './components/Course/CoursePage';
import CourseListPage from './components/Course/CourseListPage';

function App() {
  return (
    <div className="container">
        <PageHeader></PageHeader>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={ <AboutPage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
            <Route path="/users" element={ <UserListPage /> } />
            <Route path="/users/:id" element={ <UserPage /> } />
            <Route path="/newcourse" element={ <CoursePage /> } />
            <Route path="/courses" element={ <CourseListPage /> } />
            <Route path="/courses/:id" element={ <CoursePage /> } />
            <Route element={ <HomePage /> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
