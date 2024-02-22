import { forwardRef, useEffect, useState } from "react";
import SingleItem from "./SingleItem";



export default function ItemList({ 
  itemList, 
  isItemLoaded,
  loadingHandler,
  hasNextPage
}) {

  const loadingOption = {
    root: null,
    rootMargin: '0px',
    thresgold: 1.0
  };

  return (
    <>
      
      <section className="bg-light rounded py-2 px-1">
        <h2 className="item-list-title text-center">아이템 목록</h2>
        <section className="col-md-12 bg-light rounded item-list-container px-2 py-2">
          <div className="row row-cols-xs-3 row-cols-sm-4 row-cols-md-6 row-cols-lg-auto row-cols-xl-6 g-3 d-flex justify-content-start">

            {
              itemList.map((item) => {
                return (
                  <div key={item.itemId} className="col d-flex justify-content-start" >
                    <SingleItem key={`item${item.itemId}`} id={item.itemId} name={item.name} />
                  </div>
                )
              })
            }
          </div>
          {
            hasNextPage && 
              <button className="btn btn-light more-item-button">
                더보기
              </button>
          }
        </section>

        { !isItemLoaded &&
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        } 

        

        
      </section>
    </>
  )
}