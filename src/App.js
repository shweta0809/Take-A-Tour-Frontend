import logo from './logo.svg';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginComponent from './components/LoginComponent';
import AdminHome from './components/AdminHome';
import TouristHome from './components/TouristHome';
import EmployeeHome from './components/EmployeeHome';
import HomeComponent from './components/HomeComponent';
import SignUpTouristComponent from './components/SignUpTouristComponent';
import { useSelector } from 'react-redux';
import LogoutComponent from './components/LogoutComponent';
import AddEmployee from './components/AddEmployeeComponent';
import AddPackageComponent from './components/AddPackageComponent';
import PlanTourComponent from './components/PlanTourComponent';


function App() {


  // initialstate of logged slice
  const mystate = useSelector((state) => state.logged);
  console.log(mystate);

  return (

    <div className="App">
      {/* <h1 className="bg-primary text-white">welcome to world</h1> */}

      <div style={{ display: mystate.loggedIn ? "none" : "block" }}>

        <nav className="navbar navbar-expand-sm mb-3 c-navcolor">
          <div className="container-fluid ">

            <div className="c-webname">
              Take A Tour
            </div>

            <ul className="navbar-nav navbar-right ">
              <li className="nav-item ">
                <Link to="/" className="c-navlink px-3">Home</Link>
              </li>

              <li className="nav-item">
                <Link to="signup" className="c-navlink px-3">Sign Up</Link>
              </li>

              <li className="nav-item">
                <Link to="login" className="c-navlink px-3">Login</Link>
              </li>
            </ul>
          </div>

        </nav>
      </div>

      <div >
        <Routes>
          <Route path="/" element={<HomeComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/admin_home" element={<AdminHome />}>
                <Route path="home" element={<AdminHome />}></Route>
                <Route path="addaccemp" element={<AddEmployee />}></Route>
                <Route path="logout" element={<LogoutComponent/>}></Route>
          </Route>

          <Route path="/tourist_home" element={<TouristHome />}>
                 <Route path="home" element={<HomeComponent />}></Route>
                 <Route path="" element={<HomeComponent />}></Route>
                 <Route path="logout" element={<LogoutComponent/>}></Route>
          </Route>
          <Route path="/employee_home" element={<EmployeeHome />}>
               <Route path="addpackage" element={<AddPackageComponent/>}></Route>
                <Route path="plantour" element={<PlanTourComponent/>}></Route>
               <Route path="logout" element={<LogoutComponent/>}></Route>

          </Route>


          <Route path="/signup" element={<SignUpTouristComponent />}></Route>

        </Routes>
      </div>
       {/* <Slideshow></Slideshow> */}
    </div>
  );
}

export default App;