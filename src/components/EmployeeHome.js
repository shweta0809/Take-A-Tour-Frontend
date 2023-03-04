import { useEffect, useState } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import "../CSS/Style.css"

export default function EmployeeHome()
{
       // here saving info of logged tourist
const [employee , setEmployee] = useState(null);

useEffect( ()=>
{

    // saving in login component , and fetch here
    const loginid = JSON.parse(localStorage.getItem("loggedinfo")).login_id;
    console.log("loginid : "+ loginid);

    fetch("http://localhost:8080/employeegetbyid?eid="+loginid)
    .then(resp => {if(resp.ok)
        { 
          
          return resp.text();
        }
      else
        {
       
          throw  new Error("server error")  
        }
      })
    // .then(text => text.length ? JSON.parse(text):{})
    .then(obj =>  {
        //console.log(JSON.stringify(obj))
        //localStorage.setItem("loggedemployee",JSON.stringify(obj))
        localStorage.setItem("loggedemployee",obj)
        setEmployee(obj);
    })

} ,[])
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
                                <Link to="plantour" className="c-navlink px-3">Plan Tour</Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="logout" className="c-navlink px-3">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <h1>
                Employee Home
            </h1>
            <h1>Welcome {employee && employee.e_fname} {employee && employee.e_lname}</h1> 
            <img src={`data:image/jpeg;base64,${employee && employee.e_photo}` }width="200" height="200" className='c-empaccphoto'/>
    <Outlet/>
        </div>

    )
}