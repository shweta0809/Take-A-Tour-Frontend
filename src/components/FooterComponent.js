import CarouselFadeExample from "./CarouselComponent"
import "../CSS/HomeStyle.css"
import { Button, Container } from "react-bootstrap"
import { Col, Row } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import {BsFacebook,BsInstagram,BsLinkedin,BsTwitter} from "react-icons/bs";
import {BiCopyright} from "react-icons/bi"
import { icons } from "react-icons";

export default function FooterComponent() {
    return (
        <div>
            <Container fluid className="c-footermainclass">
                <Row  >
                    <Col xs={6} md={4} >
                        <div className="c-footerdiv">
                            <div >
                                <h1>Take A Tour</h1>

                                <p>
                                    This website will help to arrange a trip with appropriate packages
                                    so that tourists can plan a trip easily with the tour guide.

                                </p>
                            </div>
                        </div>

                    </Col>
                    <Col xs={6} md={4}>
                        <div className="c-footerdiv">
                            <div >
                                <h4>ooooooooo</h4>

                                <h6>hhhhhhhhhhh</h6>
                                <h6>hhhhhhhhhhh</h6>
                                <h6>hhhhhhhhhhh</h6>
                                <h6>hhhhhhhhhhh</h6>

                            </div>
                        </div>


                    </Col>

                    <Col xs={6} md={4}>
                        
                        <div className="c-footerdivthird">
                            <div>
                            <h4>Contact us</h4>
                            <div>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                 
                                    <Form.Control type="text" placeholder="Enter Name" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    {/* <Form.Label>Password</Form.Label> */}
                                    <Form.Control type="number" placeholder="Contact Number" />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group> */}
                                <Button id="c-dispimgbtn" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <div className="c-footericon">
                               <span> < BsFacebook size="25px"/></span> 
                               <span>  <BsInstagram size="25px"/></span> 
                               <span>  <BsLinkedin size="25px"/></span> 
                               <span> <BsTwitter size="25px"/></span> 
                            </div>
                           
                            </div>
                            </div>
                        </div>

                    </Col>

                </Row>
                <Row>
                    <Col xs={12}>
                       <div className="c-footecopyright">
                        <div>
                        <p>  <BiCopyright/> 2023 Take A Tour</p>
                        </div>
                       
                       </div>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}