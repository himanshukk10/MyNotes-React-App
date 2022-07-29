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
		// {
		// 	id: nanoid(),
		// 	text: "This is my second note",
		// 	date: "12-08-2022",
		// },
		// {
		// 	id: nanoid(),
		// 	text: "This is my third note",
		// 	date: "4-09-2022",
		// },
		// {
		// 	id: nanoid(),
		// 	text: "This is my fourth note",
		// 	date: "17-10-2022",
		// },
	]);

	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
	}, [notes]);


	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString('en-GB')
		}

		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const delteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	}

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className="container">
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLocaleLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={delteNote}
				/>
			</div>
		</div>
	);
};

export default App;