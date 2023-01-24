import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gameDetails, clean } from "../../redux/action/index";
import { AiTwotoneStar } from "react-icons/ai";
import style from "./DetailsGame.module.css";
import { AiFillHome } from "react-icons/ai";

function DetailGame() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.gameDetail);

  useEffect(() => {
    dispatch(gameDetails(id));
    dispatch(clean());
  }, [dispatch, id]);

  return (
    <div>
      <div className={style.btnContainer}>
        <Link to="/home">
          <button className={style.btn}>
            <AiFillHome />
          </button>
        </Link>
      </div>
      <div className={style.detailsContainer}>
        <div>
          <img className={style.img} src={detail.image} alt={detail.image} />
        </div>
        <div className={style.description}>
          <div className={style.nameGame}>
            <strong>{detail.name}</strong>
          </div>
          <div className={style.released}>{detail.released}</div>
          <div className={style.ratingContainer}>
            <strong> {detail.rating} </strong>
            <div className={style.iconContainer}>
              <AiTwotoneStar className={style.icon} />
            </div>
            <div className={style.rating}>
              <p>Rating</p>
            </div>
          </div>
          <div className={style.infoContainer}>
            <div>
              <p className={style.genres}>
                {detail.genres &&
                  detail.genres
                    .map((s) => s.name)
                    .toString()
                    .replace(/,/g, " && ")}
              </p>
            </div>
            <div>
              <p className={style.platforms}>
                {detail.platforms &&
                  detail.platforms?.toString().replace(/,/g, " && ")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.descriptionContainer}>
        <p className={style.description}>{detail.description}</p>
      </div>
    </div>
  );
}

export default DetailGame;
