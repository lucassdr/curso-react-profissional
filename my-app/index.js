import classNames from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid'
import './index.scss'

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
			console.log('IF', confirmDelete)

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

	render() {
		return (
			<div className='container'>
				<NewNote onAddNote={this.handleAddNote} />
				<NoteList
					notes={this.state.notes}
					onMove={this.handleMove}
					onDelete={this.handleDelete}
					onEdit={this.handleEdit}
				/>
			</div>
		)
	}
}

class NewNote extends React.Component {
	state = {
		text: ''
	}
	render() {
		const { onAddNote } = this.props
		let { text } = this.state
		return (
			<div className={'new-note'}>
				<input
					type='text'
					className={'new-note__input'}
					placeholder={'Digite sua nota aqui...'}
					value={text}
					onChange={event => {
						this.setState({ text: event.target.value })
					}}
					onKeyPress={event => {
						if (event.key === 'Enter') {
							onAddNote(event.target.value)
							this.setState({ text: '' })
						}
					}}
				/>
			</div>
		)
	}
}

class Note extends React.Component {
	state = {
		isEditing: false
	}

	handleEdit = () => {
		this.setState({ isEditing: true })
	}

	handleCancel = () => {
		this.setState({ isEditing: false })
	}

	handleSave = () => {
		this.props.onEdit(this.props.note.id, this.input.value)
		this.setState({ isEditing: false })
	}

	render() {
		const { note, onEdit, onDelete, onMove, index, total } = this.props
		let { isEditing } = this.state
		return (
			<div className='note' key={note.id}>
				{isEditing ? (
					<input
						type='text'
						className='note__input'
						defaultValue={note.text}
						ref={c => (this.input = c)}
					/>
				) : (
					<span className='note__text'>{note.text}</span>
				)}
				{isEditing ? (
					<React.Fragment>
						<button
							className={classNames(
								'note__button',
								'note__button--cancel'
							)}
							onClick={() => {
								this.handleCancel()
							}}>
							<i className='material-icons'>cancel</i>
						</button>
						<button
							className={classNames(
								'note__button',
								'note__button--done'
							)}
							onClick={() => {
								this.handleSave()
							}}>
							<i className={'material-icons'}>done</i>
						</button>
					</React.Fragment>
				) : (
					<React.Fragment>
						<button
							className={classNames(
								'note__button',
								'note__button--edit'
							)}
							onClick={this.handleEdit}>
							<i className='material-icons'>edit</i>
						</button>
						<button
							className={classNames(
								'note__button',
								'note__button--delete'
							)}
							onClick={() => onDelete(note)}>
							<i className='material-icons'>delete</i>
						</button>
						<button
							className={classNames('note__button', {
								'note__button--hiden': index == 0
							})}
							onClick={() => onMove('up', index)}>
							<i className='material-icons'>arrow_upward</i>
						</button>
						<button
							className={classNames('note__button', {
								'note__button--hiden': index == total - 1
							})}
							onClick={() => onMove('down', index)}>
							<i className='material-icons'>arrow_downward</i>
						</button>
					</React.Fragment>
				)}
			</div>
		)
	}
}

const NoteList = ({ notes, onMove, onDelete, onEdit }) => (
	<div className='note-list'>
		{notes.map((note, index) => (
			<Note
				key={note.id}
				note={note}
				onEdit={onEdit}
				onDelete={onDelete}
				onMove={onMove}
				index={index}
				total={notes.length}
			/>
		))}
	</div>
)

ReactDOM.render(<App />, document.getElementById('root'))
