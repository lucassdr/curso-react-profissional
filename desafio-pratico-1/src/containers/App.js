import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import uuid from 'uuid/v1'
import AppBar from '../components/AppBar'
import NavigationDrawer from '../components/NavigationDrawer'
import StudentService from '../services/StudentServices'
import TheoryClassService from '../services/TheoryClassServices'
import About from './About'
import Home from './Home'
import Students from './Students'
import TheoryClasses from './TheoryClasses'

class App extends React.Component {
	state = {
		students: [],
		theoryClass: [],
		isLoading: false,
		isMenuOpen: false,
		reloadHasError: false,
		saveHasError: false
	}

	componentDidMount() {
		this.handleReload()
		this.handleReloadTheoryClass()
	}

	componentDidCatch() {
		this.setState({ reloadHasError: true })
	}

	handleAddStudent = name => {
		this.setState(prevState => {
			const students = prevState.students.concat({ id: uuid(), name })
			this.handleSave(students)
			return { students }
		})
	}

	handleAddTheoryClass = name => {
		this.setState(prevState => {
			const theoryClass = prevState.theoryClass.concat({
				id: uuid(),
				name
			})
			this.handleSaveTheoryClass(theoryClass)
			return { theoryClass }
		})
	}

	handleDelete = student => {
		let confirmDelete = confirm(
			`Você deseja remover o estudante "${student.name}"?`
		)
		if (confirmDelete) {
			this.setState(prevState => {
				const newStudents = prevState.students.slice()
				const index = newStudents.findIndex(
					student => student.id === student.id
				)
				newStudents.splice(index, 1)[0]

				this.handleSave(newStudents)
				return {
					students: newStudents
				}
			})
		}
	}

	handleDeleteTheoryClass = theoryClass => {
		let confirmDelete = confirm(
			`Você deseja remover a turma "${theoryClass.name}"?`
		)
		if (confirmDelete) {
			this.setState(prevState => {
				const newTheoryClasses = prevState.theoryClass.slice()
				const index = newTheoryClasses.findIndex(
					theoryClass => theoryClass.id === theoryClass.id
				)
				newTheoryClasses.splice(index, 1)[0]

				this.handleSaveTheoryClass(newTheoryClasses)
				return {
					theoryClass: newTheoryClasses
				}
			})
		}
	}

	handleEdit = (id, name) => {
		this.setState(prevState => {
			const newStudents = prevState.students.slice()
			const index = newStudents.findIndex(student => student.id === id)
			newStudents[index].name = name
			this.handleSave(newStudents)
			return {
				students: newStudents
			}
		})
	}

	handleEditTheoryClass = (id, name) => {
		this.setState(prevState => {
			const newTheoryClasses = prevState.theoryClass.slice()
			const index = newTheoryClasses.findIndex(
				theoryClass => theoryClass.id === id
			)
			newTheoryClasses[index].name = name
			this.handleSaveTheoryClass(newTheoryClasses)
			return {
				theoryClass: newTheoryClasses
			}
		})
	}

	handleReload = () => {
		this.setState({ isLoading: true, reloadHasError: false })
		StudentService.load()
			.then(students => {
				this.setState({ students, isLoading: false })
			})
			.catch(() => {
				this.setState({ isLoading: false, reloadHasError: true })
			})
	}

	handleReloadTheoryClass = () => {
		this.setState({ isLoading: true, reloadHasError: false })
		TheoryClassService.load()
			.then(theoryClass => {
				this.setState({ theoryClass, isLoading: false })
			})
			.catch(() => {
				this.setState({ isLoading: false, reloadHasError: true })
			})
	}

	handleSave = students => {
		this.setState({ isLoading: true, saveHasError: false })
		StudentService.save(students)
			.then(() => {
				this.setState({ isLoading: false })
			})
			.catch(() => {
				this.setState({ isLoading: false, saveHasError: true })
			})
	}

	handleSaveTheoryClass = theoryClass => {
		this.setState({ isLoading: true, saveHasError: false })
		TheoryClassService.save(theoryClass)
			.then(() => {
				this.setState({ isLoading: false })
			})
			.catch(() => {
				this.setState({ isLoading: false, saveHasError: true })
			})
	}

	handleOpenMenu = () => {
		this.setState({ isMenuOpen: true })
	}

	handleCloseMenu = () => {
		this.setState({ isMenuOpen: false })
	}

	render() {
		let {
			students,
			theoryClass,
			isLoading,
			reloadHasError,
			saveHasError,
			isMenuOpen
		} = this.state
		return (
			<Router>
				<div>
					<AppBar
						isLoading={isLoading}
						saveHasError={saveHasError}
						onSaveRetry={() => this.handleSave(students)}
						openMenu={this.handleOpenMenu}
					/>
					<div className='container'>
						<React.Fragment>
							<Route path={'/'} exact component={Home} />
							<Route
								path={'/students'}
								exact
								render={props => (
									<Students
										students={students}
										reloadHasError={reloadHasError}
										onRetry={this.handleReload}
										onAddStudent={this.handleAddStudent}
										onDelete={this.handleDelete}
										onEdit={this.handleEdit}
									/>
								)}
							/>
							<Route
								path={'/theoryclass'}
								exact
								render={props => (
									<TheoryClasses
										theoryClasses={theoryClass}
										reloadHasError={reloadHasError}
										onRetry={this.handleReloadTheoryClass}
										onAddTheoryClass={
											this.handleAddTheoryClass
										}
										onDelete={this.handleDeleteTheoryClass}
										onEdit={this.handleEditTheoryClass}
									/>
								)}
							/>
							<Route path={'/about'} exact component={About} />
						</React.Fragment>
					</div>
					<NavigationDrawer
						isOpen={isMenuOpen}
						onCloseMenu={this.handleCloseMenu}
					/>
				</div>
			</Router>
		)
	}
}

export default App
