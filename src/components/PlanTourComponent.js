import { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";

export default function PlanTourComponent(){

  
    const [empId, setempId] = useState()
    const [packageId, setPackageId] = useState()
    useEffect(()=> {
      //logic for getting a value from local storage stored under the key 'key'
      const empid = (localStorage.getItem('EmployeeId'));
      console.log("Employee ID "+empid)
      setempId(empid)
      const packageidses= (localStorage.getItem('packageidforplantour'));

   
      console.log("Package ID "+packageId)
      
      setPackageId(packageidses);
   
    },[])
 
    
    console.log(empId)

    const init = {
        startdate: { value: "", hasError: true, touched: false, error: "" },
        lastdate: { value: "", hasError: true, touched: false, error: "" }, 
        lastdate_apply: { value: "", hasError: false, touched: false, error: "" },
        duration: { value: "", hasError: false, touched: false, error: "" },
        availseats:{ value: 0, hasError: false, touched: false, error: "" },
        employeeid:{ value: 0, hasError: false, touched: true, error: "" },
        packageidobj:{ value: 0, hasError: false, touched: true, error: "" },
        isFormValid: false
       }


      
        const reducer = (state, action) => {
          //console.log(state);
          switch (action.type) {
              case 'update': {
                  const { name, value, hasError, error, touched, isFormValid } = action.data;
                  return {
                      ...state,
                      [name]: { ...state[name], value, hasError, error, touched },
                      isFormValid
                  }   //modifying and returning new object as state
              }
              case 'reset': {
                  return init;
              }
          }
      }
      const [info,dispatch] =useReducer(reducer,init);
      const navigate = useNavigate();
      const onInputChange = (name, value, dispatch) => {
        //validation logic
        const { hasError, error } = validateData(name, value); //form field, latest value

        //which key to be modified - value, hasError, error, touched 
        let isFormValid = true;
        for (const key in info) {
            let item = info[key];
           /* if(key === name && hasError)
            {
                isFormValid = false;
                break;
            }
            else if(key !== name && item.hasError)
            {
                isFormValid = false;
                break;
            }*/
            if (item.hasError) {
                isFormValid = false;
                break;
            }
        }
        //gethered one more value - isFormValid
        //dispatch({type:'update',data:{name,value,hasError,error,touched: true, isFormValid}})

        //sending action object
        dispatch({ type: 'update', data: { name, value, hasError, error, touched: true, isFormValid } })

    }

    const onFocusOut = (name, value, dispatch) => {
        const { hasError, error } = validateData(name, value)
        let isFormValid = true
        for (const key in info) {
            const item = info[key]
            if (key === name && hasError) {
                isFormValid = false
                break
            } else if (key !== name && item.hasError) {
                isFormValid = false
                break
            }
        }
        dispatch({
            type: "update",
            data: { name, value, hasError, error, touched: true, isFormValid },
        })
    }

      
       const sendData = (e)=>{
        e.preventDefault();
        const reqOptions = {
        method : 'POST',
        headers : {'content-type':'application/json'},
        body : JSON.stringify({
          startdate : info.startdate.value,
          lastdate: info.lastdate.value, 
          lastdate_apply: info.lastdate_apply.value,
          duration: info.duration.value,
          availseats:info.availseats.value,
          employeeid:empId,
          packageidobj:1,
        })
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
  

    var startdate1=new Date(info.startdate.value)
    var lastdate1 = new Date(info.lastdate.value);
    let todaysDate = new Date()
    console.log("todaysdate "+todaysDate)
    console.log("Startdate "+startdate1)
    console.log("lastdate "+lastdate1)
    const validateData = (name, value) => {
     let hasError = false, error = "";

     switch (name) {
         case "startdate":
         
            if(startdate1<todaysDate)
            {
                 hasError = true;
                 error = "Starting date Should be after Today"
              
           }
           
           break;
         case "lastdate":   
           if(lastdate1<startdate1)
           {
               
                hasError = true;
                error = "Last Date Should be greater than Starting date"
          }
          
           }
           return { hasError, error }
     }
    return (
       <div>
       
        <div class="d-flex justify-content-around">
                      <Form>
             
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="date" 
                                        placeholder="startdate"  name="startdate" id="startdate" 
                                        value={info.startdate.value}
                                        onChange={(e) => { onInputChange("startdate", e.target.value, dispatch) }}
                                        onBlur={(e) => { onFocusOut("startdate", e.target.value, dispatch) }}   
                                        required  />
                        </Form.Group>
                        <p style={{ display: info.startdate.touched && info.startdate.hasError ? "block" : "none", color: "red" }}> {info.startdate.error} </p>
                                              
                        <Form.Group>
                        
                         <Form.Control className="mb-3" size = "lg" type="date" 
                                        placeholder="lastdate"  name="lastdate" id="lastdate" 
                                        value={info.lastdate.value}
                                        onChange={(e) => { onInputChange("lastdate", e.target.value, dispatch) }}
                                        onBlur={(e) => { onFocusOut("lastdate", e.target.value, dispatch) }}       
                                        required  /> 
                        </Form.Group>
                        <p style={{ display: info.lastdate.touched && info.lastdate.hasError ? "block" : "none", color: "red" }}> {info.lastdate.error} </p>
                           
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="date" 
                                        placeholder="lastdate_apply"  name="lastdate_apply" id="lastdate_apply" 
                                        value={info.lastdate_apply.value}
                                        onChange={(e) => { onInputChange("lastdate_apply", e.target.value, dispatch) }}
                                        onBlur={(e) => { onFocusOut("lastdate_apply", e.target.value, dispatch) }}      
                                        required  /> 
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="text" placeholder="duration" name="duration" id="duration" 
                                        value={info.duration.value}
                                        onChange={(e) => { onInputChange("duration", e.target.value, dispatch) }}
                                        onBlur={(e) => { onFocusOut("duration", e.target.value, dispatch) }} 
                           required />
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="number" placeholder="availseats" name="availseats" id="availseats"
                                        value={info.availseats.value}
                                        onChange={(e) => { onInputChange("availseats", e.target.value, dispatch) }}
                                        onBlur={(e) => { onFocusOut("availseats", e.target.value, dispatch) }} 
                                        required/>
                        </Form.Group>
                        <fieldset disabled>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="number" placeholder="packageidobj" name="packageidobj" id="packageidobj" 
                                        value={packageId}
                                        
                                        onBlur={(e) => { onFocusOut("packageidobj", e.target.value, dispatch) }}
                          />
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="number" placeholder="employeeid" name="employeeid" id="employeeid" 
                                        value={empId}
                                        onBlur={(e) => { onFocusOut("employeeid", e.target.value, dispatch) }}
                          />
                        </Form.Group>
                        </fieldset>
                        
            <Button variant="primary" type="submit"  onClick={(e)=>{sendData(e)}} disabled={info.isFormValid ? false : true} >
               Click here to Plan Tour
            </Button>
            <button id="c-dispimgbtn">
                <Link to="/employee_home" id="c-dispimgbtn">Close</Link>
            </button>
          </Form>
          </div>
       </div>
      );
}
