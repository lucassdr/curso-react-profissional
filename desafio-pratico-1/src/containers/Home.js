import React from 'react'

const Home = ({ history }) => (
	<div className='home'>
		<h1>Home</h1>
		<div className='home-service-register'>
			<hr className='home__line-separator' />
			<div className='home__separator'>
				<h3 className='home__title'>Serviços</h3>
				<button
					className='home__button'
					onClick={() => {
						history.push('/theoryclass')
					}}>
					<i className='material-icons home__button__icons'>class</i>
					<p className='home__button__text'>Aula Teórica</p>
				</button>
			</div>
			<hr className='home__line-separator' />
			<div className='home__separator'>
				<h3 className='home__title'>Cadastro</h3>
				<button
					className='home__button'
					onClick={() => {
						history.push('/students')
					}}>
					<i className='material-icons home__button__icons'>
						group_work
					</i>
					<p className='home__button__text'> Alunos</p>
				</button>
			</div>
		</div>
	</div>
)

export default Home
