import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ApprovePlanTour() {

    const [approvepack, setApprovepack] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/getallplantour")
            .then(resp => resp.json())
            .then(pkgs => setApprovepack(pkgs))

    }, []);


console.log(approvepack)
    const navigate = useNavigate();

    const approvetour = (id) =>{
       
        fetch("http://localhost:8080/approvetour?tid="+id)
        .then(resp => {if(resp.ok)
            { 
                console.log(resp)
                  return resp.text();
            }
          else
            {
           
              throw  new Error("server error")  
            }
          })

          
     }
   

   

  

    return (
        <div>
           
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Approve Planned Tours</h1>
                        <table className="c-disppackagetable">
                            <tr>
                                <th>Tour ID</th>
                                <th>startdate</th>
                                <th>lastdate</th>
                                <th>availseats</th>
                                <th>lastdate_apply</th>
                                <th>package_id</th>
                                <th>packagename</th>
                                <th>packageprice</th> 
                                <th>locations</th>  
                                <th>Status</th>  
                                <th>Approve Tour</th> 
                            </tr>
                            {
                                approvepack.map(allpk => {
                                    return <tr>
                                        <td>{allpk.tour_id}</td>
                                        <td className="c-disppackname">{allpk.startdate}</td>
                                        <td>{allpk.lastdate}</td>
                                        <td>{allpk.availseats}</td>
                                        <td>{allpk.lastdate_apply}</td>
                                        <td> {allpk.packageidobj.package_id}</td>
                                        <td>{allpk.packageidobj.packagename}</td>
                                        <td>{allpk.packageidobj.packageprice}</td>
                                        <td>{allpk.packageidobj.locations}</td>
                                        <td>{allpk.status}</td>
                                        <td>  
                                            <button className="btn  btn-block" id="c-dispimgbtn" onClick={() => approvetour(allpk.tour_id)}>Approve</button>
                                        </td>
                                    </tr>
                                   


                                })
                            }
                        </table>

                    </Col>
                </Row>
            </Container>

        </div>

    )
}





