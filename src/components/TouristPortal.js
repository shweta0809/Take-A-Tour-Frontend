import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../CSS/Style.css";
import { Row, Col } from "react-bootstrap";
import beach from "../Images/beach.jpg";
import { Slide } from "pure-react-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";

export default function TouristPortal() {
  const [allpackages, setAllPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/getAll")
      .then((resp) => resp.json())
      .then((pkgs) => setAllPackages(pkgs));
  }, []);

  const navigate = useNavigate();

  const goToplantour = (id) => {
    localStorage.setItem("packageidforplantour", id);
    navigate("plantour");
  };

  return (
    <div>
     
    </div>
  );
}

// import img from "../Images/beach.jpg";
// export default function TouristPortal() {
//   return (
//     <div>
//       <div className="c-TouristPortal-1 people-section">
//         {/* <h1>Hiiiiiii</h1> */}

//         {/* <div class="card c-TouristPortal">
//           <img
//             class="card-img-top"
//             src={img}
//             alt="Card image"
//             width="100px"
//             height="100px"
//           />
//           <div class="card-body">
//             <h4 class="card-title">John Doe</h4>
//             <p class="card-text">
//               Some example text some example text. John Doe is an architect and
//               engineer
//             </p>
//             <a href="#" class="btn btn-primary stretched-link">
//               See Profile
//             </a>
//           </div>
//         </div> */}

//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>

//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>
//         <div className="c-TouristPortal"></div>
//       </div>
//     </div>
//   );
// }
