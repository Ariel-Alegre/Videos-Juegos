import style from './GameCard.module.css';
import { Link } from 'react-router-dom';
import { AiTwotoneStar } from 'react-icons/ai';


function GameCard({games}) {
    return (
        <div className={style.containerGameCard}>
            <Link 
            className={style.link}
            to = {'/details/' + games.id}>
            <li key={games.id}>
                <img 
                src={games.image} 
                alt={games.image} 
                className = {style.img}
                />
                <p className={style.title}>
                    <strong>{games.name}</strong>
                      </p> 
                    
                <p className={style.genresContainer}> 
                    <strong className={style.genres}>{games.genres.map(n => n.name).toString().replace(/,/g, " && ")}</strong> 
                    </p>
                    <div className={style.ratingBackground}>
                <div className={style.iconContainer}>
                <p> Rating: {games.rating}
                   
                    </p>       
                    <AiTwotoneStar className={style.icon}/>  
                    </div>  
                    </div>
                </li>
            </Link>
        </div>
    )
    
};

export default GameCard;