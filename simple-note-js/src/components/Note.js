import classNames from 'classnames'
import React from 'react'

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
			<div className='note'>
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

export default Note
