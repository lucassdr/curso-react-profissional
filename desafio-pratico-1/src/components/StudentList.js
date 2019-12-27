import React from 'react'
import Student from './Student'

const StudentList = ({ students, onDelete, onEdit }) => (
	<div className='student-list'>
		{students.map((student, index) => (
			<Student
				key={student.id}
				student={student}
				onEdit={onEdit}
				onDelete={onDelete}
				index={index}
				total={students.length}
			/>
		))}
	</div>
)

export default StudentList
