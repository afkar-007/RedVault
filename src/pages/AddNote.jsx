
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AddNote.css";

import Loading from "../components/Loading";
import { useEffect } from "react";

function AddNote() {


   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })
  const navigate = useNavigate();

  const id=localStorage.getItem("id")

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a note title");
      return;
    }

    if (!formData.content.trim()) {
      setError("Please enter your note content");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const sendData = {
        title: formData.title,
        content: formData.content,
        userId:id
      };

      const response = await fetch(`https://redvault-backend.onrender.com/notes/addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(sendData),
      });

      
      

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create note");
      }

      

      navigate("/notes");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if(loading){
    return <Loading/>
  }

  return (
    <div className="rv-add-note-page">

      <div className="rv-add-note-header">
        <div>
          <span className="rv-add-note-eyebrow">
            <i className="bi bi-journal-plus"></i>
            PERSONAL WORKSPACE
          </span>

          <h1>Create a Note<span>.</span></h1>

          <p>Capture your thoughts before they disappear.</p>
        </div>

        <Link to="/notes" className="rv-add-note-back">
          <i className="bi bi-arrow-left"></i>
          Back to Notes
        </Link>
      </div>

      <div className="rv-add-note-layout">

        <div className="rv-add-note-main">

          <form onSubmit={handleSubmit}>

            <div className="rv-add-note-card">

              <div className="rv-add-note-card-heading">
                <div>
                  <h2>Note Details</h2>
                  <p>Write down something worth remembering.</p>
                </div>

                <span className="rv-add-note-icon">
                  <i className="bi bi-file-earmark-text"></i>
                </span>
              </div>

              {error && (
                <div className="rv-add-note-error">
                  <i className="bi bi-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <div className="rv-add-note-field">
                <label htmlFor="rv-note-title">Note Title</label>

                <input
                  id="rv-note-title"
                  type="text"
                  name="title"
                  placeholder="Give your note a title..."
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                />

                <span className="rv-add-note-counter">
                  {formData.title.length}/100
                </span>
              </div>

              <div className="rv-add-note-field rv-add-note-content-field">
                <div className="rv-add-note-label-row">
                  <label htmlFor="rv-note-description">
                    Your Content
                  </label>

                  <span>
                    {formData.content.length} characters
                  </span>
                </div>

                <textarea
                  id="rv-note-description"
                  name="content"
                  placeholder="Start writing your thoughts, ideas, plans..."
                  value={formData.content}
                  onChange={handleChange}
                  rows={12}
                  maxLength={10000}
                ></textarea>
              </div>

              <div className="rv-add-note-actions">
                <Link to="/notes" className="rv-add-note-cancel">
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="rv-add-note-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="rv-add-note-button-spinner"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-floppy"></i>
                      Save Note
                    </>
                  )}
                </button>
              </div>

            </div>

          </form>

        </div>

        <aside className="rv-add-note-sidebar">

          <div className="rv-add-note-tip-card">
            <span className="rv-add-note-tip-icon">
              <i className="bi bi-lightbulb"></i>
            </span>

            <h3>A little reminder</h3>

            <p>
              Your best ideas deserve a place. Write freely,
              organize your thoughts and keep what matters.
            </p>
          </div>

          <div className="rv-add-note-info">
            <span><i className="bi bi-shield-check"></i></span>

            <div>
              <h4>Your personal space</h4>
              <p>Your notes are saved to your REDVAULT account.</p>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
}

export default AddNote;
