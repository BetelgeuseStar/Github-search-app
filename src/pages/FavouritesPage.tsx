import { useState, useEffect } from 'react'
import PagePagination from '../components/PagePagination'
import UsersList from '../components/UsersList'
import { useAppSelector } from '../hooks/useAppSelector'


function FavouritesPage() {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const favourites = useAppSelector(store => store.github.favourites)
	const foundUsers = favourites ? favourites.filter(user => user.login.toUpperCase().includes(search.toUpperCase())) : []
	const visibleUsers = foundUsers.slice(((page - 1) * 30), page * 30)
	const totalPages = favourites ? ((foundUsers.length / 30) > 34 ? 34 : Math.ceil(foundUsers.length / 30)) : 0
	useEffect(() => {
		setPage(1)
	}, [search])
	return (
		<div className='home-page page'>
			<div className='search'>
				<h2 className='search__title'>Favourite profiles</h2>
				<input
					className='search__input'
					type="text"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<div>
					<UsersList usersList={visibleUsers} />
				</div>
				<PagePagination numberOfPages={totalPages} setPage={setPage} search={search} />
			</div>
		</div>
	)
}

export default FavouritesPage