import './App.css';
import PageHeader from './components/Shared/PageHeader';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/Home/AboutPage';
import SignUpPage from './components/User/SignUpPage';
import SignInPage from './components/User/SignInPage';
import UserListPage from './components/User/UserListPage';
import UserPage from './components/User/UserPage';
import CoursePage from './components/Course/CoursePage';
import CourseListPage from './components/Course/CourseListPage';
import { SignedinUser } from './Models/SignedinUser';
import useSignedUser from './Services/useSignedUser';
import Protected from './components/Shared/Protected';

function App() {
  const { setSignedInUser, signedInUser } = useSignedUser();
  if(!signedInUser || (signedInUser && !signedInUser.authenticated)) {
    return <SignInPage onUserSignedIn={setSignedInUser} />
  }
  
  return (
    <div className="container">
        <PageHeader></PageHeader>
        <BrowserRouter>
          <Routes>
            <Route path='/signin' element={<SignInPage onUserSignedIn={setSignedInUser}/>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={ <AboutPage /> } />
            <Route path="/signup" element={ <SignUpPage /> } />
            <Route path="/users" element={ <Protected><UserListPage /></Protected> }/>
            <Route path="/users/:id" element={ <Protected><UserPage /></Protected> } />
            <Route path="/newcourse" element={ <Protected><CoursePage /></Protected> } />
            <Route path="/courses" element={ <Protected><CourseListPage /></Protected> } />
            <Route path="/courses/:id" element={ <Protected><CoursePage /></Protected> } />
            <Route element={ <HomePage /> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
