import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectFilters} from '../../store/selectors';
import {changeFilter} from '../../store/filterSlice';
import Checkbox from '../Checkbox/Checkbox';
import styles from './FilterContainer.module.css';

export default function FilterContainer(props) {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  return (
    <div className={styles.checkboxContainer} {...props}>
      {
        filters.map(filter => (
          <Checkbox
            text={filter.text}
            checked={filter.selected}
            style={{marginRight: 28}}
            key={filter.id}
            onClick={() => dispatch(changeFilter({filterId: filter.id}))}
          />
        ))
      }
    </div>
  );
}