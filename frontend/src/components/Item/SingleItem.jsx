export default function SingleItem({ id, name }) {

  return (
    <>

      <div className="item-list-button text-center">
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