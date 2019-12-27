// teste
let failedLoadAttemps = 2
let failedSaveAttemps = 2
// teste
class StudentService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (failedLoadAttemps > 1) {
					const students = window.localStorage.getItem('students')
					resolve(students ? JSON.parse(students) : [])
				} else {
					reject()
					failedLoadAttemps++
				}
			}, 2000)
		})
	}

	static save(students) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (failedSaveAttemps > 1) {
					window.localStorage.setItem(
						'students',
						JSON.stringify(students)
					)
					resolve()
				} else {
					reject()
					failedSaveAttemps
				}
			}, 2000)
		})
	}
}
export default StudentService
