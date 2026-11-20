import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ManageExpense.css";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function ManageIncomes() {




  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
    description: "",
  });

  console.log(id);

  const API_URL = `http://localhost:3000/transaction/transactionsGetOne/${id}`;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExpense();
  }, [id]);


   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })



  async function fetchExpense() {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch expense");
      }

      const expense = data.data;

      setFormData({
        title: expense.title,
        amount: expense.amount,
        type: expense.type,
        category: expense.category,
        date: expense.date.split("T")[0],
        description: expense.description || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const sendData = {
        title: formData.title,
        amount: formData.amount,
        category: formData.category,
        description: formData.description,
        date: formData.date,
      };

      const response = await fetch(
        `http://localhost:3000/transaction/transactionEdit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendData),
        },
      );

      const data = await response.json();

      console.log(sendData);

      if (!response.ok) {
        alert(data.message);
        throw new Error(data.message || "Failed to update expense");
      }

      if (response.ok) {
        
        fetchExpense();
      }

      //   alert("Expense updated successfully!");
      //   navigate("/expenses");

      console.log();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(e) {
    try {
      e.preventDefault();
      setSaving(true);
      setError("");

      const response = await fetch(
        `http://localhost:3000/transaction/transactionDelete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete expense");
      }

     
      navigate("/incomes");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      setShowDelete(false);
    }
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="rv-manage-page">
      <div className="rv-notes-back-wrapper">
        <Link to="/incomes" className="rv-notes-back-btn">
          <i className="bi bi-arrow-left"></i>
          <span>Back </span>
        </Link>
      </div>

      <div className="rv-manage-header">
        <div>
          <span>TRANSACTION MANAGEMENT</span>
          <h1>Manage Income</h1>
          <p>Update or remove your transaction.</p>
        </div>
      </div>

      {error && <div className="rv-manage-error">{error}</div>}

      <form className="rv-manage-card">
        <div className="rv-manage-field">
          <label>Transaction Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="rv-manage-field">
          <label>Amount (₹)</label>
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="rv-manage-field">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {["Salary", "Freelance", "Business", "Investment", "Other"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="rv-manage-field">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="rv-manage-field rv-manage-full">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="rv-manage-actions">
          <button
            type="submit"
            disabled={saving}
            onClick={(e) => handleUpdate(e)}
            className="rv-manage-update"
          >
            <i className="bi bi-check2"> </i>
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="rv-manage-delete"
            onClick={() => setShowDelete(true)}
            disabled={saving}
          >
            <i className="bi bi-trash3"> </i> 
             Delete Income
          </button>
        </div>
      </form>

      {showDelete && (
        <div className="rv-manage-overlay">
          <div className="rv-manage-confirm">
            <i className="bi bi-exclamation-triangle"></i>
            <h2>Delete Income?</h2>
            <br />
            <p>This transaction will be permanently deleted.</p>

            <div>
              <button onClick={() => setShowDelete(false)}>Cancel</button>

              <button onClick={(e) => handleDelete(e)} disabled={saving}>
                {saving ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageIncomes;