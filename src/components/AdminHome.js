import { Row,Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "../CSS/HomeStyle.css";

export default function AdminHome() {
    return (
        <div>
            <Container fluid >
          <Row>
            <nav className="navbar navbar-expand-sm mb-3 c-navcolor">
                <div className="container-fluid ">

                    <div className="c-webname">
                        Take A Tour
                    </div>

                    <ul className="navbar-nav navbar-right ">

                        <li className="nav-item ">
                            <Link to="home" className="c-navlink px-3">Home</Link>
                        </li>
                        <li className="nav-item ">
                            <Link to="addaccemp" className="c-navlink px-3">Add Employee</Link>
                        </li>
                        <li className="nav-item ">
                            <Link to="logout" className="c-navlink px-3">Logout</Link>
                        </li>


                    </ul>
                </div>

            </nav>
            {/* <Col md={{span: 4 , offset : 4}} >
            <h2 >
                Admin Home
            </h2>
            </Col> */}
            </Row>
            </Container>
            <Outlet/>

        </div>

    )
}