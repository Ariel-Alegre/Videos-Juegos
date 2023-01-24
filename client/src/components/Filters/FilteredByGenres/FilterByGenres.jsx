import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allGenres, FiltersByGenres } from "../../../redux/action/index";
import style from "./FilterByGenres.module.css";

function FilterByGenres({ setCurrentPage }) {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(allGenres());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(FiltersByGenres(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={style.containerSelect}>
      <select className={style.select} onChange={handleChange}>
        <option className={style.option} value="All">
          Genres
        </option>
        {genres.map((genre) => (
          <option className={style.option} key={genre.id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterByGenres;
