import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsCurrencyRupee } from "react-icons/bs";
export default function SearchingPackage() {
  const [startdate, setStartDate] = useState("");
  const [allpackages, setAllPackages] = useState([]);

  //   useEffect(() => {
  //     fetch("http://localhost:8080/getpackagesbydate")
  //       .then((resp) => resp.json())
  //       .then((pkgs) => setAllPackages(pkgs));
  //   }, []);


  const sendData = () => {
    console.log(startdate);
    fetch("http://localhost:8080/getpackagesbydate?sdate=" + startdate)
      //.then(resp=>console.log(resp))
      .then((resp) => resp.json())
      // .then(resp=>console.log(resp))
      .then((pkgs) => setAllPackages(pkgs));
  };

  const [toggle, setToggle] = useState({});
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  function toggleFunction(id) {
    setToggle({
        ...toggle,
        [id]: !toggle[id],
    });

}

  return (
    <div>
      <form>
        <h1>Enter date to search package</h1>
        <input
          type="date"
          name="startdate"
          id="startdate"
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        ></input>
        <button
          type="button"
          id="btn"
          onClick={(e) => {
            sendData(e);
          }}
        >
          search
        </button>
      </form>
      <h1>{startdate}</h1>
      <h1>Book Your Trips</h1>
      <div className="c-TouristPortal-1">
        {allpackages.map((allpk) => {
          return (
            <div class="c-TouristPortal">
              <div className="c-touristpackageimages">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: 50,
                    stretch: 25,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  pagination={true}
                  className="mySwiper"
                >
                  {allpk.packageidobj.packimageobj.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <img
                          src={`data:image/jpeg;base64,${img && img.packimage}`}
                          className="c-touristsingleimage"
                          alt=""
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              <div className="card-body c-card-content">
                <h4 className="card-title">{allpk.packageidobj.packagename}</h4>

                <h6>
                  <BsCurrencyRupee />
                  {allpk.packageidobj.packageprice}
                </h6>
                {/* <h6>{allpk.packageidobj.description}</h6> */}
                <h6>
                  <span>Start Date&ensp; &ensp;</span>
                  <span>Book Till</span>
                  <br />
                  <span>{allpk.startdate}&ensp; &ensp;</span>
                  <span>{allpk.lastdate_apply}</span>
                </h6>

                <button id="c-dispimgbtn-tourist" onClick={() => toggleFunction(allpk.tour_id)}>Show More</button>
              </div>

              <div className="c-mainpackageallinfo" style={{ display: toggle[allpk.tour_id] ? "block" : "none" }}>
                <div className="c-packageallinfo">
                  <div className="c-1divinfo">
                    <table
                      className="table border"
                      border={1}
                    >
                      <tr>
                        <td colspan={2}>
                          <h1>{allpk.packageidobj.packagename}</h1>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h5>Start Date </h5>
                        </td>
                        <td>
                          <h5>{allpk.startdate}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h5>Last Date</h5>
                        </td>
                        <td>
                          <h5>{allpk.lastdate}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h5>Last Date To Apply</h5>
                        </td>
                        <td>
                          <h5>{allpk.lastdate_apply}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <h5>Package Price</h5>
                        </td>
                        <td>
                          <h5>
                            <BsCurrencyRupee />
                            {allpk.packageidobj.packageprice}
                          </h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <h5>Duration</h5>
                        </td>
                        <td>
                          <h5>{allpk.packageidobj.duration}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <h5>Capacity</h5>
                        </td>
                        <td>
                          <h5>{allpk.packageidobj.tourist_capacity}</h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          <h5>Locations</h5>{" "}
                        </td>
                        <td>
                          <h5>{allpk.packageidobj.locations}</h5>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="c-2divinfo"><h3>description</h3>
                  <div><h5>{allpk.packageidobj.description}</h5></div></div>
                </div>
                <div className="c-packagebtntourist">
                   {" "}
                  <div>
                    <button className="" id="c-dispimgbtn-tourist1" >
                      Book Tour 
                    </button>
                  </div>
                  <div>
                    <button className="" id="c-dispimgbtn-tourist1" onClick={() => toggleFunction(allpk.tour_id)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
