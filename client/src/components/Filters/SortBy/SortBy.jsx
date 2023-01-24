import style from "./SortBy.module.css";
import { sort } from "../../../redux/action";
import { useDispatch } from "react-redux";

function SortBy({ setCurrentPage }) {
  const dispatch = useDispatch();

  const handlechange = (e) => {
    e.preventDefault();
    dispatch(sort(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <select className={style.select} onChange={handlechange}>
        <option className={style.option} value="All">
          {" "}
          All{" "}
        </option>
        <option className={style.option} value="ASC">
          {" "}
          A-Z
        </option>
        <option className={style.option} value="DESC">
          Z-A
        </option>
        <option className={style.option} value="RatingAsc">
          Rating Asc
        </option>
        <option className={style.option} value="RatingDesc">
          Rating Desc
        </option>
      </select>
    </div>
  );
}

export default SortBy;
