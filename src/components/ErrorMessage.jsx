
import React from "react";
import "../styles/ErrorMessage.css";

function ErrorMessage({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="rv-error-message">
      <div className="rv-error-icon">
        <i className="bi bi-exclamation-circle-fill"></i>
      </div>

      <div className="rv-error-content">
        <h4>Something went wrong</h4>
        <p>{message}</p>
      </div>

      {onClose && (
        <button
          type="button"
          className="rv-error-close"
          onClick={onClose}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
