

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/NoteView.css";
import Loading from "../components/Loading";

const API_URL = "http://localhost:3000/notes";

function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showDelete, setShowDelete] = useState(false);

  const[delId,setDelId]=useState(null)
  

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNote();
  }, [id]);

   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })

  async function fetchNote() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/getOneNotes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch note");
      }

      setNote(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote() {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this note?"
    // );

    // if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/notesDelete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete note");
      }

      navigate("/notes", { replace: true });
    } catch (err) {
      setError(err.message);
    }
    finally{
      setShowDelete(false)
    }
  }

  function formatDate(date) {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error && !note) {
    return (
      <div className="rv-note-view-state">
        <i className="bi bi-exclamation-circle"></i>
        <h3>Unable to open note</h3>
        <p>{error}</p>
        <Link to="/notes" className="rv-note-view-back">
          Back to Notes
        </Link>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="rv-note-view-page">
      <div className="rv-note-view-container">

        <div className="rv-note-view-top">
          <Link to="/notes" className="rv-note-view-back">
            <i className="bi bi-arrow-left"></i>
            Back to Notes
          </Link>

          <div className="rv-note-view-actions">
            <Link
              to={`/manageNote/${note._id}`}
              className="rv-note-view-edit"
            >
              <i className="bi bi-pencil"></i>
              Edit Note
            </Link>

            <button
              className="rv-note-view-delete"
              onClick={()=>{setShowDelete(true),setDelId(note._id)}}
            >
              <i className="bi bi-trash3"></i>
              Delete
            </button>
          </div>
        </div>

        {error && <p className="rv-note-view-error">{error}</p>}

        <article className="rv-note-view-card">
          <div className="rv-note-view-label">
            <i className="bi bi-journal-text"></i>
            PERSONAL NOTE
          </div>

          <h1>{note.title}</h1>

          <div className="rv-note-view-meta">
            <span>
              <i className="bi bi-calendar3"></i>
              {formatDate(note.createdAt || note.date)}
            </span>
          </div>

          <div className="rv-note-view-divider"></div>

          <div className="rv-note-view-description">
            {note.content}
          </div>

          <div className="rv-note-view-footer">
            <i className="bi bi-shield-check"></i>
            Your thoughts, safely organized.
          </div>
        </article>

      </div>

       {showDelete && (
        <div className="rv-manage-overlay">
          <div className="rv-manage-confirm">
            <i className="bi bi-exclamation-triangle"></i>
            <h2>Delete Note?</h2>
            <br />
            <p>This Note will be permanently deleted.</p>

            <div>
              <button onClick={() => setShowDelete(false)}>Cancel</button>

              <button onClick={() => deleteNote(delId)} disabled={loading}>
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}




    </div>
  );
}

export default NoteView;

