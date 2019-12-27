import React from 'react'

const AppBar = ({ isLoading, saveHasError, onSaveRetry, openMenu }) => (
	<div className={'app-bar'}>
		<div className={'app-bar__container'}>
			<button className='app-bar__action' onClick={openMenu}>
				<i className='material-icons'>menu</i>
			</button>
			<span className='app-bar__brand'>Auto Escola Senna</span>
			{isLoading && (
				<button className='app-bar__action app-bar__action--rotation'>
					<i className='material-icons'>refresh</i>
				</button>
			)}
			{saveHasError && (
				<button
					className='app-bar__action app-bar__action--danger'
					onClick={onSaveRetry}>
					<i className='material-icons'>cloud_off</i>
				</button>
			)}
		</div>
	</div>
)

export default AppBar
