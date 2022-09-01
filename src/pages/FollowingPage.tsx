import { useState } from 'react'
import UsersList from '../components/UsersList'
import { useParams } from 'react-router-dom'
import { useGetUserFollowingQuery } from '../redux/api/githubApi'
import PagePagination from '../components/PagePagination'
import Error from '../components/Error'


function FollowingPage() {
	const [page, setPage] = useState(1)
	const params = useParams()
	const { data: following, error } = useGetUserFollowingQuery({ login: params.login ?? '', page })
	const totalPages = params.total ? ((+params.total / 30) > 34 ? 34 : Math.ceil(+params.total / 30)) : 0
	return (
		<div className='followers-page page'>
			<div className='search'>
				<h2 className='search__title search__title_followers'>{`${params.login![0].toUpperCase()}${params.login!.slice(1)}'s  following`}</h2>
				<Error error={error} />
				<div>
					<UsersList usersList={following ?? []} />
				</div>
				<PagePagination numberOfPages={totalPages} setPage={setPage} />
			</div>
		</div>
	)
}

export default FollowingPage