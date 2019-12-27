// teste
let failedLoadAttemps = 2
let failedSaveAttemps = 2
// teste
class TheoryClassService {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (failedLoadAttemps > 1) {
					const theoryClass = window.localStorage.getItem(
						'theoryClass'
					)
					resolve(theoryClass ? JSON.parse(theoryClass) : [])
				} else {
					reject()
					failedLoadAttemps++
				}
			}, 2000)
		})
	}

	static save(theoryClass) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (failedSaveAttemps > 1) {
					window.localStorage.setItem(
						'theoryClass',
						JSON.stringify(theoryClass)
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
export default TheoryClassService
