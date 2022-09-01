import { useState, Dispatch, SetStateAction, useEffect } from 'react'
interface PagePaginationProps {
	numberOfPages: number,
	setPage: Dispatch<SetStateAction<number>>,
	search?: string
}

function PagePagination({ numberOfPages, setPage, search }: PagePaginationProps) {
	const [currentPage, setCurrentPage] = useState(1)
	const [paginationInterface, setPaginationInterface] = useState([1, 2, 3, 4, numberOfPages])
	const [paginationClasses, setPaginationClasses] = useState(['selected', 'unselected', 'unselected', 'unselected', 'unselected'])

	useEffect(() => {
		changePageHandler(1)
	}, [search])

	function changePageHandler(selectedPage: number) {
		if (selectedPage === 0 || selectedPage > numberOfPages || selectedPage === currentPage) return
		setCurrentPage(selectedPage)
		setPage(selectedPage)
		if (numberOfPages <= 5) {
			setPaginationInterface([1, 2, 3, 4, 5])
			let arr = ['unselected', 'unselected', 'unselected', 'unselected', 'unselected']
			arr[selectedPage - 1] = 'selected'
			setPaginationClasses(arr)
		} else {
			switch (selectedPage) {
				case 1:
					setPaginationInterface([1, 2, 3, 4, numberOfPages])
					setPaginationClasses(['selected', 'unselected', 'unselected', 'unselected', 'unselected'])
					break
				case 2:
					setPaginationInterface([1, 2, 3, 4, numberOfPages])
					setPaginationClasses(['unselected', 'selected', 'unselected', 'unselected', 'unselected'])
					break
				case numberOfPages:
					setPaginationInterface([1, selectedPage - 3, selectedPage - 2, selectedPage - 1, selectedPage])
					setPaginationClasses(['unselected', 'unselected', 'unselected', 'unselected', 'selected'])
					break
				case numberOfPages - 1:
					setPaginationInterface([1, selectedPage - 2, selectedPage - 1, selectedPage, selectedPage + 1])
					setPaginationClasses(['unselected', 'unselected', 'unselected', 'selected', 'unselected'])
					break
				default:
					setPaginationInterface([1, selectedPage - 1, selectedPage, selectedPage + 1, numberOfPages])
					setPaginationClasses(['unselected', 'unselected', 'selected', 'unselected', 'unselected'])
			}
		}
	}
	if (numberOfPages >= 2) {
		return (
			<div className='page-pagination'>
				<ul className="page-pagination__list">
					<li onClick={() => changePageHandler(currentPage - 1)} className="page-pagination__item page-pagination__item_prev-arrow">{'<'}</li>
					{paginationInterface[0] > 0 && <li onClick={() => changePageHandler(paginationInterface[0])} className={"page-pagination__item page-pagination__item_" + paginationClasses[0]}>{paginationInterface[0]}</li>}
					{currentPage > 3 && numberOfPages > 5 && <li className="page-pagination__item">...</li>}
					{paginationInterface[1] > 0 && numberOfPages > 1 && <li onClick={() => changePageHandler(paginationInterface[1])} className={"page-pagination__item page-pagination__item_" + paginationClasses[1]}>{paginationInterface[1]}</li>}
					{paginationInterface[2] > 0 && numberOfPages > 2 && <li onClick={() => changePageHandler(paginationInterface[2])} className={"page-pagination__item page-pagination__item_" + paginationClasses[2]}>{paginationInterface[2]}</li>}
					{paginationInterface[3] > 0 && numberOfPages > 3 && <li onClick={() => changePageHandler(paginationInterface[3])} className={"page-pagination__item page-pagination__item_" + paginationClasses[3]}>{paginationInterface[3]}</li>}
					{numberOfPages - currentPage > 2 && numberOfPages > 5 && <li className="page-pagination__item">...</li>}
					{paginationInterface[4] > 0 && numberOfPages > 4 && <li onClick={() => changePageHandler(paginationInterface[4])} className={"page-pagination__item page-pagination__item_" + paginationClasses[4]}>{paginationInterface[4]}</li>}
					<li onClick={() => changePageHandler(currentPage + 1)} className="page-pagination__item page-pagination__item_next-arrow">{'>'}</li>
				</ul>
			</div >
		)
	} else {
		return <div></div>
	}

}

export default PagePagination