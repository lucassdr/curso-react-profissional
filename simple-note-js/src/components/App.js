import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import uuid from 'uuid/v1'
import NoteService from '../services/NotesServices'
import About from './About'
import AppBar from './AppBar'
import NavigationDrawer from './NavigationDrawer'
import Notes from './Notes'

class App extends React.Component {
	state = {
		notes: [],
		isLoading: false,
		isMenuOpen: false,
		reloadHasError: false,
		saveHasError: false
	}

	componentDidMount() {
		this.handleReload()
	}

	componentDidCatch() {
		this.setState({ reloadHasError: true })
	}

	handleAddNote = text => {
		this.setState(prevState => {
			const notes = prevState.notes.concat({ id: uuid(), text })
			this.handleSave(notes)
			return { notes }
		})
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

			this.handleSave(newNotes)

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

				this.handleSave(newNotes)
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
			this.handleSave(newNotes)
			return {
				notes: newNotes
			}
		})
	}

	handleReload = () => {
		this.setState({ isLoading: true, reloadHasError: false })
		NoteService.load()
			.then(notes => {
				this.setState({ notes, isLoading: false })
			})
			.catch(() => {
				this.setState({ isLoading: false, reloadHasError: true })
			})
	}

	handleSave = notes => {
		this.setState({ isLoading: true, saveHasError: false })
		NoteService.save(notes)
			.then(() => {
				this.setState({ isLoading: false })
			})
			.catch(() => {
				this.setState({ isLoading: false, saveHasError: true })
			})
	}

	handleOpenMenu = () => {
		this.setState({ isMenuOpen: true })
	}

	handleCloseMenu = () => {
		this.setState({ isMenuOpen: false })
	}

	render() {
		let {
			notes,
			isLoading,
			reloadHasError,
			saveHasError,
			isMenuOpen
		} = this.state
		return (
			<Router>
				<div>
					<AppBar
						isLoading={isLoading}
						saveHasError={saveHasError}
						onSaveRetry={() => this.handleSave(notes)}
						openMenu={this.handleOpenMenu}
					/>
					<div className='container'>
						<React.Fragment>
							<Route path={'/'} exact component={Notes} />
							<Route path={'/about'} exact component={About} />
						</React.Fragment>
					</div>
					<NavigationDrawer
						isOpen={isMenuOpen}
						onCloseMenu={this.handleCloseMenu}
					/>
				</div>
			</Router>
		)
	}
}

export default App
