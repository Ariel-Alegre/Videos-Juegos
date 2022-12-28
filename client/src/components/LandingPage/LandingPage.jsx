import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';


function LandingPage() {
    return (
       
        <div className={style.container}>
            <h1 className={style.title}>Video Games!</h1>
        <div className={style.btnContainer}>
           
            <Link to = '/home'>
            <button className={style.btn}>Home</button>
            </Link>
        </div>
    </div>
    )
};

export default LandingPage;