import React from 'react'
import NewStudent from '../components/NewStudent'
import StudentList from '../components/StudentList'

const Students = ({
	reloadHasError,
	onRetry,
	onAddStudent,
	onDelete,
	onEdit,
	students
}) => {
	if (reloadHasError) {
		return <Error onRetry={onRetry} />
	}
	return (
		<React.Fragment>
			<NewStudent onAddStudent={onAddStudent} />
			<StudentList
				students={students}
				onDelete={onDelete}
				onEdit={onEdit}
			/>
		</React.Fragment>
	)
}

export default Students
