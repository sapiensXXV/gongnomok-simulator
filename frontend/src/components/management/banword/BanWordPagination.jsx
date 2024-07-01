import style from './BanWordPagination.module.css'

export default function BanWordPagination({
  currentPage,
  totalPage,
  pageClickHandler
}) {
  return (
    <>
      <section className={style.pagination}>
        <nav aria-label="banword pagination">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" aria-label="Previous" onClick={(e) => pageClickHandler(e, currentPage-1)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {
              [currentPage-2, currentPage-1].map((page) => {
                if (page >= 1) {
                  return (
                    <li key={`page_${currentPage}`} className="page-item"><a className="page-link" onClick={(e, page) => pageClickHandler(e, page)}>{page}</a></li>
                  )
                }
                return null;
              })
            }
            <li className="page-item active"><a className="page-link" onClick={(e) => pageClickHandler(e, currentPage)}>{currentPage}</a></li>
            {
              [currentPage+1, currentPage+2].map((page) => {
                if (page <= totalPage) {
                  return (
                    <li key={`page_${currentPage}`} className="page-item"><a className="page-link" onClick={(e, page) => pageClickHandler(e, page)}>{page}</a></li>
                  )
                }
                return null;
              })
            }
            <li className={`page-item ${totalPage === currentPage ? 'disabled' : ''}`}>
              <a className="page-link" aria-label="Next" onClick={(e) => pageClickHandler(e, currentPage+1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}