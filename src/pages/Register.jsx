import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterService } from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import UserLoading from "../components/UserLoading";
import Loading from "../components/Loading";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailPattern = /^[^\s@]+@gmail\.com$/;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function register(e) {
    e.preventDefault();

    try {
      setLoading(true);

      if (!formData.fullName.trim("")) {
        setError("name field is empty");
        return;
      }

      if (!formData.email.trim("")) {
        setError("E-mail field is empty");
        return;
      }

      if (!emailPattern.test(formData.email)) {
        setError("Enter a valid E-mail");
        return;
      }

      if (!formData.password.trim("")) {
        setError("password field is empty");
        return;
      }

      if (formData.password.length < 4) {
        setError(" Password atleast have 4 characters");
        return;
      }

      if (!formData.confirmPassword.trim("")) {
        setError("Confirm Password field is empty");
        return;
      }

      if (formData.confirmPassword.length < 4) {
        setError("Confirm Password atleast have 4 characters");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      console.log(formData);

      const data = {
        name: formData.fullName,
        email: formData.email,
        password: formData.confirmPassword,
      };

      const response = await RegisterService(data);

      if (!response.ok) {
        setError(response.message);
        return;
      }

      if (response.ok) {
        alert("registration Successful");

        setError("");

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <UserLoading />;
  }

  return (
    <div className="rv-register-page">
      <div className="rv-register-container">
        {/* BRAND */}
        <div className="rv-register-brand">
          <div className="rv-register-brand-icon">
            <i className="bi bi-shield-lock-fill"></i>
          </div>

          <h2>
            RED<span>VAULT</span>
          </h2>
        </div>

        {/* FORM HEADER */}
        <div className="rv-register-heading">
          <span className="rv-register-tag">
            <span></span> START YOUR JOURNEY
          </span>

          <h1>
            Create your <span>account.</span>
          </h1>

          <p>
            Take control of your expenses and keep your important thoughts
            organized in one secure space.
          </p>
        </div>

        {/* FORM */}
        <form className="rv-register-form">
          <div className="rv-register-field">
            <label>FULL NAME</label>

            <div className="rv-register-input">
              <i className="bi bi-person"></i>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="rv-register-field">
            <label>EMAIL ADDRESS</label>

            <div className="rv-register-input">
              <i className="bi bi-envelope"></i>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="rv-register-field">
            <label>PASSWORD</label>

            <div className="rv-register-input">
              <i className="bi bi-lock"></i>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                required
              />

              <button
                type="button"
                className="rv-register-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          <div className="rv-register-field">
            <label>CONFIRM PASSWORD</label>

            <div className="rv-register-input">
              <i className="bi bi-shield-lock"></i>

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength="8"
                required
              />

              <button
                type="button"
                className="rv-register-eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i
                  className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
          </div>

          <ErrorMessage message={error} onClose={() => setError("")} />

          <div className="rv-register-security">
            <i className="bi bi-shield-check"></i>
            <span>Your information stays private and secure.</span>
          </div>

          <button
            disabled={loading}
            onClick={(e) => register(e)}
            type="submit"
            className="rv-register-submit"
          >
            {loading ? "Registering" : "Create Account"}
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>

        {/* FOOTER */}
        <div className="rv-register-divider">
          <span>ALREADY PART OF REDVAULT?</span>
        </div>

        <p className="rv-register-login">
          Already have an account?
          <Link to="/login"> Sign in</Link>
        </p>

        <div className="rv-register-bottom">
          <i className="bi bi-lock-fill"></i>
          PRIVATE BY DESIGN. BUILT FOR CLARITY.
        </div>
      </div>

      {/* DECORATION */}
      <div className="rv-register-decoration">
        <div className="rv-register-circle rv-register-circle-one"></div>
        <div className="rv-register-circle rv-register-circle-two"></div>
        <div className="rv-register-glow"></div>
      </div>
    </div>
  );
}

export default Register;
