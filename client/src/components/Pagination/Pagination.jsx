import style from "./Pagination.module.css";

function Pagination({ gamesPerpage, allGames, paginado }) {
  const pageNumber = [];
  for (let i = 1; i < Math.ceil(allGames / gamesPerpage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <div className={style.boxContainer}>
        {pageNumber &&
          pageNumber.map((number) => (
            <span key={number}>
              <button className={style.btn} onClick={() => paginado(number)}>
                {number}
              </button>
            </span>
          ))}
      </div>
    </nav>
  );
}

export default Pagination;
