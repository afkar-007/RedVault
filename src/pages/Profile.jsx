

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Loading from "../components/Loading";

function Profile() {
  const navigate = useNavigate();

  useEffect(()=>{
     ProfileFetch()

  },[])


   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })

  const [showLogout, setShowLogout] = useState(false);
  const[profile,setProfile]=useState({})

  const [loading,setLoading]=useState(false)

  const name = localStorage.getItem("name") || "REDVAULT Member";
  const email = localStorage.getItem("email") || "Email not available";
  const id = localStorage.getItem("id") || "Not available";

  const firstLetter = name?.charAt(0).toUpperCase();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("homeGateway");

    navigate("/login", { replace: true });
  }

  
   async function ProfileFetch() {
    try{
 setLoading(true)
    

    const response = await fetch(`https://redvault-backend.onrender.com/user/profile/${id}`) 
    const data = await response.json()  
    
     

    setProfile(data.data)

    }catch(err){
      console.log(err.message);
      
    }
    finally{
      setLoading(false)
    }


  }

  if(loading){
    
      return <Loading/>
    

  }




  return (
    <div className="rv-profile-page">

      {/* SIDEBAR */}
      {/* <aside className="rv-profile-sidebar">

        <Link to="/home" className="rv-profile-brand">
          RED<span>VAULT</span><i>.</i>
        </Link>

        <div className="rv-profile-sidebar-label">
          WORKSPACE
        </div>

        <div className="rv-profile-navigation">

          <Link to="/home">
            <i className="bi bi-grid"></i>
            <span>Overview</span>
          </Link>

          <Link to="/expenses">
            <i className="bi bi-wallet2"></i>
            <span>Expenses</span>
          </Link>

          <Link to="/notes">
            <i className="bi bi-journal-text"></i>
            <span>My Notes</span>
          </Link>

          <div className="rv-profile-nav-active">
            <i className="bi bi-person-circle"></i>
            <span>My Profile</span>
            <i className="bi bi-chevron-right"></i>
          </div>

        </div>

        <div className="rv-profile-sidebar-bottom">
          <div className="rv-profile-sidebar-security">
            <i className="bi bi-shield-check"></i>
            <div>
              <h4>Your space.</h4>
              <p>Your finances, organized.</p>
            </div>
          </div>

          <button
            className="rv-profile-sidebar-logout"
            onClick={() => setShowLogout(true)}
          >
            <i className="bi bi-box-arrow-left"></i>
            Sign Out
          </button>
        </div>

      </aside> */}

      {/* MAIN CONTENT */}
      <main className="rv-profile-main">

        {/* TOPBAR */}
        <header className="rv-profile-topbar">

          <div>
            <span>ACCOUNT / PROFILE</span>
            <h2>My Profile</h2>
          </div>

          <Link to="/home" className="rv-profile-home-btn">
            <i className="bi bi-house"></i>
            Dashboard
          </Link>

        </header>

        {/* WELCOME */}
        <section className="rv-profile-welcome">
          <div className="rv-profile-welcome-content">
            <span>YOUR PERSONAL SPACE</span>
            <h1>
              Welcome back,
              <br />
              <span>{profile?.name}</span>
            </h1>
            <p>
              Manage your account information and keep your
              REDVAULT experience organized.
            </p>
          </div>

          <div className="rv-profile-welcome-decoration">
            <i className="bi bi-person-badge"></i>
          </div>
        </section>

        {/* PROFILE OVERVIEW */}
        <section className="rv-profile-overview">

          <div className="rv-profile-overview-card">

            <div className="rv-profile-avatar-area">
              <div className="rv-profile-avatar">
                {firstLetter}
              </div>

              <div className="rv-profile-identity">
                <h2>{profile?.name}</h2>
                <p>{profile?.email}</p>

                <div className="rv-profile-member-badge">
                  <span></span>
                  Registered Member
                </div>
              </div>
            </div>

            <div className="rv-profile-account-id">
              <span>ACCOUNT ID</span>
              <h4>{id}</h4>
            </div>

          </div>

        </section>

        {/* DETAILS */}
        <section className="rv-profile-details-section">

          <div className="rv-profile-section-heading">
            <div>
              <span>ACCOUNT INFORMATION</span>
              <h2>Personal Details</h2>
            </div>

            <i className="bi bi-person-vcard"></i>
          </div>

          <div className="rv-profile-details-grid">

            <div className="rv-profile-detail-card">
              <div className="rv-profile-detail-icon">
                <i className="bi bi-person"></i>
              </div>

              <div>
                <span>Full Name</span>
                <h3>{profile?.name}</h3>
              </div>
            </div>

            <div className="rv-profile-detail-card">
              <div className="rv-profile-detail-icon">
                <i className="bi bi-envelope"></i>
              </div>

              <div>
                <span>Email Address</span>
                <h3>{profile?.email}</h3>
              </div>
            </div>

            <div className="rv-profile-detail-card">
              <div className="rv-profile-detail-icon">
                <i className="bi bi-fingerprint"></i>
              </div>

              <div>
                <span>Account Identifier</span>
                <h3 className="rv-profile-small-text">{id}</h3>
              </div>
            </div>

            <div className="rv-profile-detail-card">
              <div className="rv-profile-detail-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <div>
                <span>Membership</span>
                <h3>REDVAULT Member</h3>
              </div>
            </div>

          </div>

        </section>

        {/* SECURITY */}
        <section className="rv-profile-security-section">

          <div className="rv-profile-security-icon">
            <i className="bi bi-shield-lock"></i>
          </div>

          <div className="rv-profile-security-content">
            <span>ACCOUNT PROTECTION</span>
            <h3>Your account matters.</h3>
            <p>
              Keep your login credentials private. Always sign out
              when using a shared device.
            </p>
          </div>

          <div className="rv-profile-security-status">
            <span></span>
            Session Active
          </div>

        </section>

        {/* LOGOUT */}
        <section className="rv-profile-logout-card">

          <div className="rv-profile-logout-info">
            <div className="rv-profile-logout-icon">
              <i className="bi bi-box-arrow-right"></i>
            </div>

            <div>
              <h3>Sign out of REDVAULT</h3>
              <p>
                Ready to leave? You can securely sign out of your account.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowLogout(true)}
            className="rv-profile-logout-button"
          >
            Logout
            <i className="bi bi-arrow-up-right"></i>
          </button>

        </section>

        {/* FOOTER */}
        <footer className="rv-profile-footer">
          <Link to="/home" className="rv-profile-footer-logo">
            RED<span>VAULT</span><i>.</i>
          </Link>

          <p>Take control. Own your financial future.</p>

          <span>© 2026 REDVAULT</span>
        </footer>

      </main>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div
          className="rv-profile-modal-overlay"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="rv-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="rv-profile-modal-icon">
              <i className="bi bi-box-arrow-right"></i>
            </div>

            <span>REDVAULT ACCOUNT</span>

            <h2>Leaving so soon?</h2>

            <p>
              Are you sure you want to sign out of your
              REDVAULT account?
            </p>

            <div className="rv-profile-modal-actions">

              <button
                className="rv-profile-modal-cancel"
                onClick={() => setShowLogout(false)}
              >
                Stay Logged In
              </button>

              <button
                className="rv-profile-modal-confirm"
                onClick={handleLogout}
              >
                Yes, Logout
                <i className="bi bi-arrow-right"></i>
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;