
interface ErrorProps {
	error: any
}

function Error({ error }: ErrorProps) {
	let errorMessage: string = ''
	if (error && 'status' in error) {
		if (error.status === 403) {
			errorMessage = 'API rate limit exceeded, resetting the limit takes 1 hour'
		} else {
			errorMessage = 'Something went wrong'
		}
	}
	if (error) {
		return <p className='error'>{'Error: ' + errorMessage}</p>
	} else {
		return <></>
	}

}

export default Error