import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/Style.css"
import NavbarComponent from './NavbarComponent';
export default function ForgetPassword() {


    const [userid, setUserid] = useState("");
    const navigate =useNavigate();

    const sendData = () => {
        console.log(userid);
        fetch("http://localhost:8080/forgotpassword?userid=" + userid)
          //.then(resp=>console.log(resp))
        //   .then((resp) => resp.json())
          .then(resp => {if(resp.ok)
            { 
                alert("Check your email for new password")
                navigate("/login");
                               
            }
          else
            {
                alert("Please enter correct user ID")
              throw  new Error("server error")  
            }
          })
          
         
      };


        return(

            <div>
              <NavbarComponent/>
                   <div className='c-forgetpwddiv'>   
                        <form>
                            <h5>Forgot Password</h5>
                            <input type="text" name="uid" id="uid" placeholder='UserId'  onChange={(e) => {setUserid(e.target.value)}}></input>
                            <button type="button" id="c-forgetbtn" onClick={(e)=>{sendData(e)}}  >submit</button> 
                        </form>

                </div>  
                

            </div>
        )



}