// teste
let failedLoadAttemps = 2
let failedSaveAttemps = 2
// teste
class NoteServices {
	static load() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (failedLoadAttemps > 1) {
					const notes = window.localStorage.getItem('notes')
					resolve(JSON.parse(notes))
				} else {
					reject()
					failedLoadAttemps++
				}
			}, 2000)
		})
	}

	static save(notes) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (failedSaveAttemps > 1) {
					window.localStorage.setItem('notes', JSON.stringify(notes))
					resolve()
				} else {
					reject()
					failedSaveAttemps
				}
			}, 2000)
		})
	}
}
export default NoteServices
