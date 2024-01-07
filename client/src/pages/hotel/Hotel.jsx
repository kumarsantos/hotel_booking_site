import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Reserve from "../../components/reserve/Reserve";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./Hotel.css";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const[openModal,setOpenModal]=useState(false);
  const photos = [
    "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2Kz9GKIXWfnGzLmiATij_xyc1SQNVYm0TQ&usqp=CAU",
    "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2Kz9GKIXWfnGzLmiATij_xyc1SQNVYm0TQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2Kz9GKIXWfnGzLmiATij_xyc1SQNVYm0TQ&usqp=CAU",
    "https://media.istockphoto.com/photos/luxury-resort-picture-id104731717?k=20&m=104731717&s=612x612&w=0&h=40INtJRzhmU1O4Rj24zdY8vj4aGsWpPaEfojaVQ8xBo=",
  ];

  const { id } = useParams();
  const { data } = useFetch(`/hotels/${id}`);
  
  const { date, options } = useContext(SearchContext);
  

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = date.length
    ? dayDifference(date?.[0]?.endDate ?? null, date?.[0]?.startDate ?? null)
    : "1";

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let slidenumber = slideNumber;

    if (photos.length - 1 !== slideNumber && direction === "r") {
      slidenumber += 1;
      if (slidenumber === photos.length - 1) {
        slidenumber = 0;
      }
    }
    if (slideNumber !== 0 && direction === "l") {
      slidenumber -= 1;
      if (slidenumber === 0) {
        slidenumber = photos.length - 1;
      }
    }
    setSlideNumber(slidenumber);
  };
  const {user}=useContext(AuthContext);
const navigate=useNavigate();
  const handleBooking=(e)=>{
    if(user){
      setOpenModal(true);
    }else{
      navigate('/login')
    }
  }

  const handleClick=(e)=>{
    if(user){

    }else{
      navigate('/login')
    }
  }

  return (
    <div className="hotel">
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleBooking}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data?.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocation} />
            <span>{data?.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data?.distance} from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over @{data?.cheapestPrice} at this property and get a
            free airport taxi
          </span>

          <div className="hotelImages">
            {data.photos?.map((photo, i) => {
              return (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    src={photo}
                    alt=""
                    className="hotelImg"
                    onClick={() => handleOpen(i)}
                  />
                </div>
              );
            })}
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of Krakow</h1>
              <p className="hotelDesc">{data?.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data?.cheapestPrice * options?.room}</b> ({days}{" "}
                nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
      {
        openModal && <Reserve setOpenModal={setOpenModal} hotelId={id} />
      }
    </div>
  );
};

export default Hotel;
