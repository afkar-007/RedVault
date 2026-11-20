
import "../styles/HomeLoading.css";
import homeLoadingGif from "../assets/HpageLoading.gif"
import HLoading from '../assets/homeLoading.gif'

function HomeLoading() {
  return (
    <div className="home-loading-page">
      <div className="home-loading-content">

       
        <img
          src={homeLoadingGif}
          alt="Loading Dashboard"
          className="home-loading-gif"
        />
        <img
          src={HLoading}
          alt="Loading Dashboard"
          className="home-loading-gif"
        />

     

      </div>
    </div>
  );
}

export default HomeLoading;
