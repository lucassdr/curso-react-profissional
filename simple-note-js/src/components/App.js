import React from 'react'
import uuid from 'uuid/v1'
import AppBar from './AppBar'
import NewNote from './NewNote'
import NoteList from './NoteList'

class App extends React.Component {
	state = {
		notes: []
	}

	handleAddNote = text => {
		this.setState(prevState => ({
			notes: prevState.notes.concat({
				id: uuid(),
				text
			})
		}))
	}

	handleMove = (direction, index) => {
		this.setState(prevState => {
			const newNotes = prevState.notes.slice()
			const removedNote = newNotes.splice(index, 1)[0]

			if (direction === 'up') {
				newNotes.splice(index - 1, 0, removedNote)
			} else if (direction === 'down') {
				newNotes.splice(index + 1, 0, removedNote)
			}

			return {
				notes: newNotes
			}
		})
	}

	handleDelete = note => {
		let confirmDelete = confirm(
			`Você deseja remover a nota "${note.text}"?`
		)
		if (confirmDelete) {
			this.setState(prevState => {
				const newNotes = prevState.notes.slice()
				const index = newNotes.findIndex(note => note.id === note.id)
				newNotes.splice(index, 1)[0]

				return {
					notes: newNotes
				}
			})
		}
	}

	handleEdit = (id, text) => {
		this.setState(prevState => {
			const newNotes = prevState.notes.slice()
			const index = newNotes.findIndex(note => note.id === id)
			newNotes[index].text = text

			return {
				notes: newNotes
			}
		})
	}

	handleReload = () => {
		const notes = window.localStorage.getItem('notes')
		this.setState({ notes: JSON.parse(notes) })
	}

	handleSave = () => {
		const { notes } = this.state
		window.localStorage.setItem('notes', JSON.stringify(notes))
	}

	render() {
		return (
			<div>
				<AppBar onReload={this.handleReload} onSave={this.handleSave} />
				<div className='container'>
					<NewNote onAddNote={this.handleAddNote} />
					<NoteList
						notes={this.state.notes}
						onMove={this.handleMove}
						onDelete={this.handleDelete}
						onEdit={this.handleEdit}
					/>
				</div>
			</div>
		)
	}
}

export default App
