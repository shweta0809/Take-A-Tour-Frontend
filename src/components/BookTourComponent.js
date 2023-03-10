import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import { BsCurrencyRupee } from "react-icons/bs";
import "../CSS/Style.css";
import { useLocation } from "react-router-dom";

export default function BookTour(props) {
  const [packageinfo, setPackaheinfo] = useState([]);
  const [touristinfo, setTousristinfo] = useState([]);
  const [show, setShowvalue] = useState();

  const location = useLocation();

  // console.log(location.state);
  // console.log("... pkg"+location.state.onepackge.tour_id)
  const selectedtour = location.state.onepackge;
  console.log(JSON.stringify(selectedtour));
  console.log("... selcted" + selectedtour.tour_id);

  // useEffect(() => {

  //     const pinfo =JSON.parse(localStorage.getItem("packageforBookTour"));
  //     console.log("....const"+pinfo);
  //     setPackaheinfo(pinfo);
  //     console.log("....state"+packageinfo);
  //     console.log("...."+packageinfo.tour_id);

  //     // const tinfo = (localStorage.getItem("loggedtourist"));
  //     // console.log("....const"+tinfo);
  //     // setTousristinfo(JSON.parse(tinfo));
  //     // console.log("...."+touristinfo);
  //     // console.log(touristinfo.t_fname);

  // },[])
  const [toggle, setToggle] = useState({});

  useEffect(() => {
    const tinfo = localStorage.getItem("loggedtourist");
    console.log("....const" + tinfo);
    setTousristinfo(JSON.parse(tinfo));
    console.log("...." + touristinfo.t_fname);

    console.log("...." + touristinfo.t_fname);
  }, []);

  const toggleFunction = (id) => {
    setToggle(id);
    console.log("in toggle id .." + id);
  };

  const init = {
    
    travellernumber: { value: 1, hasError: true, touched: false, error: "" },
    paymenttype: { value: 1, hasError: true, touched: false, error: "" },
    // status:0,
    isFormValid: false,
  };

  const reducer = (state, action) => {
    //console.log(state);
    switch (action.type) {
      case "update": {
        const { name, value, hasError, error, touched, isFormValid } =
          action.data;
        return {
          ...state,
          [name]: { ...state[name], value, hasError, error, touched },
          isFormValid,
        }; //modifying and returning new object as state
      }
      case "reset": {
        return init;
      }
    }
  };

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
    dispatch({
      type: "update",
      data: { name, value, hasError, error, touched: true, isFormValid },
    });
  };

  const onFocusOut = (name, value, dispatch) => {
    const { hasError, error } = validateData(name, value);
    let isFormValid = true;
    for (const key in info) {
      const item = info[key];
      if (key === name && hasError) {
        isFormValid = false;
        break;
      } else if (key !== name && item.hasError) {
        isFormValid = false;
        break;
      }
    }
    dispatch({
      type: "update",
      data: { name, value, hasError, error, touched: true, isFormValid },
    });
  };

  const validateData = (name, value) => {
    let hasError = false,
      error = "";

    switch (name) {
      case "t_fname":
        let regex2 = /^[A-Za-z]{1,15}$/;

        if (!regex2.test(value)) {
          hasError = true;
          error = "First Name Should be valid ";
        }
        break;

      case "t_lname":
        let regex3 = /^[A-Za-z]{1,15}$/;

        if (!regex3.test(value)) {
          hasError = true;
          error = "Last Name Should be valid ";
        }
        break;
      case "travellernumber":
        if (value <= 0) {
          hasError = true;
          error = "Traveller number can not zero";
        }
        break;
      case "bdate":
        var todaysdate = new Date();
        if (value < todaysdate) {
          hasError = true;
          error = "birthdate should be valid";
        }
        break;
    }
    return { hasError, error };
  };
  const [info, dispatch] = useReducer(reducer, init);

  var totamount =
    selectedtour.packageidobj.packageprice * info.travellernumber.value;
  console.log("total " + totamount);
  console.log("type " + info.paymenttype.value);
  console.log("tid " + selectedtour.tour_id);

  const sendData = (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        touristid: touristinfo.tourist_id,
        tourid: selectedtour.tour_id,
        travellernumber: info.travellernumber.value,
        totamount: totamount,
        paymenttype: info.paymenttype.value,
      }),
    };
    fetch("http://localhost:8080/Booktourbytourist", reqOptions)
      .then((resp) => {
        if (resp.ok) {
          return resp.text();
        } else {
          throw new Error("server error");
        }
      })
      .then((text) => (text.length ? JSON.parse(text) : {}))
      .then((obj) => {
        if (obj) {
          alert("successfully planned tour");
        } else {
          alert("failed in planning ");
        }
      });
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>

      <Container>
        <div className="c-Booktourcontainer">
          <Row md={2}>
            <Col>
              <div className="c-booktourinnerdiv ">
                {console.log("in return")}
                <div className="c-travellerform">
                  {/* <button className="btn  btn-block" id="c-bookbutton" onclick={() => toggleFunction(1)}>Add</button> */}

                  <Form>
                    <table className="c-tabletouristinfo">
                      {/* style={{ display : toggle ? "block" : "none" }} */}
                      <tr>
                        <th colspan={2}>
                          <h4>Traveller Form</h4>
                        </th>
                      </tr>

                      <tr>
                        <td>
                          <Form.Label>Enter first name :</Form.Label>
                        </td>

                        <td>
                          <Form.Control
                            type="text"
                            placeholder="first name"
                            name="t_fname"

                          />
                         
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>Enter last name :</Form.Label>
                        </td>

                        <td>
                          <Form.Control
                            type="text"
                            placeholder="last name"
                            name="t_lname"
                            value={info.t_lname.value}
                            onChange={(e) => {
                              onInputChange(
                                "t_lname",
                                e.target.value,
                                dispatch
                              );
                            }}
                            onBlur={(e) => {
                              onFocusOut("t_lname", e.target.value, dispatch);
                            }}
                          />
                          <p
                            style={{
                              display:
                                info.t_lname.touched && info.t_lname.hasError
                                  ? "block"
                                  : "none",
                              color: "red",
                            }}
                          >
                            {" "}
                            {info.t_lname.error}{" "}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>Select Gender:</Form.Label>
                        </td>

                        <td>
                          <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="F"
                          />
                          <Form.Check
                            type="radio"
                            label="Male"
                            name="gnder"
                            value="M"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>Select birthdate :</Form.Label>
                        </td>

                        <td>
                          <Form.Control
                            type="date"
                            name="bdate"
                            value={info.bdate.value}
                            onChange={(e) => {
                              onInputChange("bdate", e.target.value, dispatch);
                            }}
                            onBlur={(e) => {
                              onFocusOut("bdate", e.target.value, dispatch);
                            }}
                          />
                          <p
                            style={{
                              display:
                                info.bdate.touched && info.bdate.hasError
                                  ? "block"
                                  : "none",
                              color: "red",
                            }}
                          >
                            {" "}
                            {info.bdate.error}{" "}
                          </p>
                        </td>
                      </tr>
                      <tr className="c-bookbuttondiv">
                        <td>
                          <button className="btn  btn-block" id="c-bookbutton">
                            Submit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn  btn-block c-bookbutton"
                            id="c-bookbutton"
                          >
                            reset
                          </button>
                        </td>
                      </tr>
                    </table>
                  </Form>
                </div>

                <div>
                  <h1>Order Invoice</h1>
                </div>
              </div>
            </Col>
            <Col>
              <div className="c-booktourinnerdiv">
                <Form>
                  <table className="c-tabletouristinfo">
                    <tr>
                      <th colSpan={2}>
                        <h2>Your Info </h2>
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <h5>Name :</h5>
                      </td>
                      <td>
                        <h5>
                          {" "}
                          {touristinfo.t_fname} {touristinfo.t_lname}
                        </h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Contact :</h5>
                      </td>
                      <td>
                        <h5> {touristinfo.t_contact} </h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Email :</h5>
                      </td>
                      <td>
                        <h5> {touristinfo.t_email} </h5>
                      </td>
                    </tr>
                  </table>

                  <table className="c-tabletouristinfo">
                    <tr>
                      <th colSpan={2}>
                        <h2>
                          {/* {packageinfo.packageidobj.packagename}  */}
                          {selectedtour.packageidobj.packagename}
                          {/* {touristinfo.t_fname} */}
                        </h2>
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <Form.Label>Enter number of traveller :</Form.Label>
                      </td>

                      <td>
                        <Form.Control
                          type="number"
                          placeholder="Traveller"
                          name="travellernumber"
                          id="travellernumber"
                          value={info.travellernumber.value}
                          onChange={(e) => {
                            onInputChange(
                              "travellernumber",
                              e.target.value,
                              dispatch
                            );
                          }}
                          onBlur={(e) => {
                            onFocusOut(
                              "travellernumber",
                              e.target.value,
                              dispatch
                            );
                          }}
                          required
                        />
                        <p
                          style={{
                            display:
                              info.travellernumber.touched &&
                              info.travellernumber.hasError
                                ? "block"
                                : "none",
                            color: "red",
                          }}
                        >
                          {" "}
                          {info.travellernumber.error}{" "}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <Form.Label>Total Amount : </Form.Label>
                      </td>

                      <td>
                        <h5>
                          {" "}
                          <BsCurrencyRupee />
                          {/* {selectedtour.packageidobj.packageprice}  */}
                          {totamount}
                        </h5>
                      </td>
                    </tr>
                  </table>

                  <table className="c-tabletouristinfo">
                    <tr>
                      <th colSpan={2}>
                        <h3>Payment Process</h3>
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <Form.Label>Select payment type :</Form.Label>
                      </td>

                      <td>
                        <Form.Select
                          aria-label="Default select example"
                          name="paymenttype"
                          value={info.paymenttype.value}
                          onChange={(e) => {
                            onInputChange(
                              "paymenttype",
                              e.target.value,
                              dispatch
                            );
                          }}
                          onBlur={(e) => {
                            onFocusOut("paymenttype", e.target.value, dispatch);
                          }}
                          required
                        >
                          <option> Payment Type</option>
                          <option value="UPI">UPI</option>
                          <option value="Net Banking">Net Banking</option>
                          <option value="Card Payment">Card Payment</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr className="c-bookbuttondiv">
                      <td>
                        <button
                          type="submit"
                          className="btn  btn-block"
                          id="c-bookbutton"
                          disabled={info.isFormValid ? false : true}
                          onClick={(e) => {
                            sendData(e);
                          }}
                        >
                          Book
                        </button>
                      </td>
                      <td>
                        <button
                          type="reset"
                          className="btn  btn-block c-bookbutton"
                          id="c-bookbutton"
                          onClick={() => {
                            dispatch({ type: "reset" });
                          }}
                        >
                          reset
                        </button>
                      </td>
                    </tr>
                  </table>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
