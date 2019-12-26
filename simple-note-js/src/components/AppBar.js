import React from 'react'

const AppBar = ({ isLoading }) => (
	<div className={'app-bar'}>
		<div className={'app-bar__container'}>
			<span className='app-bar__brand'>simple note.js</span>
			{isLoading ? (
				<React.Fragment>
					<button className='app-bar__action app-bar__action--rotation'>
						<i className='material-icons'>refresh</i>
					</button>
				</React.Fragment>
			) : (
				''
			)}
		</div>
	</div>
)

export default AppBar
