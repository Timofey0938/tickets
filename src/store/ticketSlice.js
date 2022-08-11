import {createSlice} from '@reduxjs/toolkit';

const initialState = {}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTicket(state, action) {
      state.ticket = action.payload;
    },
    editTicket(state, action) {}
  }
});

export const {setTicket, editTicket} = ticketSlice.actions;
export default ticketSlice.reducer;