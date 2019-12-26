import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

const App = () => (
	<div className='container'>
		<NewNote />
		<NoteList />
	</div>
)

const NewNote = () => (
	<div className={'new-note'}>
		<input type='text' className={'new-note__input'} />
	</div>
)

const NoteList = () => {
	return (
		<div className='note-list'>
			<div className='note'>TESTE 1</div>
			<div className='note'>TESTE 2</div>
			<div className='note'>TESTE 3</div>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
