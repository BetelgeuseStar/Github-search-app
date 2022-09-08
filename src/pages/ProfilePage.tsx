import { useParams } from 'react-router-dom'
import { useGetUserInfoQuery, useGetUserFollowersQuery, useGetUserRepositoriesQuery, useGetUserFollowingQuery } from '../redux/api/githubApi'
import Error from '../components/Error'
import Icon from '../components/Icon'
import { useActions } from '../hooks/useActions'
import { useAppSelector } from '../hooks/useAppSelector'
import PreviewInterface from '../components/PreviewInterface'
import PreviewRepos from '../components/PreviewRepos'
import { Link } from 'react-router-dom'
import { IUserPreview } from '../models/models'

function ProfilePage() {
	const { addFavourite, removeFavourite } = useActions()
	const { favourites } = useAppSelector(state => state.github)
	const params = useParams()
	const { data: user, error, isFetching, isLoading } = useGetUserInfoQuery(params.login ?? '')
	const { data: followers } = useGetUserFollowersQuery({ login: params.login ?? '', page: 1 })
	const { data: following } = useGetUserFollowingQuery({ login: params.login ?? '', page: 1 })
	const { data: repositories } = useGetUserRepositoriesQuery(params.login ?? '')

	function likeHandler(userPreview: IUserPreview) {
		if (favourites.find(user => user.login === userPreview.login)) {
			removeFavourite(userPreview)
		} else {
			addFavourite(userPreview)
		}
	}
	console.log(user)
	if (isFetching) {
		return <div className='not-found'><img className={isLoading || isFetching ? 'gif' : 'gif gif_hidden'} src={require('../assets/Fidget-spinner.gif')}></img></div>
	} else if (user) {
		const userPreview: IUserPreview = {
			login: user.login,
			id: user.id,
			html_url: user.html_url,
			avatar_url: user.avatar_url
		}
		let blog = <span className='main__answer'></span>
		if (user.blog) {
			blog = <a href={user.blog} className='main__answer main__answer_link'>{user.blog}</a>
		}
		return (
			<div className='profile'>
				<div className='profile__main main'>
					<div className='main__face'>
						<div className='main__top'>
							<img className='main__avatar' src={user.avatar_url} alt="avatar" />
							<div className='main__buttons'>
								<span className={favourites.find(user => user.login === userPreview.login) ? 'like favourite' : 'like'}>
									<Icon onClick={() => likeHandler(userPreview)} className='like__heart-border' type='heart-border' />
									<Icon className='like__heart' type='heart' />
								</span>
								<a className='main__btn btn' href={user.html_url} target='_blank'>Github profile</a>
							</div>
						</div>
						<div className='profile__extra extra'>
							<div className='extra__followers'>
								<Link to={`/followers/${user.login}/${user.followers}`} className='extra__title'>Followers: <span className='extra__number'>{user.followers}</span></Link>
								{followers ? <PreviewInterface items={followers.slice(0, 5).map(item => {
									return {
										avatar: item.avatar_url,
										title: item.login
									}
								})} type='followers' /> : <div></div>}

							</div>
							<div className='extra__following'>
								<Link to={`/following/${user.login}/${user.following}`} className='extra__title'>Following: <span className='extra__number'>{user.following}</span></Link>
								{following ? <PreviewInterface items={following.slice(0, 5).map(item => {
									return {
										avatar: item.avatar_url,
										title: item.login
									}
								})} type='following' /> : <div></div>}
							</div>
						</div>
						<Error error={error} />
					</div>
					<ul className='main__info'>
						<div className='main__header'>
							<li className='main__name'>{user.name ?? ''}</li>
							<li className='main__subname'><span className='main__login'>{user.login}</span><span className='main__id'>{'#' + user.id}</span></li>
						</div>
						<div className='main__footer'>
							<h3 className='main__title'>Profile information</h3>
							<li className='main__location main__item'><span className='main__question'>Location: </span><span className='main__answer'>{user.location ? user.location : ''}</span></li>
							<li className='main__company main__item'><span className='main__question'>Company: </span><span className='main__answer'>{user.company ? user.company : ''}</span></li>
							<li className='main__twitter main__item'><span className='main__question'>Twitter username: </span><span className='main__answer'>{user.twitter_username ? user.twitter_username : ''}</span></li>
							<li className='main__blog main__item'><span className='main__question'>Blog: </span>{blog}</li>
							<li className='main__hireable main__item'><span className='main__question'>Hireable: </span><span className='main__answer'>{user.hireable ? user.hireable : ''}</span></li>
							<li className='main__bio main__item'><span className='main__question'>Bio: </span><span className='main__answer'>{user.bio ? user.bio : ''}</span></li>
							<li className='main__registration-date main__item'><span className='main__question'>Registration date: </span><span className='main__answer'>{new Date(user.created_at).toLocaleString()}</span></li>
							<li className='main__last-update main__item'><span className='main__question'>Last update: </span><span className='main__answer'>{new Date(user.updated_at).toLocaleString()}</span></li>
						</div>
						<div className='main__repos'>
							<a href={`https://github.com/${user.login}?tab=repositories`} target='_blank' className='main__repos-title'>Public repositories: <span className='main__number'>{user.public_repos}</span></a>
							{repositories ?
								< PreviewRepos items={repositories.slice(0, 6).map(item => {
									return {
										title: item.name,
										description: item.description,
										url: item.html_url,
										language: item.language,
										updated: item.updated_at.toLocaleString()
									}
								})} />
								: <div></div>}
						</div>
					</ul>
				</div>
			</div>
		)
	} else if (error) {
		return <div className='not-found'><Error error={error} /></div>
	} else {
		return <div className='not-found'>User not found</div >
	}
}

export default ProfilePage