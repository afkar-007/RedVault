
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Notes.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const API_URL = "http://localhost:3000/notes";

function Notes() {
  const navigate = useNavigate()


  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const userId = localStorage.getItem("id")

  const [showDelete, setShowDelete] = useState(false);

  const [delId,setDelId]=useState(null)

  useEffect(() => {
    fetchNotes();
  }, []);

   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })



  async function fetchNotes() {
    try {
      setLoading(true);
      setError("");
   console.log(userId);
   
      const response = await fetch(`${API_URL}/getNotes/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log(data);
      

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch notes");
      }

      setNotes(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteNote(id) {
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

      if(response.ok){
        await fetchNotes()
        
      }

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      setError(err.message);
    }
    finally{
      setShowDelete(false)
    }
  }

  const filteredNotes = notes.filter((note) => {
    const searchText = search.toLowerCase();

    return (
      note.title?.toLowerCase().includes(searchText) ||
      note.description?.toLowerCase().includes(searchText)
    );
  });


  if(loading){
    return <Loading/>
  }

  return (
    <div className="rv-notes-page">

       <div className="rv-notes-back-wrapper">
  <Link to="/home" className="rv-notes-back-btn">
    <i className="bi bi-arrow-left"></i>
    <span>Back to Dashboard</span>
  </Link>
</div>



      <div className="rv-notes-header">
        <div>
          <span className="rv-notes-eyebrow">
            <i className="bi bi-journal-text"></i> YOUR PERSONAL SPACE
          </span>

          <h1>My Notes<span>.</span></h1>

          <p>Keep your thoughts, plans and important ideas in one place.</p>
        </div>

        <Link to="/addNote" className="rv-notes-add-btn">
          <i className="bi bi-plus-lg"></i>
          Create Note
        </Link>
      </div>

      <div className="rv-notes-toolbar">
        <div className="rv-notes-search">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rv-notes-count">
          <i className="bi bi-sticky"></i>
          {notes.length} Notes
        </div>
      </div>

      {error && (
        <div className="rv-notes-error">
          <i className="bi bi-exclamation-circle"></i>
          {error}
        </div>
      )}

      {loading ? (
        <div className="rv-notes-loading">
          {/* <div className="rv-notes-spinner"></div> */}
          <p>Loading your notes...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="rv-notes-empty">
          <div className="rv-notes-empty-icon">
            <i className="bi bi-journal-plus"></i>
          </div>

          <h3>{search ? "No notes found" : "Your space is empty"}</h3>

          <p>
            {search
              ? "Try searching with another keyword."
              : "Start collecting your thoughts and important ideas."}
          </p>

          {!search && (
            <Link to="/addNote" className="rv-notes-empty-btn">
              Create your first note
            </Link>
          )}
        </div>
      ) : (
        <div className="rv-notes-grid">
          {filteredNotes.map((note) => (
            <div className="rv-notes-card" key={note._id}>

              <div className="rv-notes-card-top">
                <span className="rv-notes-card-icon">
                  <i className="bi bi-file-earmark-text"></i>
                </span>

                <div className="rv-notes-card-actions">
                  <Link
                    to={`/manageNote/${note._id}`}
                    title="Edit note"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {setShowDelete(true),setDelId(note._id)}}
                    title="Delete note"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>

              <Link
                to={`/manageNote/${note._id}`}
                className="rv-notes-card-content"
              >
                <h3>{note.title}</h3>

                <p>{note.description}</p>
              </Link>

              <div className="rv-notes-card-footer">
                <span>
                  <i className="bi bi-calendar3"></i>
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleDateString()
                    : "Recently added"}
                </span>

                <span className="rv-notes-read" onClick={()=>navigate(`/viewNote/${note._id}`)}>
                  Open <i className="bi bi-arrow-up-right"></i>
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

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

export default Notes;
