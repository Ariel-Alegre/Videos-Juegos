import { VscSearch } from 'react-icons/vsc';
import style from './Search.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getName } from '../../redux/action';

function Search() {
const dispatch = useDispatch();
const [search, setSearch] = useState("");


const handleSubmit = (e) => {
    e.preventDefault();
    if(search.length > 0) {
     dispatch(getName(search))
    } 
   
};

const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
}





    return (
        <div className={style.containerSearch}>
        <div className={style.searchContainer}>
            <form onSubmit={handleSubmit}>
            <input 
            value={search}
            onChange={handleChange}
            className={style.input}
            type="text"
            placeholder='Search game..'
           
            />
            <button className={style.btnContainer} >
                <VscSearch className={style.btn}/>
            </button>
            </form>
        </div>
        </div>
    )
    
}

export default Search;
