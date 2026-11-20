
import "../styles/UserLoading.css";
import userLoadingGif from "../assets/userLoading.gif";

function UserLoading() {
  return (
    <div className="user-loading-page">

      <div className="user-loading-card">

        

        <div className="user-loading-animation">
          <img
            src={userLoadingGif}
            alt="User Loading"
          />
        </div>

        <div className="user-loading-info">
        

          <h2>Getting Things Ready</h2>
          <br />

          <p>
            Please wait while we securely load your account information.
          </p>
        </div>

        

        <div className="user-loading-footer">
          <i className="bi bi-shield-check"></i>
          <span>SECURELY LOADING YOUR DATA</span>
        </div>

      </div>

    </div>
  );
}

export default UserLoading;
