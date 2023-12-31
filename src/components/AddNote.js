import React,{useContext,useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.showAlert("Updated successfully","success");
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div className='container my-3'>
      <h1>add a note</h1>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input minLength={5} required type="text" className="form-control" id="title" value={note.title} name='title' onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input minLength={5} required type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input minLength={5} required type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
  </div>
  
  
  <button type="submit" disabled={note.title.length<5||note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add a note</button>
</form>
      </div>
  )
}

export default AddNote