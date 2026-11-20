import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Expenses.css";
import Loading from "../components/Loading";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const[transLoading,setTransLoading]=useState(false)

   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })


  const id = localStorage.getItem("id");

  const API_URL = `https://redvault-backend.onrender.com/transaction/transactionsGet/${id}`;

  async function fetchExpenses() {
    try {
      setTransLoading(true)
      setLoading(true);
      setError("");
      

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch expenses");
      }

      // Display only expense transactions
      setExpenses(
        (data.data || []).filter(
          (transaction) => transaction.type === "expense",
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setTransLoading(false)
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const categories = [
    "All",
    "Food",
    "Shopping",
    "Travel",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other",
  ];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || expense.category === category;

    return matchesSearch && matchesCategory;
  });

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);


    if(transLoading){
      return (
        <Loading/>
      )
    }



  return (
    <div className="rv-expenses-page">
      <div className="rv-notes-back-wrapper">
        <Link to="/home" className="rv-notes-back-btn">
          <i className="bi bi-arrow-left"></i>
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="rv-expenses-header">
        <div>
          <span className="rv-expenses-label">FINANCIAL OVERVIEW</span>
          <h1>Expenses</h1>
          <p>Track and manage where your money goes.</p>
        </div>

        <Link to={`/addTransaction/expense`} className="rv-expenses-add">
          <i className="bi bi-plus-lg"></i>
          Add Expense
        </Link>
      </div>

      <div className="rv-expenses-summary">
        <div className="rv-expenses-summary-icon">
          <i className="bi bi-wallet2"></i>
        </div>

        <div>
          <span>Total Expenses</span>
          <h2>{formatAmount(totalExpenses)}</h2>
          <p>{expenses.length} transactions recorded</p>
        </div>
      </div>

      <div className="rv-expenses-content">
        <div className="rv-expenses-toolbar">
          <div className="rv-expenses-search">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="rv-expenses-state">
            <i className="bi bi-arrow-repeat"></i>
            <p>Loading expenses...</p>
          </div>
        ) : error ? (
          <div className="rv-expenses-state rv-expenses-error">
            <i className="bi bi-exclamation-circle"></i>
            <p>{error}</p>
            <button onClick={fetchExpenses}>Try Again</button>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="rv-expenses-state">
            <i className="bi bi-receipt"></i>
            <h3>No expenses found</h3>
            <p>Your expense transactions will appear here.</p>
          </div>
        ) : (
          <div className="rv-expenses-list">
            {filteredExpenses.map((expense) => (
              <div className="rv-expenses-item" key={expense._id}>
                <div className="rv-expenses-item-icon">
                  <i className="bi bi-receipt"></i>
                </div>

                <div className="rv-expenses-item-details">
                  <h3>{expense.title}</h3>
                  <p>{expense.category}</p>
                </div>

                <div className="rv-expenses-item-date">
                  {new Date(expense.date).toLocaleDateString("en-IN")}
                </div>

                <div className="rv-expenses-item-amount">
                  -{formatAmount(expense.amount)}
                </div>

                <Link
                  to={`/manageExpense/${expense._id}`}
                  className="rv-expenses-manage"
                >
                  <i className="bi bi-pencil-square"></i>
                  Manage
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Expenses;
