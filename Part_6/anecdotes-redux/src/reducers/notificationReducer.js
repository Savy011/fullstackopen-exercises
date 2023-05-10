import { createSlice } from "@reduxjs/toolkit"

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
export default notifSlice.reducer