import { NavLink } from 'react-router-dom'

function Navigation() {
	return (
		<nav className='nav'>
			<NavLink to='/' className='nav__title'>Github Search</NavLink>
			<ul className='nav__list'>
				<li className="nav__item"><NavLink className='nav__link' to='/'>Search</NavLink></li>
				<li className="nav__item"><NavLink className='nav__link' to='/favourites'>Favourites</NavLink></li>
			</ul>
		</nav>
	)
}

export default Navigation