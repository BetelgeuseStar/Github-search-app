import { useState } from 'react'
import PagePagination from '../components/PagePagination'
import UsersList from '../components/UsersList'
import useDebounce from '../hooks/useDebounce'
import { useSearchUsersQuery } from '../redux/api/githubApi'
import Error from '../components/Error'


function HomePage() {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const debounced = useDebounce(search)
	const { data: searchResponse, isLoading, isFetching, error } = useSearchUsersQuery({ search: debounced, page }, {
		skip: debounced.length < 1
	})
	const foundUsers = searchResponse ? searchResponse.items : []
	const totalPages = searchResponse && search ? ((searchResponse.total_count / 30) > 34 ? 34 : Math.ceil(searchResponse.total_count / 30)) : 0
	return (
		<div className='home-page page'>
			<div className='search'>
				<h2 className='search__title'>Enter Github nickname</h2>
				<input
					className='search__input'
					type="text"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<Error error={error} />
				<img className={isLoading || isFetching ? 'gif' : 'gif gif_hidden'} src={require('../assets/Fidget-spinner.gif')}></img>
				<div>
					<UsersList usersList={foundUsers} />
				</div>
				<PagePagination numberOfPages={totalPages} setPage={setPage} />
			</div>
		</div>
	)
}

export default HomePage