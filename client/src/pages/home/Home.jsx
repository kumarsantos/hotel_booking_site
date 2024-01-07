import Featured from "../../components/featured/Featured";
import FeaturedProperty from "../../components/featuredProperty/FeaturedProperty";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./Home.css";
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse By Property Type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes Guests Love</h1>
        <FeaturedProperty />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
