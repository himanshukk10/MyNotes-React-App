import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;
    
    const handleChange = (event) => {
        if(characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    }

    const handleSaveClick = () => {
        if(noteText.trim().length > 0) { //trim ignores blank spaces before and after string
            handleAddNote(noteText);
            setNoteText('');
        }
    }

    return (
        <div className="note new">
            <textarea cols="10" 
            rows="8" 
            placeholder="Type here to add a note"
            value = {noteText}
            onChange = {handleChange}
            ></textarea>
            <div className="note-footer">
                <small>{characterLimit - noteText.length} characters remaining</small>
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    )
};

export default AddNote;