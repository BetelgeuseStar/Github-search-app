
interface PreviewReposProps {
	items: {
		title: string,
		description: string,
		url: string,
		language: string,
		updated: string
	}[]
}

function PreviewRepos({ items }: PreviewReposProps) {
	return (
		<div className='repos'>
			{items.map(item => {
				return (
					<a href={item.url} target='_blank' key={item.title} className='repos__item'>
						<h3 className='repos__title'>{item.title}</h3>
						<p className='repos__description'>{item.description}</p>
						<div className='repos__footer'>
							<span className='repos__language'>{item.language}</span>
							<span className='repos__updated'>upd: {new Date(item.updated).toLocaleString()}</span>
						</div>
					</a>
				)
			})}
		</div>
	)
}

export default PreviewRepos