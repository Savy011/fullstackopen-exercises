export const filterChange = filter => {
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
}

export default filterReducer