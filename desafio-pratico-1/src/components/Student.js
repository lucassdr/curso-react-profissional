import classNames from 'classnames'
import React from 'react'

class Student extends React.Component {
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
		this.props.onEdit(this.props.student.id, this.input.value)
		this.setState({ isEditing: false })
	}

	render() {
		const { student, onDelete } = this.props
		let { isEditing } = this.state
		return (
			<div className='student'>
				{isEditing ? (
					<input
						type='text'
						className='student__input'
						defaultValue={student.name}
						ref={c => (this.input = c)}
					/>
				) : (
					<span className='student__name'>{student.name}</span>
				)}
				{isEditing ? (
					<React.Fragment>
						<button
							className={classNames(
								'student__button',
								'student__button--cancel'
							)}
							onClick={() => {
								this.handleCancel()
							}}>
							<i className='material-icons'>cancel</i>
						</button>
						<button
							className={classNames(
								'student__button',
								'student__button--done'
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
								'student__button',
								'student__button--edit'
							)}
							onClick={this.handleEdit}>
							<i className='material-icons'>edit</i>
						</button>
						<button
							className={classNames(
								'student__button',
								'student__button--delete'
							)}
							onClick={() => onDelete(student)}>
							<i className='material-icons'>delete</i>
						</button>
					</React.Fragment>
				)}
			</div>
		)
	}
}

export default Student
