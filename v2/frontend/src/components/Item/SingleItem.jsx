import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SingleItem({ id, name }) {

  useEffect(() => {
    console.log(`imagePath=/images/item/${id}.png'}`)
  })

  return (
    <>

          <div className="item-list-button">
            <a href={`/item/${id}`} className="link-underline link-underline-opacity-0">
              <button>
                <img src={`/images/item/${id}.png`}></img>
                <span>{name}</span>
              </button>
            </a>
          </div>

    </>
  );
} 