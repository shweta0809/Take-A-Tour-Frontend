import { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export default function PlanTourComponent(){

   
    const [empId, setempId] = useState()
    useEffect(()=> {
      //logic for getting a value from local storage stored under the key 'key'
      const empid = JSON.parse(localStorage.getItem('loggedemployee')).employee_id;
      console.log("Employee ID "+empid)
      setempId(empid)
    },[])
 
    
    console.log(empId)

    const init = {
        "startdate": "",
        "lastdate": "", 
        "lastdate_apply": "",
        "duration": "",
        "availseats": 0,
        "employeeid":1,
        "packageidobj":1
       }

       const reducer = (state,action) => {
        switch(action.type)
        {
            case 'update':
                 return {...state ,[action.fld]:action.val}
            case 'reset':
                 return init;
        }
    
       }
       
       const [info,dispatch] =useReducer(reducer,init);
       const navigate = useNavigate();
       const sendData = (e)=>{
        e.preventDefault();
        const reqOptions = {
        method : 'POST',
        headers : {'content-type':'application/json'},
        body : JSON.stringify(info)
     }
     fetch("http://localhost:8080/addPlannedTour",reqOptions)
     .then(resp => {if(resp.ok)
                      { 
                        return resp.text();
                      }
                    else
                      {
                     
                        throw  new Error("server error")  
                      }
                    })
     .then(text => text.length ? JSON.parse(text):{})
     .then(obj => {
        if (obj) {
            alert("successfully planned tour");
            navigate("/employee_home");
        }
        else {
            alert("failed in planning ");
            navigate("plantour");
        }
     })
    }
    return (
       <div>
        <div class="d-flex justify-content-around">
                      <Form>
             
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="date" 
                                        placeholder="startdate"  name="startdate" id="startdate" 
                                        onChange={(e)=>{dispatch({type:'update',fld:"startdate", val: e.target.value})}}    
                                        required  />
                        </Form.Group>
                        <Form.Group>
                        
                         <Form.Control className="mb-3" size = "lg" type="date" 
                                        placeholder="lastdate"  name="lastdate" id="lastdate" 
                                        onChange={(e)=>{dispatch({type:'update',fld:"lastdate", val: e.target.value})}}    
                                        required  /> 
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="date" 
                                        placeholder="lastdate_apply"  name="lastdate_apply" id="lastdate_apply" 
                                        onChange={(e)=>{dispatch({type:'update',fld:"lastdate_apply", val: e.target.value})}}    
                                        required  /> 
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="text" placeholder="duration" name="duration" id="duration" 
                         onChange={(e)=>{dispatch({type:'update',fld:"duration", val: e.target.value})}}  required />
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="number" placeholder="availseats" name="availseats" id="availseats"
                          onChange={(e)=>{dispatch({type:'update',fld:"availseats", val: e.target.value})}}  required/>
                        </Form.Group>
                        <fieldset disabled>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="number" placeholder="packageidobj" name="packageidobj" id="packageidobj"
                          //onLoad={(e)=>{dispatch({type:'update',fld:"packageidobj", val:{empId} })}} 
                          />
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="number" placeholder="employeeid" name="employeeid" id="employeeid" value={empId}
                         //value={empId} onLoad={(e)=>{dispatch({type:'update',fld:"employeeid", val:{empId} })}} 
                          />
                        </Form.Group>
                        </fieldset>
                        
            <Button variant="primary" type="submit"  onClick={(e)=>{sendData(e)}} >
               Click here to Plan Tour
            </Button>
          </Form>
          </div>
       </div>
      );
}
