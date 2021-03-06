import classNames from 'classnames'
import React from 'react'

class TheoryClass extends React.Component {
	state = {
		isEditing: false
	}

	handleStudentsInTheoryClass = () => {
		history.push('/students')
	}

	handleEdit = () => {
		this.setState({ isEditing: true })
	}

	handleCancel = () => {
		this.setState({ isEditing: false })
	}

	handleSave = () => {
		this.props.onEdit(this.props.theoryClass.id, this.input.value)
		this.setState({ isEditing: false })
	}

	render() {
		const { theoryClass, onDelete, history } = this.props
		let { isEditing } = this.state
		return (
			<div className='student'>
				{isEditing ? (
					<input
						type='text'
						className='student__input'
						defaultValue={theoryClass.name}
						ref={c => (this.input = c)}
					/>
				) : (
					<React.Fragment>
						<span className='student__name'>
							{theoryClass.name}
						</span>
						<span>{new Date().getMilliseconds()}</span>
					</React.Fragment>
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
							// onClick={ () => history.push( '/students' ) }
						>
							<i className='material-icons'>group</i>
						</button>
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
							onClick={() => onDelete(theoryClass)}>
							<i className='material-icons'>delete</i>
						</button>
					</React.Fragment>
				)}
			</div>
		)
	}
}

export default TheoryClass
