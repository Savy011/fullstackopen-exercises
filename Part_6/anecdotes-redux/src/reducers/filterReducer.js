import { createSlice } from "@reduxjs/toolkit"

/*export const filterChange = filter => {
    return {
        type: 'FILTER_CHANGE',
        payload: filter
    }
} 

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER_CHANGE':
            return action.payload
        default:
            return state
    }
}*/

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})

export const { filterChange } = filterSlice.actions  
export default filterSlice.reducer