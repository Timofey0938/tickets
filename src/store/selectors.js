import {createSelector} from '@reduxjs/toolkit';

export const selectColumns = state => state.columns.columns;

export const selectFilters = state => state.filters.filters;

export const selectTicket = state => state.ticket.ticket;

export const selectColumnsByFilter = createSelector(
  [selectColumns, selectFilters],
  (columns, filters) => {
    const activeFilter = filters.find(filter => filter.selected);

    if (!activeFilter) {
      return columns;
    }

    if (activeFilter.text === 'Комментарий') {
      let filteredColumns = {};

      for (let key in columns) {
        let tickets = columns[key].tasks.filter(ticket => ticket.comments.length > 0);
        filteredColumns[key] = {...columns[key], tasks: tickets};
      }
      return filteredColumns;
    }

    if (activeFilter.text === 'Описание') {
      let filteredColumns = {};

      for (let key in columns) {
        let tickets = columns[key].tasks.filter(ticket => ticket.description !== '');
        filteredColumns[key] = {...columns[key], tasks: tickets};
      }
      return filteredColumns;
    }

    if (activeFilter.text === 'Тег') {
      let filteredColumns = {};

      for (let key in columns) {
        let tickets = columns[key].tasks.filter(ticket => ticket.tags.length > 0);
        filteredColumns[key] = {...columns[key], tasks: tickets};
      }
      return filteredColumns;
    }
  }
);