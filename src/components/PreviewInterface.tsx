import { Link } from 'react-router-dom'

interface PreviewInterfaceProps {
	items: {
		avatar: string,
		title: string
	}[],
	type: string
}
function PreviewInterface({ items, type }: PreviewInterfaceProps) {
	return (
		<div className={'preview-interface preview-interface_' + type}>
			{items.map(item => {
				return (
					<Link to={'/profile/' + item.title} key={item.title} className='preview-interface__item'>
						<img className='preview-interface__avatar' src={item.avatar} alt="avatar" />
						<h3 className='preview-interface__title'>{item.title}</h3>
					</Link>
				)
			})}
		</div>
	)
}

export default PreviewInterface