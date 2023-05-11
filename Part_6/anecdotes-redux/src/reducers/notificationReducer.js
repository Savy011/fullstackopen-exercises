import { createSlice } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

const notifSlice = createSlice({
    name: 'notif',
    initialState: '',
    reducers: {
        notifChange(state, action) {
            return action.payload
        }
    }
})

export const { notifChange } = notifSlice.actions

export const setNotif = (notifMessage, time) => {
    return async dispatch => {
        await dispatch(notifChange(notifMessage))
        setTimeout(() => {
            dispatch(notifChange(''))
        }, time)
    }
}

export default notifSlice.reducer