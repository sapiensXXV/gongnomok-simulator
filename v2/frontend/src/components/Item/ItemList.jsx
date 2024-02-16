import SingleItem from "./SingleItem";



export default function ItemList({ itemList }) {

  return (
    <>
      <section className="bg-light rounded py-2 px-1">
        <h2 className="item-list-title text-center">아이템 목록</h2>
        <section className="col-md-12 bg-light rounded item-list-container px-2 py-2">
          <div className="row row-cols-xs-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-5 row-cols-xl-6 g-3">

            {
              itemList.map((item) => {
                return (
                  <div key={item.itemId} className="col d-flex justify-content-center" >
                    <SingleItem key={`item${item.itemId}`} id={item.itemId} name={item.name} />
                  </div>
                )
              })
            }
          </div>
        </section>
      </section>
    </>
  )
}