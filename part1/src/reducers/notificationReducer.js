import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationText(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotificationText, clearNotification } = notificationSlice.actions

// Estos som os 'action creator':

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch(setNotificationText(message))

    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
