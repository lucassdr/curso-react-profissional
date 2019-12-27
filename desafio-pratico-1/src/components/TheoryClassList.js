import React from 'react'
import TheoryClass from './TheoryClass'

const TheoryClassList = ({ theoryClasses, onDelete, onEdit }) => (
	<div className='student-list'>
		{theoryClasses.map((theoryClass, index) => (
			<TheoryClass
				key={theoryClass.id}
				theoryClass={theoryClass}
				onEdit={onEdit}
				onDelete={onDelete}
				index={index}
				total={theoryClasses.length}
			/>
		))}
	</div>
)

export default TheoryClassList
