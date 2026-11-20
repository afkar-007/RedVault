import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

import { GetTransaction } from "../Services/TransServices";
import { useState } from "react";
import { useEffect } from "react";
import HomeLoading from "../components/HomeLoading";

function Home() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    async function Loader() {
      await transactionFetching();
      await fetchingNotes();
      await ProfileFetch();
    }
    Loader();
  }, []);

  useEffect(()=>{
    const checkGateway = localStorage.getItem("homeGateway")
    if( checkGateway!=="true"){
      navigate('/')
    }
  })

  async function ProfileFetch() {
    try{
      setLoading(true)
    const response = await fetch(`https://redvault-backend.onrender.com/user/profile/${id}`);
    const data = await response.json();
    console.log(data);

    setProfile(data.data);
    }
    catch(err){
      console.log(err.message);
      
    }
    finally{
      setLoading(false)
    }
  }

  const [transactions, setTransactions] = useState([]);

  // const transactions = [
  //   {
  //     id: 1,
  //     title: "Shopping",
  //     category: "Personal",
  //     date: "Today, 10:30 AM",
  //     amount: "-₹2,500",
  //     icon: "bi-bag",
  //   },
  //   {
  //     id: 2,
  //     title: "Salary",
  //     category: "Income",
  //     date: "Today, 09:15 AM",
  //     amount: "+₹35,000",
  //     icon: "bi-wallet2",
  //   },
  //   {
  //     id: 3,
  //     title: "Food & Dining",
  //     category: "Food",
  //     date: "Yesterday",
  //     amount: "-₹450",
  //     icon: "bi-cup-hot",
  //   },
  //   {
  //     id: 4,
  //     title: "Transportation",
  //     category: "Travel",
  //     date: "Yesterday",
  //     amount: "-₹300",
  //     icon: "bi-car-front",
  //   },
  // ];

  const [notes, setNotes] = useState([]);

  const id = localStorage.getItem("id");

  async function transactionFetching() {
    try{setLoading(true)
    const response = await GetTransaction(id);

    console.log(response);

    setTransactions(response.data);
    }catch(err){
      console.log(err.message);
      
    }
    finally{
      setLoading(false)
    }
  }

  const totalExpenses = transactions
    .filter((sends) => sends.type === "expense")
    .reduce((total, expense) => total + Number(expense.amount), 0);

  const totalIncome = transactions
    .filter((sends) => sends.type === "income")
    .reduce((total, expense) => total + Number(expense.amount), 0);

  const totalBalances = Math.max(0, totalIncome - totalExpenses);

  const userId = localStorage.getItem("id");

  async function fetchingNotes() {
    try {
      setLoading(true)

      const response = await fetch(
        `https://redvault-backend.onrender.com/notes/getNotes/${userId}`,
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.log(data.message);
        return;
      }
      if (response.ok) {
        setNotes(data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
    finally{
      setLoading(false)
    }
  }

  if (loading) {
  return <HomeLoading/>
}

  return (
    <div className="rv-home">
      {/* SIDEBAR */}
      <aside className="rv-home-sidebar">
        <div className="rv-home-logo">
          <div className="rv-home-logo-icon">
            <i className="bi bi-shield-lock-fill"></i>
          </div>
          <h2>
            RED<span>VAULT</span>
          </h2>
        </div>

        <div className="rv-home-menu-label">WORKSPACE</div>

        <nav className="rv-home-nav">
          <Link to="/home" className="rv-home-nav-item active">
            <i className="bi bi-grid-1x2"></i>
            Dashboard
          </Link>

          <Link to="/expenses" className="rv-home-nav-item">
            <i className="bi bi-wallet2"></i>
            Expenses
          </Link>

          <Link to="/incomes" className="rv-home-nav-item">
            <i className="bi bi-cash-coin"></i>
            Incomes
          </Link>

          <Link to="/notes" className="rv-home-nav-item">
            <i className="bi bi-journal-text"></i>
            My Notes
          </Link>
        </nav>

        <div className="rv-home-menu-label rv-home-tools-label">
          PREFERENCES
        </div>

        <nav className="rv-home-nav">
          <Link to="/profile" className="rv-home-nav-item">
            <i className="bi bi-person"></i>
            My Profile
          </Link>

          <Link to="/about" className="rv-home-nav-item">
            <i className="bi bi-journal-code"></i>
            About us
          </Link>
        </nav>

        <div className="rv-home-sidebar-bottom">
          <div className="rv-home-upgrade">
            <i className="bi bi-stars"></i>
            <h4>Stay in control.</h4>
            <p>Small steps today. Better finances tomorrow.</p>
          </div>

          {/* <button onClick={() => Logout()} className="rv-home-logout">
            <i className="bi bi-box-arrow-left"></i>
            Log out
          </button> */}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="rv-home-main">
        {/* TOPBAR */}
        <header className="rv-home-topbar">
          <div>
            <span className="rv-home-breadcrumb">WORKSPACE / DASHBOARD</span>
            <h2>Overview</h2>
          </div>

          <div className="rv-home-top-actions">

            
            

            <div className="rv-home-user" onClick={() => navigate("/profile")}>
              <div className="rv-home-avatar">{profile?.name?.charAt(0)}</div>
              <div>
                <h4>Welcome back</h4>
                <p>Personal account</p>
              </div>
            </div>
          </div>
        </header>

        {/* WELCOME */}
        <section className="rv-home-welcome">
          <div>
            <span>MONDAY, YOUR FINANCIAL RESET</span>
            <h1>
              Good afternoon, <strong>{profile.name}.</strong>
            </h1>
            <p>
              Here's what's happening with your money today. Stay focused on
              what matters.
            </p>
          </div>

          <Link to="/AddTransaction/expense" className="rv-home-add-button">
            <i className="bi bi-plus-lg"></i>
            Add transaction
          </Link>
        </section>

        {/* SUMMARY CARDS */}
        <section className="rv-home-stats">
          <div className="rv-home-stat-card rv-home-balance">
            <div className="rv-home-stat-top">
              <span>TOTAL BALANCE</span>
              <i className="bi bi-wallet2"></i>
            </div>

            <h2>{totalBalances}</h2>

            <div className="rv-home-stat-footer">
              <span className="rv-home-positive">
                <i className="bi bi-arrow-up-right"></i> 12.8%
              </span>
              <span>vs last month</span>
            </div>
          </div>

          <div className="rv-home-stat-card">
            <div className="rv-home-stat-top">
              <span>TOTAL INCOME</span>
              <i className="bi bi-graph-up-arrow"></i>
            </div>

            <h2>{totalIncome}</h2>

            <div className="rv-home-stat-footer">
              <span className="rv-home-positive">
                <i className="bi bi-arrow-up-right"></i> 8.4%
              </span>
              <span>vs last month</span>
            </div>
          </div>

          <div className="rv-home-stat-card">
            <div className="rv-home-stat-top">
              <span>TOTAL EXPENSES</span>
              <i className="bi bi-graph-down-arrow"></i>
            </div>

            <h2>{totalExpenses}</h2>

            <div className="rv-home-stat-footer">
              <span className="rv-home-negative">
                <i className="bi bi-arrow-down-right"></i> 4.2%
              </span>
              <span>vs last month</span>
            </div>
          </div>
        </section>

        {/* CONTENT GRID */}
        <section className="rv-home-content-grid">
          {/* TRANSACTIONS */}
          <div className="rv-home-panel rv-home-transactions">
            <div className="rv-home-panel-header">
              <div>
                <span>YOUR MONEY ACTIVITY</span>
                <h3>Recent transactions</h3>
              </div>

              <Link to="/expenses">
                View all <i className="bi bi-arrow-up-right"></i>
              </Link>
            </div>

            <div className="rv-home-transaction-list">
              {transactions.length === 0 ? (
                <div className="empty-transactions">
                  <h3>No Transactions Found</h3>
                  <p>Your transactions will appear here.</p> <br />
                  <Link
                    to="/AddTransaction/expense"
                    className="rv-home-add-button"
                  >
                    <i className="bi bi-plus-lg"></i>
                    Add transaction
                  </Link>
                </div>
              ) : (
                transactions.map((item) => (
                  <div className="rv-home-transaction" key={item._id}>
                    <div className="rv-home-transaction-icon">
                      {item.type === "income" ? (
                        <i className="bi bi-graph-up-arrow income"></i>
                      ) : (
                        <i className="bi bi-graph-down-arrow"></i>
                      )}
                    </div>

                    <div className="rv-home-transaction-info">
                      <h4>{item.title}</h4>
                      <p>{item.category}</p>
                      <br />

                      <p>
                        {" "}
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <strong
                      className={
                        item.type === "income"
                          ? "rv-home-amount-income"
                          : "rv-home-amount-expense"
                      }
                    >
                      {item.amount}
                    </strong>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* QUICK NOTES */}
          <div className="rv-home-panel rv-home-notes">
            <div className="rv-home-panel-header">
              <div>
                <span>THOUGHTS & IDEAS</span>
                <h3>Quick notes</h3>
              </div>

              <Link to="/notes">
                View all <i className="bi bi-arrow-up-right"></i>
              </Link>
            </div>

            <div className="rv-home-note-list">
              {notes.length === 0 ? (
                <div className="empty-transactions">
                  <h3>No Notes Found</h3>
                  <p>Your notes will appear here.</p> <br />
                </div>
              ) : (
                notes.map((note) => (
                  <div className="rv-home-note" key={note._id}>
                    <div className="rv-home-note-icon">
                      <i className="bi bi-journal-bookmark"></i>
                    </div>

                    <div>
                      <h4>{note.title}</h4>
                      <p>{note.content}</p>
                      {/* <span>{note.date}</span> */}
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link to="/notes" className="rv-home-create-note">
              <i className="bi bi-plus-lg"></i>
              Create a new note
            </Link>
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section className="rv-home-bottom">
          <div className="rv-home-bottom-card">
            <div className="rv-home-bottom-icon">
              <i className="bi bi-bullseye"></i>
            </div>

            <div>
              <span>YOUR FINANCIAL FOCUS</span>
              <h3>Make every rupee count.</h3>
              <p>
                Track your spending, build better habits and move closer to your
                goals.
              </p>
            </div>
          </div>

          <div className="rv-home-bottom-card rv-home-bottom-right">
            <div className="rv-home-bottom-icon">
              <i className="bi bi-shield-check"></i>
            </div>

            <div>
              <span>YOUR SPACE</span>
              <h3>Everything in one vault.</h3>
              <p>Your expenses and notes, organized in one place.</p>
            </div>
          </div>
        </section>

        <footer className="rv-home-footer">
          <span>© 2026 REDVAULT. ALL RIGHTS RESERVED.</span>
          <span>BUILT FOR FINANCIAL CLARITY.</span>
        </footer>
      </main>
    </div>
  );
}

export default Home;
