import ItemCondition from "./ItemCondition";
import ItemList from "./ItemList";

export default function ItemMain() {
  return (
    <>
      <section className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <section className="col-md-12 bg-success">
              <ItemCondition />
            </section>
          </div>


          <div className="col-md-8">
            <section className="col-md-12 bg-primary">
              <ItemList />
            </section>
          </div>


        </div>
      </section>

    </>
  )
}