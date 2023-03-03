import { Link, Route, Routes } from 'react-router-dom';
export default function EmployeeHome()
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
                                <Link to="/" className="c-navlink px-3"></Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link to="addpackage" className="c-navlink px-3">Add Package</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="profile" className="c-navlink px-3">Profile</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <h1>
                Employee Home
            </h1>

        </div>

    )
}