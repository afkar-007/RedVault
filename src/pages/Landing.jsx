
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate()

 useEffect(()=>{

    const gateway = localStorage.getItem("homeGateway")
    if(gateway==="true")
{
  navigate('/home')
}
  },[])

  


  return (
    <div className="vault-landing">

      {/* Background */}
      <div className="vault-bg-glow"></div>
      <div className="vault-bg-grid"></div>

      {/* Navbar */}
      <nav className="vault-navbar">

        <Link to="/" className="vault-logo">
          <div className="vault-logo-icon">
            <i className="bi bi-layers-half"></i>
          </div>
          REDVAULT<span>.</span>
        </Link>

        <div className="vault-nav-links">
          <a href="#features">Features</a>
          <a href="#experience">Experience</a>
          <a href="#security">Security</a>
        </div>

        <Link to="/login" className="vault-nav-button">
          Sign In <i className="bi bi-arrow-up-right"></i>
        </Link>

      </nav>

      {/* Hero */}
      <section className="vault-hero" id="experience">

        <div className="vault-hero-content">

          <div className="vault-eyebrow">
            <span></span>
            A NEW PERSPECTIVE ON YOUR FINANCES
          </div>

          <h1>
            Take control.
            <br />
            <span>Leave a mark.</span>
          </h1>

          <p className="vault-hero-description">
            Your finances deserve more than spreadsheets.
            Bring your expenses, personal notes and everyday
            decisions together in one beautifully designed space.
          </p>

          <div className="vault-hero-actions">
            <Link to="/login" className="vault-main-button">
              Sign In
              <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>

          <div className="vault-trust">
            <div className="vault-trust-icon">
              <i className="bi bi-shield-check"></i>
            </div>
            <span>YOUR DATA. YOUR SPACE. YOUR CONTROL.</span>
          </div>

        </div>

        {/* Dashboard Preview */}
        <div className="vault-visual">

          <div className="vault-visual-glow"></div>

          <div className="vault-orbit orbit-one"></div>
          <div className="vault-orbit orbit-two"></div>

          <div className="vault-dashboard">

            <div className="vault-dashboard-header">

              <div className="vault-dash-brand">
                <div className="vault-dash-icon">
                  <i className="bi bi-layers-half"></i>
                </div>
                <div>
                  <strong>Overview</strong>
                  <span>Your financial space</span>
                </div>
              </div>

              <div className="vault-dash-menu">
                <i className="bi bi-three-dots"></i>
              </div>

            </div>

            <div className="vault-balance-card">

              <span className="vault-small-label">
                TOTAL BALANCE
              </span>

              <h2>₹84,250<span>.00</span></h2>

              <div className="vault-balance-change">
                <i className="bi bi-arrow-up-right"></i>
                <span>Financial overview</span>
              </div>

              <div className="vault-balance-decoration"></div>

            </div>

            <div className="vault-stats">

              <div className="vault-stat-card">
                <div className="vault-stat-icon income-icon">
                  <i className="bi bi-arrow-down-left"></i>
                </div>
                <span>Total Income</span>
                <strong>₹65,000</strong>
              </div>

              <div className="vault-stat-card">
                <div className="vault-stat-icon expense-icon">
                  <i className="bi bi-arrow-up-right"></i>
                </div>
                <span>Total Expenses</span>
                <strong>₹28,500</strong>
              </div>

            </div>

            <div className="vault-chart-card">

              <div className="vault-chart-header">
                <div>
                  <strong>Spending activity</strong>
                  <span>Your financial overview</span>
                </div>
                <i className="bi bi-activity"></i>
              </div>

              <div className="vault-chart">

                <div className="chart-labels">
                  <span>₹10k</span>
                  <span>₹5k</span>
                  <span>₹0</span>
                </div>

                <svg
                  viewBox="0 0 420 135"
                  preserveAspectRatio="none"
                  className="vault-chart-svg"
                >
                  <defs>
                    <linearGradient id="vaultGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ed263e" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ed263e" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M0 105 C35 95 45 70 80 82 S130 105 165 65 S215 75 250 40 S300 72 335 28 S385 50 420 12 L420 135 L0 135 Z"
                    fill="url(#vaultGradient)"
                  />

                  <path
                    d="M0 105 C35 95 45 70 80 82 S130 105 165 65 S215 75 250 40 S300 72 335 28 S385 50 420 12"
                    fill="none"
                    stroke="#ed263e"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <circle cx="335" cy="28" r="5" fill="#ed263e" />
                  <circle cx="335" cy="28" r="10" fill="#ed263e" opacity="0.2" />
                </svg>

              </div>

              <div className="vault-chart-days">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

            </div>

            <div className="vault-transaction">

              <div className="vault-transaction-title">
                <strong>Recent activity</strong>
                <span>DEMO</span>
              </div>

              <div className="vault-transaction-row">
                <div className="vault-transaction-icon">
                  <i className="bi bi-bag"></i>
                </div>
                <div className="vault-transaction-info">
                  <strong>Shopping</strong>
                  <span>Today · 10:30 AM</span>
                </div>
                <strong className="vault-amount">-₹2,500</strong>
              </div>

              <div className="vault-transaction-row">
                <div className="vault-transaction-icon">
                  <i className="bi bi-cup-hot"></i>
                </div>
                <div className="vault-transaction-info">
                  <strong>Food & Drinks</strong>
                  <span>Yesterday · 8:15 PM</span>
                </div>
                <strong className="vault-amount">-₹450</strong>
              </div>

            </div>

          </div>

          {/* Floating Note */}
          <div className="vault-floating-note">
            <div className="vault-note-icon">
              <i className="bi bi-journal-text"></i>
            </div>
            <div>
              <strong>Your thoughts, organized.</strong>
              <span>Notes that stay with you.</span>
            </div>
            <i className="bi bi-check-circle-fill"></i>
          </div>

          {/* Floating Badge */}
          <div className="vault-floating-badge">
            <i className="bi bi-shield-lock"></i>
            <span>PRIVATE SPACE</span>
          </div>

        </div>

      </section>

      {/* Features */}
      <section className="vault-features" id="features">

        <div className="vault-section-heading">
          <span>THE REDVAULT EXPERIENCE</span>
          <h2>Everything. In one place.</h2>
        </div>

        <div className="vault-feature-grid">

          <div className="vault-feature">
            <div className="vault-feature-icon">
              <i className="bi bi-wallet2"></i>
            </div>
            <span>01 / FINANCE</span>
            <h3>Know where it goes.</h3>
            <p>
              Track every expense, understand your spending
              and keep your financial life organized.
            </p>
          </div>

          <div className="vault-feature">
            <div className="vault-feature-icon">
              <i className="bi bi-journal-richtext"></i>
            </div>
            <span>02 / NOTES</span>
            <h3>Keep what matters.</h3>
            <p>
              Capture ideas, save important thoughts
              and organize your personal notes.
            </p>
          </div>

          <div className="vault-feature">
            <div className="vault-feature-icon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <span>03 / INSIGHTS</span>
            <h3>See the bigger picture.</h3>
            <p>
              Turn everyday financial activity into
              meaningful insights and better decisions.
            </p>
          </div>

        </div>

      </section>

      {/* Closing Section */}
      <section className="vault-closing" id="security">

        <div className="vault-closing-glow"></div>

        <span>YOUR NEXT CHAPTER STARTS HERE</span>

        <h2>
          Make every move
          <br />
          <span>count.</span>
        </h2>

        <Link to="/login" className="vault-main-button">
          Sign In
          <i className="bi bi-arrow-up-right"></i>
        </Link>

      </section>

      {/* Footer */}
      <footer className="vault-footer">

        <Link to="/" className="vault-logo">
          <div className="vault-logo-icon">
            <i className="bi bi-layers-half"></i>
          </div>
          REDVAULT<span>.</span>
        </Link>

        <p>YOUR FINANCES. YOUR THOUGHTS. YOUR CONTROL.</p>

        <span>© 2026 REDVAULT</span>

      </footer>

    </div>
  );
}

export default Landing;
