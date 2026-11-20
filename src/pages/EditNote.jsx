
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/EditNote.css";
import Loading from "../components/Loading";

const API_URL = "https://redvault-backend.onrender.com";

function EditNote() {


   useEffect(()=>{
      const checkGateway = localStorage.getItem("homeGateway")
      if( checkGateway!=="true"){
        navigate('/')
      }
    })


  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  

  useEffect(() => {
    fetchNote();
  }, [id]);

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

      setFormData({
        title: data.data.title || "",
        content: data.data.content || "",
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a note title");
      return;
    }

    if (!formData.content.trim()) {
      setError("Please enter your note description");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(`${API_URL}/noteOneEdit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update note");
      }

    //   navigate(`/viewNote/${id}`, { replace: true });

   
         if(response.ok){
        navigate(`/viewNote/${id}`)
      
    }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="rv-edit-note-page">
      <div className="rv-edit-note-container">

        <div className="rv-edit-note-header">
          <Link to={`/viewNote/${id}`} className="rv-edit-note-back">
            <i className="bi bi-arrow-left"></i>
            Back to Note
          </Link>

          <span className="rv-edit-note-label">
            <i className="bi bi-pencil-square"></i>
            EDIT NOTE
          </span>
        </div>

        <div className="rv-edit-note-card">
          <div className="rv-edit-note-heading">
            <h1>Edit your note</h1>
            <p>Make changes to your thoughts and save them.</p>
          </div>

          {error && (
            <div className="rv-edit-note-error">
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="rv-edit-note-field">
              <label htmlFor="rv-edit-note-title">Note Title</label>

              <input
                id="rv-edit-note-title"
                type="text"
                name="title"
                placeholder="Enter your note title"
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
              />

              <span>{formData.title.length}/100</span>
            </div>

            <div className="rv-edit-note-field">
              <label htmlFor="rv-edit-note-description">
                Content
              </label>

              <textarea
                id="rv-edit-note-description"
                name="content"
                placeholder="Write your thoughts here..."
                value={formData.content}
                onChange={handleChange}
                rows={12}
                maxLength={10000}
              />

              <span>{formData.content.length}/10000</span>
            </div>

            <div className="rv-edit-note-actions">
              <Link to={`/viewNote/${id}`} className="rv-edit-note-cancel">
                Cancel
              </Link>

              <button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <span className="rv-edit-note-button-loader"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check2"></i>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNote;

