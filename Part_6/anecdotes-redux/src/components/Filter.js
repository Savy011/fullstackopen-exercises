import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const filterHandler = event => {
        event.preventDefault()
        const filter = event.target.value
        dispatch(filterChange(filter))
    }

    return (
        <div>
            Filter:
            &nbsp;
            <input name='filter' onChange={filterHandler}/>
        </div>
    )
}

export default Filter