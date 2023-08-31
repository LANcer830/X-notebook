import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router";

const Note = (props) => {
  const context = useContext(noteContext);
  let navigate=useNavigate();
  const { notes, getAllNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
      navigate("/login");

    }
 
    // eslint-disable-next-line
  }, []);
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const handleClick=(e)=>{

        editNote(note.id,note.etitle,note.edescription,note.etag);
        e.preventDefault();
        props.showAlert("Updated successfully","success");
    }
    const updateNote = (currentNote) => { 

      setnote({id:currentNote._id, etitle:currentNote.title,edescription: currentNote.description,etag:currentNote.tag})
   
    };
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})

    }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
              
                    type="text"
                    minLength={5}
                    required
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
              
                    type="text"
                    minLength={5}
                    required
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    tag
                  </label>
                  <input
              
                    type="text"
                    minLength={5}
                    required
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} className="btn btn-primary" data-bs-dismiss='modal'>
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>your note</h1>
        <div className="container mx-2">
          {notes.length===0 && 'no notes to display'}

        </div>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} notes={notes} />;
        })}
      </div>
    </>
  );
};

export default Note;
