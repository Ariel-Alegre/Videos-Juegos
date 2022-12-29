import style from './FilterOrder.module.css';
import { useDispatch } from 'react-redux';
import { filterOrder, allVideosgame } from '../../../redux/action'


function FilterOrder() {
    const dispatch = useDispatch();
   

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.value === '') {
            dispatch(allVideosgame())
        } else {
            dispatch(filterOrder(e.target.value))   
        }      
    }

    return (<div>
        <select className = {style.select} onChange = {(e) => handleChange(e)}>
        <option className = {style.option} value='all'>Filter By Origin</option>
        <option className = {style.option} value="api">API</option>
        <option className = {style.option} value="created">Created</option>
    </select>

</div>
    )
}

export default FilterOrder;