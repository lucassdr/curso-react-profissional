import React from 'react'
import NewNote from '../components/NewNote'
import NoteList from '../components/NoteList'

const Notes = ({
	reloadHasError,
	onRetry,
	onAddNote,
	onDelete,
	onEdit,
	onMove,
	notes
}) => {
	if (reloadHasError) {
		return <Error onRetry={onRetry} />
	}
	return (
		<React.Fragment>
			<NewNote onAddNote={onAddNote} />
			<NoteList
				notes={notes}
				onMove={onMove}
				onDelete={onDelete}
				onEdit={onEdit}
			/>
		</React.Fragment>
	)
}

export default Notes
