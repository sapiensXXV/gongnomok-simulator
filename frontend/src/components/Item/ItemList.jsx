import { forwardRef, useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import ItemRanking from "./ItemRanking";



export default function ItemList({
  itemList,
  isItemLoaded,
  hasNextPage,
  handleMoreItemButton
}) {

  return (
    <>
      <ItemRanking/>
      <section className="bg-light rounded py-2 px-1">
        <h2 className="item-list-title text-center">아이템 목록</h2>
        <section className="col-md-12 bg-light rounded item-list-container px-2 py-2">
          <div className="row row-cols-xs-3 row-cols-sm-4 row-cols-md-6 row-cols-lg-auto row-cols-xl-7 g-3 d-flex justify-content-start">

            {
              itemList != null && itemList?.length > 0 &&
              itemList?.map((item) => {
                return (
                  <div key={item.itemId} className="col d-flex justify-content-start" >
                    <SingleItem key={`item${item.itemId}`} id={item.itemId} name={item.name} />
                  </div>
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
            <button className="btn btn-light more-item-button" onClick={(e) => handleMoreItemButton(e)}>
              더보기
            </button>
          }
        </section>
      </section>
    </>
  )
}