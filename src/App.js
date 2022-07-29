import { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: "This is my first note",
			date: "26-07-2022",
		},
		{
			id: nanoid(),
			text: "This is my second note",
			date: "12-08-2022",
		},
		{
			id: nanoid(),
			text: "This is my third note",
			date: "4-09-2022",
		},
		{
			id: nanoid(),
			text: "This is my fourth note",
			date: "17-10-2022",
		},
	]);

	const [searchText, setSearchText] = useState(''); //state hook

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		); //parses string into a javascript object

		//if any notes were successfully retrieved from local storage,
		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []); //when dependency array is empty, useEffect will only run on the first load

	useEffect(() => { 	//useEffect hook. will save notes to local storage. will trigger whenever notes changes
		localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
	}, [notes]); //dependency array


	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString('en-GB')
		}

		const newNotes = [...notes, newNote]; //spread operator
		setNotes(newNotes);
	};

	const delteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id); //filter method on arrays
		setNotes(newNotes);
	}

	return (
		<div className={`${darkMode && 'dark-mode'}`}> {/*if dark mode then add add dark mode*/}
			<div className="container">
				<Header handleToggleDarkMode={setDarkMode} /> {/*prop*/}
				<Search handleSearchNote={setSearchText} /> {/*hook function that lets update the state of searchText*/}
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLocaleLowerCase().includes(searchText)
					)} //will pass the result of this to the NotesList component as a notes prop
					handleAddNote={addNote}
					handleDeleteNote={delteNote}
				/>
			</div>
		</div>
	);
};

export default App;