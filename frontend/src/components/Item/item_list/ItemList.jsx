import SingleItem from "./SingleItem.jsx";

export default function ItemList({
                                   searchCondition,
                                   itemList,
                                   isItemLoaded,
                                   hasNextPage,
                                   handleMoreItemButton
                                 }) {

  return (
    <>
      <section className="bg-light rounded item-list-container px-2 py-2">
        <div className="item-list-grid">

          {
            itemList != null && itemList?.length > 0 &&
            itemList?.map((item) => {
              return (
                <SingleItem key={`item${item.itemId}`} id={item.itemId} name={item.name}/>
              )
            })
          }
        </div>

        {!isItemLoaded &&
          <div className="text-center mt-3">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }

        {
          hasNextPage &&
          <button className="btn btn-light more-item-button" onClick={(e) => handleMoreItemButton(e, searchCondition)}>
            더보기
          </button>
        }
      </section>
    </>
  )
}