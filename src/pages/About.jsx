

import { Link } from "react-router-dom";
import "../styles/About.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate()

   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })


  return (
    <div className="rv-about-page">

      {/* NAVIGATION */}
      <nav className="rv-about-nav">
        <Link to="/home" className="rv-about-logo">
          RED<span>VAULT</span><i>.</i>
        </Link>

        <div className="rv-about-nav-links">
          <Link to="/home">Dashboard</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <Link to="/home" className="rv-about-nav-btn">
          Go Dashboard <i className="bi bi-arrow-up-right"></i>
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="rv-about-hero">

        <div className="rv-about-hero-content">
          <span className="rv-about-eyebrow">
            <span className="rv-about-dot"></span>
            THE STORY BEHIND REDVAULT
          </span>

          <h1>
            Take control.
            <br />
            <span>Own your</span>
            <br />
            financial future.
          </h1>

          <p>
            Money deserves more than scattered numbers and forgotten
            expenses. REDVAULT brings your financial world into one
            powerful, organized space.
          </p>

          <div className="rv-about-hero-buttons">
            <Link to="/expenses" className="rv-about-primary-btn">
              Explore Expenses
              <i className="bi bi-arrow-up-right"></i>
            </Link>

            <Link to="/notes" className="rv-about-secondary-btn">
              Discover Notes
            </Link>
          </div>
        </div>

        <div className="rv-about-hero-visual">
          <div className="rv-about-glow"></div>

          <div className="rv-about-visual-card">
            <div className="rv-about-visual-top">
              <div>
                <span>YOUR FINANCIAL SPACE</span>
                <h3>Stay in control.</h3>
              </div>
              <i className="bi bi-shield-lock"></i>
            </div>

            <div className="rv-about-visual-chart">
              <div className="rv-about-chart-heading">
                <span>Financial awareness</span>
                <i className="bi bi-graph-up-arrow"></i>
              </div>

              <div className="rv-about-chart-bars">
                {[35, 55, 42, 75, 48, 85, 65, 95, 60, 80, 70, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="rv-about-chart-bar"
                      style={{ height: `${height}%` }}
                    ></div>
                  )
                )}
              </div>

              <div className="rv-about-chart-bottom">
                <span>Organize</span>
                <span>Understand</span>
                <span>Improve</span>
              </div>
            </div>

            <div className="rv-about-visual-features">
              <div>
                <i className="bi bi-wallet2"></i>
                <span>Expenses</span>
              </div>
              <div>
                <i className="bi bi-journal-text"></i>
                <span>Personal Notes</span>
              </div>
              <div>
                <i className="bi bi-shield-check"></i>
                <span>Secure Space</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rv-about-scroll">
          <span></span>
          SCROLL TO DISCOVER
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="rv-about-intro">
        <div className="rv-about-section-label">
          <span>01</span> / WHO WE ARE
        </div>

        <div className="rv-about-intro-content">
          <h2>
            Financial clarity
            <span> starts with awareness.</span>
          </h2>

          <p>
            REDVAULT is designed to make everyday financial management
            feel simple, focused, and intentional. From tracking where
            your money goes to keeping important personal notes, we
            believe everything should have its place.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="rv-about-features">
        <div className="rv-about-section-label">
          <span>02</span> / WHAT WE OFFER
        </div>

        <div className="rv-about-features-heading">
          <h2>
            Everything organized.
            <br />
            <span>Nothing overlooked.</span>
          </h2>

          <p>
            Two essential tools. One seamless experience.
          </p>
        </div>

        <div className="rv-about-feature-grid">

          <div className="rv-about-feature-card rv-about-feature-main">
            <div className="rv-about-feature-icon">
              <i className="bi bi-wallet2"></i>
            </div>

            <span className="rv-about-feature-number">01</span>

            <h3>Expense Management</h3>

            <p>
              Understand your spending habits, record transactions,
              organize categories, and keep your financial activity
              under control.
            </p>

            <Link to="/expenses">
              Explore Expenses
              <i className="bi bi-arrow-up-right"></i>
            </Link>

            <i className="bi bi-wallet2 rv-about-feature-watermark"></i>
          </div>

          <div className="rv-about-feature-card">
            <div className="rv-about-feature-icon">
              <i className="bi bi-journal-richtext"></i>
            </div>

            <span className="rv-about-feature-number">02</span>

            <h3>Personal Notes</h3>

            <p>
              Keep your thoughts, plans, reminders, and important
              information organized in one dedicated space.
            </p>

            <Link to="/notes">
              Explore Notes
              <i className="bi bi-arrow-up-right"></i>
            </Link>

            <i className="bi bi-journal-richtext rv-about-feature-watermark"></i>
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="rv-about-values">
        <div className="rv-about-section-label">
          <span>03</span> / OUR PRINCIPLES
        </div>

        <h2>
          Built around what
          <span> matters.</span>
        </h2>

        <div className="rv-about-values-grid">

          <div className="rv-about-value">
            <i className="bi bi-eye"></i>
            <h3>Clarity</h3>
            <p>
              Make your financial information easier to understand
              and manage.
            </p>
          </div>

          <div className="rv-about-value">
            <i className="bi bi-lock"></i>
            <h3>Privacy</h3>
            <p>
              Keep your personal information protected with
              security-conscious design.
            </p>
          </div>

          <div className="rv-about-value">
            <i className="bi bi-lightning-charge"></i>
            <h3>Simplicity</h3>
            <p>
              Spend less time organizing information and more time
              making meaningful decisions.
            </p>
          </div>

          <div className="rv-about-value">
            <i className="bi bi-gem"></i>
            <h3>Experience</h3>
            <p>
              Enjoy a refined interface where every detail has
              a purpose.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="rv-about-cta">
        <div className="rv-about-cta-glow"></div>

        <span>YOUR NEXT CHAPTER STARTS HERE</span>

        <h2>
          Make every decision
          <br />
          <span>count.</span>
        </h2>

        <p>
          Bring your expenses and personal notes together.
          Create a more organized financial routine with REDVAULT.
        </p>

        <Link to="/home" className="rv-about-cta-btn">
          Enter REDVAULT
          <i className="bi bi-arrow-up-right"></i>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="rv-about-footer">
        <Link to="/home" className="rv-about-logo">
          RED<span>VAULT</span><i>.</i>
        </Link>

        <p>Take control. Own your financial future.</p>

        <div className="rv-about-footer-links">
          <Link to="/home">Home</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/notes">Notes</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="rv-about-footer-bottom">
          <span>© 2026 REDVAULT. All rights reserved.</span>
          <span>Designed with purpose.</span>
        </div>
      </footer>

    </div>
  );
}

export default About;
