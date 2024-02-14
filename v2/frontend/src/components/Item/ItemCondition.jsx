import searchIcon from '../../assets/search-icon.png';

export default function ItemCondition() {
  return (
    <>

      <form>
        {/* <div className="input-group rounded">
          <div className='d-flex'>
            <input type="search" className="form-control rounded flex-grow-1 w-100" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button className='btn flex-shrink-1 w-10'>
              <img src={searchIcon} />
            </button>
          </div>
        </div> */}
        <div className="d-flex bd-highlight">
          <div className="p-2 flex-grow-1 bd-highlight">
            <input
              className='form-control form-control-sm'
              placeholder='아이템 이름'
            />
          </div>
          <div className="p-2 bd-highlight">
            <button
              className='btn btn-primary btn-sm'
            >
              검색
            </button>
          </div>
        </div>
      </form>

    </>
  )
}