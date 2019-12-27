import React from 'react'
import NewTheoryClass from '../components/NewTheoryClass'
import TheoryClassList from '../components/TheoryClassList'

const TheoryClasses = ({
	reloadHasError,
	onRetry,
	onAddTheoryClass,
	onDelete,
	onEdit,
	theoryClasses
}) => {
	if (reloadHasError) {
		return <Error onRetry={onRetry} />
	}
	return (
		<React.Fragment>
			<NewTheoryClass onAddTheoryClass={onAddTheoryClass} />
			<TheoryClassList
				theoryClasses={theoryClasses}
				onDelete={onDelete}
				onEdit={onEdit}
			/>
		</React.Fragment>
	)
}

export default TheoryClasses
