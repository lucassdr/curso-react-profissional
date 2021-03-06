import React from 'react'

class NewStudent extends React.Component {
	state = {
		name: ''
	}
	render() {
		const { onAddTheoryClass } = this.props
		let { name } = this.state
		return (
			<div className={'new-student'}>
				<input
					type='name'
					className={'new-student__input'}
					placeholder={'Digite aqui o nome do aluno...'}
					value={name}
					onChange={event => {
						this.setState({ name: event.target.value })
					}}
					onKeyPress={event => {
						if (event.key === 'Enter') {
							onAddTheoryClass(event.target.value)
							this.setState({ name: '' })
						}
					}}
				/>
			</div>
		)
	}
}
export default NewStudent
