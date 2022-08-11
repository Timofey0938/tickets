import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  filters: [
    { id: 0, text: 'Комментарий', selected: false },
    { id: 1, text: 'Описание', selected: false },
    { id: 2, text: 'Тег', selected: false }
  ]
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters.forEach(filter => {
        if (filter.id === action.payload.filterId) {
          filter.selected = !filter.selected;
        } else {
          filter.selected = false;
        }
      })
      //
      // const toggledTicket = state.filters.find(filter => filter.id === action.payload.filterId);
      // toggledTicket.selected = !toggledTicket.selected;
    }
  }
});

export const {changeFilter} = filterSlice.actions;
export default filterSlice.reducer;