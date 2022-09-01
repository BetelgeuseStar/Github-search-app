import { useState } from 'react'
import UsersList from '../components/UsersList'
import { useParams } from 'react-router-dom'
import { useGetUserFollowersQuery } from '../redux/api/githubApi'
import PagePagination from '../components/PagePagination'
import Error from '../components/Error'


function FollowersPage() {
	const [page, setPage] = useState(1)
	const params = useParams()
	const { data: followers, error } = useGetUserFollowersQuery({ login: params.login ?? '', page })
	const totalPages = params.total ? ((+params.total / 30) > 34 ? 34 : Math.ceil(+params.total / 30)) : 0
	return (
		<div className='followers-page page'>
			<div className='search'>
				<h2 className='search__title search__title_followers'>{`${params.login![0].toUpperCase()}${params.login!.slice(1)}'s  followers`}</h2>
				<Error error={error} />
				<div>
					<UsersList usersList={followers ?? []} />
				</div>
				<PagePagination numberOfPages={totalPages} setPage={setPage} />
			</div>
		</div>
	)
}

export default FollowersPage