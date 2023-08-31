import React,{ useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  
  const host="http://localhost:5000";
  const notesInitial=[]
  const [notes, setNotes] = useState(notesInitial)




  const getAllNotes=async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    
    }); 
    const json=await response.json()
   
    setNotes(json)
  }


  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  
  const deleteNote=async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }, 
    });
    const json= response.json(); 
    console.log(json);
   const newNotes=notes.filter((note)=>{return note._id!==id})
   setNotes(newNotes);
  

  }
  const editNote=async (id,title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method:'PUT', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}), 
    });
    const json= await response.json(); 
    console.log(json);
   
    // for (let index = 0; index < notes.length; index++) {
    //   const element=notes[index];
    //   if(notes._id===id){
    //     notes[index].title=title;
    //     notes[index].description=description;
    //     notes[index].tag=tag;
    //     break;
    //   }
    
    // }
    // setNotes(notes);
    getAllNotes();
    
  }
 
  
  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>{props.children}</NoteContext.Provider>
  );
};
export default NoteState;
