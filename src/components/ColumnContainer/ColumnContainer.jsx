import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {useDispatch} from 'react-redux';
import {moveTicket} from '../../store/columnSlice';
import Column from "../Column/Column";
import styles from './ColumnContainer.module.css';

export default function ColumnContainer({columns}) {

  const dispatch = useDispatch();

  function onDragEnd(result) {
    const {source, destination} = result;

    if (!destination) {
      return;
    }

    dispatch(moveTicket({source, destination}));
  }

  return (
    <div className={styles.columnContainer}>
      <DragDropContext onDragEnd={result => onDragEnd(result)}>
        {
          Object.entries(columns).map(([id, column], index) => (
            <Column
              id={id}
              title={column.title}
              tasks={column.tasks}
              buttonContent={column.buttonContent}
              style={{marginRight: index < columns.length - 1 ? 12 : 0}}
              key={id}
            />
          ))
        }
      </DragDropContext>
    </div>
  );
}