
import "../styles/Loading.css";
import loadingGif from "../assets/loading.gif"

function Loading() {
  return (
    <div className="loading-page">
      <div className="loading-content">

        {/* <div className="loading-logo">
          <span className="loading-logo-icon">C</span>
          <span>Client<span>Payable</span></span>
        </div> */}

        <img src={loadingGif} alt="Loading..." className="loading-gif" />

        <h2>Preparing Your Dashboard</h2>

        <p>
          Please wait while we organize your financial data.
        </p>

        <div className="loading-progress">
          <div className="loading-progress-bar"></div>
        </div>

        <span className="loading-status">
          LOADING YOUR EXPERIENCE
        </span>

      </div>
    </div>
  );
}

export default Loading;
