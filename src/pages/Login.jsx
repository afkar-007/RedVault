import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { LoginService } from "../Services/UserService";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import HomeLoading from "../components/HomeLoading";

function Login() {

  const navigate = useNavigate()

  useEffect(()=>{

    const gateway = localStorage.getItem("homeGateway")
    if(gateway==="true")
{
  navigate('/home')
}
  },[])


  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailPattern = /^[^\s@]+@gmail\.com$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  async function Login(e) {
    e.preventDefault();
    try {
      if (!email.trim("")) {
        setError("E-mail field is empty");
        return;
      }

      if (!emailPattern.test(email)) {
        setError("Enter a valid Email");
        return;
      }

      if (!password.trim("")) {
        setError("password field is empty");
        return;
      }

      const data = {
        email: email,
        password: password,
      };

      const response = await LoginService(data);

      if (!response.ok) {
        setError(response.message);
        return;
      }


      if (response.ok) {
        console.log(response.id);
        
        
        setEmail("");
        setPassword("");
        navigate('/home')
        localStorage.setItem("homeGateway",true)
        localStorage.setItem("id",response.id)
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(true);
    }
  }

  if(loading){
    return <HomeLoading/>
  }

  return (
    <div className="rv-login">
      {/* Ambient background */}
      <div className="rv-orb rv-orb-one"></div>
      <div className="rv-orb rv-orb-two"></div>
      <div className="rv-noise"></div>

      {/* Top Navigation */}
      <nav className="rv-nav">
        <Link to="/" className="rv-brand">
          <div className="rv-brand-mark">
            <i className="bi bi-layers-half"></i>
          </div>
          <span>
            REDVAULT<span className="rv-dot">.</span>
          </span>
        </Link>

        <div className="rv-nav-right">
          <span>NEW TO REDVAULT?</span>
          <Link to="/register" className="rv-create-link">
            Create account <i className="bi bi-arrow-up-right"></i>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="rv-main">
        {/* Left Editorial Section */}
        <section className="rv-showcase">
          <div className="rv-eyebrow">
            <span className="rv-live-dot"></span>
            YOUR FINANCIAL WORLD, REIMAGINED
          </div>

          <h1>
            Money moves.
            <br />
            <span>Make them</span>
            <br />
            <span className="rv-outline">meaningful.</span>
          </h1>

          <p className="rv-description">
            One space for your finances, thoughts and plans. Experience a more
            intentional way to manage everything that matters.
          </p>

          {/* Floating Dashboard Preview */}
          <div className="rv-preview">
            <div className="rv-preview-top">
              <div>
                <span className="rv-preview-label">TOTAL BALANCE</span>
                <h2>
                  ₹84,250<span>.00</span>
                </h2>
              </div>

              <div className="rv-preview-icon">
                <i className="bi bi-wallet2"></i>
              </div>
            </div>

            <div className="rv-preview-bottom">
              <div>
                <span>INCOME</span>
                <strong>
                  <i className="bi bi-arrow-down-left"></i> ₹65,000
                </strong>
              </div>

              <div>
                <span>EXPENSES</span>
                <strong>
                  <i className="bi bi-arrow-up-right"></i> ₹28,500
                </strong>
              </div>

              <div className="rv-preview-status">
                <span></span> LIVE OVERVIEW
              </div>
            </div>

            <div className="rv-preview-line"></div>
          </div>

          <div className="rv-showcase-bottom">
            <div className="rv-mini-feature">
              <i className="bi bi-shield-lock"></i>
              <div>
                <strong>Private by design</strong>
                <span>Your space, your control.</span>
              </div>
            </div>

            <div className="rv-mini-feature">
              <i className="bi bi-bar-chart-line"></i>
              <div>
                <strong>Clarity in every move</strong>
                <span>Understand your spending.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Login Section */}
        <section className="rv-form-section">
          <div className="rv-form-card">
            <div className="rv-form-top">
              <div className="rv-form-icon">
                <i className="bi bi-fingerprint"></i>
              </div>

              <span className="rv-secure-label">
                <i className="bi bi-lock-fill"></i>
                SECURE ACCESS
              </span>
            </div>

            <div className="rv-form-heading">
              <span className="rv-form-overline">YOUR ACCOUNT AWAITS</span>
              <h2>
                Welcome <span>back.</span>
              </h2>
              <p>Enter your details to continue your journey.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="rv-field">
                <label htmlFor="email">EMAIL ADDRESS</label>

                <div className="rv-input">
                  <i className="bi bi-envelope"></i>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      (setEmail(e.target.value), setError(null));
                    }}
                    required
                  />
                </div>
              </div>

              <div className="rv-field">
                <div className="rv-label-row">
                  <label htmlFor="password">PASSWORD</label>
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <div className="rv-input">
                  <i className="bi bi-key"></i>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      (setPassword(e.target.value), setError(null));
                    }}
                    required
                  />

                  <button
                    type="button"
                    className="rv-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                    ></i>
                  </button>
                </div>
              </div>

              <ErrorMessage message={error} onClose={() => setError("")} />

              <div className="rv-options">
                <label>
                  <input type="checkbox" />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                disabled={loading}
                onClick={(e) => Login(e)}
                className="rv-submit"
                type="submit"
              >
                <span> {loading ? "Entering..." : "Enter your vault"}</span>
                <i className="bi bi-arrow-up-right"></i>
              </button>
            </form>

            {/* <div className="rv-separator">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <button type="button" className="rv-google">
              <i className="bi bi-google"></i>
              Continue with Google
            </button> */}

            <div className="rv-register">
              Don't have an account?
              <Link to="/register">
                {" "}
                Get started <i className="bi bi-arrow-right"></i>
              </Link>
            </div>

            <div className="rv-card-footer">
              <i className="bi bi-shield-check"></i>
              ENCRYPTED CONNECTION · PRIVATE ACCESS
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Footer */}
      <footer className="rv-footer">
        <span>© 2026 REDVAULT. ALL RIGHTS RESERVED.</span>
        <span>BUILT FOR A BETTER FINANCIAL LIFE.</span>
      </footer>
    </div>
  );
}

export default Login;
