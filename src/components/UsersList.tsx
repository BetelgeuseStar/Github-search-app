import { IUser, IUserPreview } from '../models/models'
import Icon from './Icon'
import { useActions } from '../hooks/useActions'
import { useAppSelector } from '../hooks/useAppSelector'
import { Link } from 'react-router-dom'

interface UsersListProps {
	usersList: IUser[] | IUserPreview[]
}
function UsersList({ usersList }: UsersListProps) {
	const { addFavourite, removeFavourite } = useActions()
	const { favourites } = useAppSelector(state => state.github)

	function likeHandler(userPreview: IUserPreview) {
		if (favourites.find(user => user.login === userPreview.login)) {
			removeFavourite(userPreview)
		} else {
			addFavourite(userPreview)
		}
	}

	return (
		<ul className='users-list'>
			{usersList?.map(user => {
				const userPreview: IUserPreview = {
					login: user.login,
					id: user.id,
					html_url: user.html_url,
					avatar_url: user.avatar_url
				}
				return <li className={favourites.find(user => user.login === userPreview.login) ? 'users-list__item preview favourite' : 'users-list__item preview'} key={user.login}>
					<Link to={'/profile/' + user.login}><img className='preview__avatar' src={user.avatar_url} alt={user.login + ' avatar'} /></Link>
					<div className='preview__main'>
						<div className='preview__info'>
							<Link to={'/profile/' + user.login} className='preview__login'>{user.login}</Link>
							<span className='preview__id'>{'# ' + user.id}</span>
							<Icon onClick={() => likeHandler(userPreview)} className='preview__heart-border' type='heart-border' />
							<Icon className='preview__heart' type='heart' />
						</div>
						<div className='preview__interface'>
							<Link className='preview__btn btn' to={'/profile/' + user.login}>User profile</Link>
							<a className='preview__btn btn' href={user.html_url} target='_blank'>Github profile</a>
						</div>
					</div>
				</li>
			})}
		</ul>
	)
}

export default UsersList