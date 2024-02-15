import SingleItem from "./SingleItem";



export default function ItemList({ itemList }) {

  return (
    <>
      <h2 className="item-list-title text-center">아이템 목록</h2>
      <div className="row row-cols-1 row-cols-md-5 row-cols-lg-6 g-3">

        {
          itemList.map((item) => {
            return (
              <div key={item.itemId} className="col">
                <SingleItem key={`item${item.itemId}`} id={item.itemId} name={item.name} />
              </div>
            )
          })
        }
      </div>

    </>
  )
}