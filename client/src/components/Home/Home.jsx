import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { allVideosgame } from "../../redux/action/index";
import GameCard from "../GameCard/GameCard";
import Search from "../Search/Search";
import SortBy from "../Filters/SortBy/SortBy";
import style from "./Home.module.css";
import FilterByGenres from "../Filters/FilteredByGenres/FilterByGenres";
import FilterOrder from "../Filters/FilterOrder/FilterOrder";
import { Link } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import Pagination from "../Pagination/Pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.allVideosGames);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(allVideosgame());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerpage = 8;
  const indexOflastGame = currentPage * gamesPerpage;
  const indexOfirstGame = indexOflastGame - gamesPerpage;
  const currentGames = allGames.slice(indexOfirstGame, indexOflastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(allGames);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShow((show) => !show);

    if (loading) {
      setTimeout(() => {
        setLoading(false);
      });
    }
  }, [loading]);

  return (
    <div className={style.container}>
      <Link className={style.containerBtn} to="/">
        <button className={style.btnExit}>
          <MdExitToApp />
        </button>
      </Link>
      <div className={style.navBar}>
        <div className={style.search}>
          <Search />
        </div>
      </div>
        <div className={style.boxContainer}>
          <Link className={style.btnCreate} to="/creategame">
            <button type="click" className={style.btn}>
              Create Game!
            </button>
          </Link>
          <div className={style.orderSelect}>
            <FilterByGenres setCurrentPage={setCurrentPage} />
            <SortBy setCurrentPage={setCurrentPage} />
            <FilterOrder />
          </div>
        </div>
      <ul className={style.orderList}>
        {currentGames === 0 && !show ? (
          <div></div>
        ) : currentGames.length > 0 ? (
          currentGames &&
          currentGames?.map((games) => (
            <GameCard key={games.id} games={games} />
          ))
        ) : (
          <h1 className={style.orderLoading}>
            <AiOutlineLoading3Quarters
              setLoading={setLoading}
              className={style.loading}
            />
          </h1>
        )}
      </ul>
      <div className={style.pagination}>
        <Pagination
          gamesPerpage={gamesPerpage}
          allGames={allGames.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}

export default Home;
