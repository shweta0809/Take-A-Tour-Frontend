import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function AddPackageComponent(){
  
    const init = {
        "packagename": "",
        "packageprice": 0, 
        "duration": "",
        "tourist_capacity": 0,
        "description": "",
        "locations": ""
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
       const [file, setFile] = useState();

       const sendData = (e)=>
       {
         e.preventDefault();
         const reqOptions = {
            method : 'POST',
            headers : {'content-type':'application/json'},
            body : JSON.stringify(info)
         }
         fetch("http://localhost:8080/addPackage",reqOptions)
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
            const fd = new FormData();
            fd.append("file", file);
           const reqOptions1 =
           {
               method: 'POST',
               //headers: { 'Content-Type': 'multipart/form-data' },
               body: fd
           }
           // to check image is uploaded or not , package_id sending as path variable
           fetch("http://localhost:8080/uploadpackageimage/"+obj.package_id, reqOptions1)
               // .then(resp=>console.log(resp))
               .then(resp => resp.json())
               .then(obj => {
                   if (obj) {
                       alert("successfully added package");
                       navigate("/employee_home");
                   }
                   else {
                       alert("successfully added package but image uploading failure, try again");
                       navigate("/employee_home");
                   }
               })

         })     
     .catch((error) =>  alert("server error try after some time"));
    }  
    return (
        <div >
            <div>
            <h4>Add Package Form</h4>
            </div>
            <div class="d-flex justify-content-around">
                      <Form>
             
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="text" 
                                        placeholder="packagename"  name="packagename" id="packagename" 
                                        onChange={(e)=>{dispatch({type:'update',fld:"packagename", val: e.target.value})}}    required  />
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="number" 
                                        placeholder="packageprice"  name="packageprice" id="packageprice"
                                        onChange={(e)=>{dispatch({type:'update',fld:"packageprice", val: e.target.value})}}  required/>
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="text" placeholder="duration"  name="duration" id="duration"
                          onChange={(e)=>{dispatch({type:'update',fld:"duration", val: e.target.value})}}  required/>
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="number" placeholder="tourist_capacity" name="tourist_capacity" id="tourist_capacity" 
                         onChange={(e)=>{dispatch({type:'update',fld:"tourist_capacity", val: e.target.value})}}  required />
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="text" placeholder="description" name="description" id="description"
                          onChange={(e)=>{dispatch({type:'update',fld:"description", val: e.target.value})}}  required/>
                        </Form.Group>
                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="text" placeholder="location" name="location" id="location" 
                         onChange={(e)=>{dispatch({type:'update',fld:"location", val: e.target.value})}}  required/>
                        </Form.Group>

                        <Form.Group>
                        
                        <Form.Control className="mb-3" size = "lg" type="file" placeholder="packageimages" name="packageimages" id="packageimages"  
                        onChange={(e) => { setFile(e.target.files[0]) }}
                         multiple required/>
                        </Form.Group>

                 
          
            <Button variant="primary" type="submit"  onClick={(e)=>{sendData(e)}} >
               Click here to Add Package
            </Button>
          </Form>
          </div>
        
        </div>
      );




}
