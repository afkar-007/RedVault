
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddTransaction.css";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useEffect } from "react";


function AddTransaction() {

   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })



  const navigate = useNavigate();

  const {type}=useParams()

  const userId = localStorage.getItem("id")
 
  

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: type,
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories =
    formData.type === "income"
      ? ["Salary", "Freelance", "Business", "Investment", "Other"]
      : [
          "Food",
          "Shopping",
          "Travel",
          "Bills",
          "Entertainment",
          "Health",
          "Education",
          "Other",
        ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Change transaction type
  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
      category: type === "income" ? "Salary" : "Food",
    }));

    setError("");
  };

  // Submit transaction
  async function submit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.title.trim()) {
      setError("Please enter transaction title");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!formData.date) {
      setError("Please select transaction date");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`https://redvault-backend.onrender.com/transaction/transactionAdded/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            
          ...formData,
          title: formData.title.trim(),
          amount: Number(formData.amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add transaction"
        );
      }

      setSuccess("Transaction added successfully!");

      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });

      // Navigate to dashboard after saving
      
        navigate("/home");
     
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  if(loading){
    return <Loading/>
  }


  return (
    <div className="rv-add-transaction">

      <div className="rv-add-header">
        <div>
          <span className="rv-add-eyebrow">
            TRANSACTION MANAGEMENT
          </span>

          <h1>Add Transaction</h1>

          <p>
            Keep track of your money, one transaction at a time.
          </p>
        </div>

        <button
          type="button"
          className="rv-add-back"
          onClick={() => navigate("/home")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Dashboard
        </button>
      </div>

      <div className="rv-add-content">

        <div className="rv-add-form-card">

          <div className="rv-add-card-heading">
            <div>
              <h2>Transaction Details</h2>
              <p>Enter the details of your transaction below.</p>
            </div>

            <div className="rv-add-icon">
              <i className="bi bi-wallet2"></i>
            </div>
          </div>

          <form >

            {/* Transaction Type */}

            <div className="rv-add-field">
              <label>Transaction Type</label>

              <div className="rv-add-type-selector">

                <button
                  type="button"
                  className={
                    formData.type === "expense"
                      ? "rv-add-type active expense"
                      : "rv-add-type"
                  }
                  onClick={() => handleTypeChange("expense")}
                >
                  <i className="bi bi-arrow-up-right"></i>
                  <span>
                    <strong>Expense</strong>
                    <small>Money going out</small>
                  </span>
                </button>

                <button
                  type="button"
                  className={
                    formData.type === "income"
                      ? "rv-add-type active income"
                      : "rv-add-type"
                  }
                  onClick={() => handleTypeChange("income")}
                >
                  <i className="bi bi-arrow-down-left"></i>
                  <span>
                    <strong>Income</strong>
                    <small>Money coming in</small>
                  </span>
                </button>

              </div>
            </div>

            {/* Transaction Title */}

            <div className="rv-add-field">
              <label htmlFor="rv-title">
                Transaction Title
              </label>

              <input
                id="rv-title"
                type="text"
                name="title"
                placeholder="e.g. Monthly Salary"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Amount */}

            <div className="rv-add-field">
              <label htmlFor="rv-amount">
                Amount
              </label>

              <div className="rv-add-amount-input">
                <span>₹</span>

                <input
                  id="rv-amount"
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Category */}

            <div className="rv-add-field">
              <label htmlFor="rv-category">
                Category
              </label>

              <select
                id="rv-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}

            <div className="rv-add-field">
              <label htmlFor="rv-date">
                Transaction Date
              </label>

              <input
                id="rv-date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Description */}

            <div className="rv-add-field">
              <label htmlFor="rv-description">
                Description
                <span className="rv-add-optional">
                  Optional
                </span>
              </label>

              <textarea
                id="rv-description"
                name="description"
                placeholder="Add additional transaction details..."
                rows="4"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Error Message */}

            {error && (
              <div className="rv-add-message error">
                <i className="bi bi-exclamation-circle"></i>
                {error}
              </div>
            )}

            {/* Success Message */}

            {success && (
              <div className="rv-add-message success">
                <i className="bi bi-check-circle"></i>
                {success}
              </div>
            )}

            {/* Submit Button */}

            <button
              onClick={(e)=>submit(e)}
              className="rv-add-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="rv-add-spinner"></span>
                  Saving Transaction...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle"></i>
                  Save Transaction
                </>
              )}
            </button>

          </form>
        </div>

        {/* Information Card */}

        <div className="rv-add-info-card">

          <div className="rv-add-info-icon">
            <i className="bi bi-shield-check"></i>
          </div>

          <h3>Your money. Your control.</h3>

          <p>
            Every transaction you add helps REDVAULT
            calculate your financial activity and keep
            your dashboard up to date.
          </p>

          <div className="rv-add-info-divider"></div>

          <div className="rv-add-info-item">
            <i className="bi bi-lock"></i>
            <span>Your transactions are linked to your account.</span>
          </div>

          <div className="rv-add-info-item">
            <i className="bi bi-graph-up-arrow"></i>
            <span>Your financial summary updates from saved transactions.</span>
          </div>

          <div className="rv-add-info-item">
            <i className="bi bi-clock-history"></i>
            <span>Track your income and expenses over time.</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AddTransaction;
