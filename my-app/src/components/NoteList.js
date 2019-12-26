import React from 'react'
import Note from './Note'

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

export default NoteList
