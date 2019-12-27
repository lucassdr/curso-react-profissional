import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import uuid from 'uuid/v1'
import AppBar from '../components/AppBar'
import NavigationDrawer from '../components/NavigationDrawer'
import StudentService from '../services/StudentServices'
import About from './About'
import Home from './Home'
import Students from './Students'
import TheoryClass from './TheoryClass'

class App extends React.Component {
	state = {
		students: [],
		isLoading: false,
		isMenuOpen: false,
		reloadHasError: false,
		saveHasError: false
	}

	componentDidMount() {
		this.handleReload()
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

	handleOpenMenu = () => {
		this.setState({ isMenuOpen: true })
	}

	handleCloseMenu = () => {
		this.setState({ isMenuOpen: false })
	}

	render() {
		let {
			students,
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
								component={TheoryClass}
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
