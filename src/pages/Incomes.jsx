
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Incomes.css";
import Loading from "../components/Loading";
const API_URL = "https://redvault-backend.onrender.com/transactions";

function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const token = localStorage.getItem("token");

  const userId=localStorage.getItem("id")

  useEffect(() => {
    fetchIncomes();
  }, []);

   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })

  async function fetchIncomes() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/transactionsGet/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch incomes");
      }

      const allTransactions = data.data || [];

      setIncomes(
        allTransactions.filter(
          (transaction) => transaction.type === "income"
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    "All",
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Other",
  ];

  const filteredIncomes = useMemo(() => {
    return incomes.filter((income) => {
      const matchesSearch =
        income.title?.toLowerCase().includes(search.toLowerCase()) ||
        income.category?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || income.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [incomes, search, category]);

  const totalIncome = incomes.reduce(
    (total, income) => total + Number(income.amount || 0),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyIncome = incomes
    .filter((income) => {
      const date = new Date(income.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((total, income) => total + Number(income.amount || 0), 0);

  const averageIncome =
    incomes.length > 0 ? totalIncome / incomes.length : 0;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    if(loading){
      return <Loading/>
    }

  return (
    <div className="rv-income-page">

        
      {/* SIDEBAR */}

      {/* MAIN CONTENT */}
      <main className="rv-income-main">
          <div className="rv-notes-back-wrapper">
        <Link to="/home" className="rv-notes-back-btn">
          <i className="bi bi-arrow-left"></i>
          <span>Back to Dashboard</span>
        </Link>
      </div>
   

        {/* PAGE INTRO */}
        <section className="rv-income-heading">
          <div>
            <span className="rv-income-eyebrow">
              <span></span> YOUR FINANCIAL PERFORMANCE
            </span>
            <h1>Every rupee <span>counts.</span></h1>
            <p>
              Track your earnings, understand your income sources, and
              build a stronger financial future.
            </p>
          </div>

          <Link to="/addTransaction/income" className="rv-income-add-btn">
            <i className="bi bi-plus-lg"></i>
            Add Income
          </Link>
        </section>

        {/* STAT CARDS */}
        <section className="rv-income-stats">
          <div className="rv-income-stat-card rv-income-stat-primary">
            <div className="rv-income-stat-top">
              <div className="rv-income-stat-icon">
                <i className="bi bi-wallet2"></i>
              </div>
              <span className="rv-income-stat-tag">ALL TIME</span>
            </div>
            <p>Total Income</p>
            <h2>{formatCurrency(totalIncome)}</h2>
            <span className="rv-income-stat-description">
              <i className="bi bi-graph-up-arrow"></i>
              Your total recorded earnings
            </span>
          </div>

          <div className="rv-income-stat-card">
            <div className="rv-income-stat-top">
              <div className="rv-income-stat-icon">
                <i className="bi bi-calendar2-check"></i>
              </div>
              <span className="rv-income-stat-tag">THIS MONTH</span>
            </div>
            <p>Monthly Income</p>
            <h2>{formatCurrency(monthlyIncome)}</h2>
            <span className="rv-income-stat-description">
              Earnings received this month
            </span>
          </div>

          <div className="rv-income-stat-card">
            <div className="rv-income-stat-top">
              <div className="rv-income-stat-icon">
                <i className="bi bi-calculator"></i>
              </div>
              <span className="rv-income-stat-tag">AVERAGE</span>
            </div>
            <p>Average Transaction</p>
            <h2>{formatCurrency(averageIncome)}</h2>
            <span className="rv-income-stat-description">
              Average amount per income entry
            </span>
          </div>

          <div className="rv-income-stat-card">
            <div className="rv-income-stat-top">
              <div className="rv-income-stat-icon">
                <i className="bi bi-receipt"></i>
              </div>
              <span className="rv-income-stat-tag">RECORDS</span>
            </div>
            <p>Income Entries</p>
            <h2>{incomes.length}</h2>
            <span className="rv-income-stat-description">
              Total income transactions
            </span>
          </div>
        </section>

        {/* INSIGHT BANNER */}
        <section className="rv-income-insight">
          <div className="rv-income-insight-icon">
            <i className="bi bi-lightbulb"></i>
          </div>
          <div className="rv-income-insight-content">
            <span>FINANCIAL INSIGHT</span>
            <h3>Your income tells your financial story.</h3>
            <p>
              Keep recording every earning to get a clearer picture
              of your financial progress.
            </p>
          </div>
          <div className="rv-income-insight-decoration">
            <i className="bi bi-graph-up-arrow"></i>
          </div>
        </section>

        {/* TRANSACTION LIST */}
        <section className="rv-income-transactions">
          <div className="rv-income-section-heading">
            <div>
              <span>INCOME HISTORY</span>
              <h2>Your earnings</h2>
              <p>All your recorded income transactions in one place.</p>
            </div>
            <span className="rv-income-record-count">
              {filteredIncomes.length} Records
            </span>
          </div>

          <div className="rv-income-filters">
            <div className="rv-income-search">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search income..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button type="button" onClick={() => setSearch("")}>
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>

            <div className="rv-income-category-filter">
              <i className="bi bi-funnel"></i>
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
          </div>

          {loading ? (
            <div className="rv-income-state">
              <div className="rv-income-loader"></div>
              <h3>Loading your income...</h3>
              <p>Getting your latest financial records.</p>
            </div>
          ) : error ? (
            <div className="rv-income-state">
              <i className="bi bi-exclamation-circle"></i>
              <h3>Unable to load income</h3>
              <p>{error}</p>
              <button type="button" onClick={fetchIncomes}>
                Try Again
              </button>
            </div>
          ) : filteredIncomes.length === 0 ? (
            <div className="rv-income-state">
              <i className="bi bi-wallet2"></i>
              <h3>
                {incomes.length === 0
                  ? "Your income journey starts here"
                  : "No matching income found"}
              </h3>
              <p>
                {incomes.length === 0
                  ? "Add your first income transaction to start tracking your earnings."
                  : "Try changing your search or category filter."}
              </p>
              {incomes.length === 0 && (
                <Link to="/addTransaction/income">
                  <i className="bi bi-plus-lg"></i> Add Your First Income
                </Link>
              )}
            </div>
          ) : (
            <div className="rv-income-table-wrapper">
              <table className="rv-income-table">
                <thead>
                  <tr>
                    <th>INCOME SOURCE</th>
                    <th>CATEGORY</th>
                    <th>DATE RECEIVED</th>
                    <th>AMOUNT</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredIncomes.map((income) => (
                    <tr key={income._id}>
                      <td>
                        <div className="rv-income-source">
                          <div className="rv-income-source-icon">
                            <i className="bi bi-arrow-down-left"></i>
                          </div>
                          <div>
                            <h4>{income.title}</h4>
                            <p>
                              {income.description || "Income transaction"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="rv-income-category-badge">
                          {income.category}
                        </span>
                      </td>

                      <td className="rv-income-date">
                        {formatDate(income.date)}
                      </td>

                      <td className="rv-income-amount">
                        +{formatCurrency(income.amount)}
                      </td>

                      <td>
                        <Link
                          to={`/ManageIncomes/${income._id}`}
                          className="rv-income-action"
                          title="View transaction"
                        >
                          <i className="bi bi-arrow-up-right"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="rv-income-footer">
          <span>© 2026 REDVAULT. All rights reserved.</span>
          <span>Built for smarter financial decisions.</span>
        </footer>
      </main>
    </div>
  );
}

export default Incomes;
