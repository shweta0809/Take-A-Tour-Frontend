import { Link, Outlet, Route, Routes } from 'react-router-dom';
export default function AdminHome()
{
    return(
        <div>
             <div >
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
                                <Link to="addaccemp" className="c-navlink px-3">Add Employee</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="logout" className="c-navlink px-3">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <h1>
                Admin Home
            </h1>
            <Outlet/>
        </div>

    )
}