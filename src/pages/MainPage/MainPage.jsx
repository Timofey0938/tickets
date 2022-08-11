import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectColumnsByFilter} from '../../store/selectors';
import FilterContainer from "../../components/FilterContainer/FilterContainer";
import ColumnContainer from "../../components/ColumnContainer/ColumnContainer";
import Modal from '../../components/Modal/Modal';
import CreateTicketWindow from '../../components/CreateTicketWindow/CreateTicketWindow';
import EditTicketWindow from '../../components/EditTicketWindow/EditTicketWindow';
import styles from './MainPage.module.css';

export default function MainPage() {

  const columns = useSelector(selectColumnsByFilter);

  return (
    <div className={styles.mainPage}>
      <FilterContainer style={{marginBottom: 79}}/>
      <ColumnContainer columns={columns}/>

      <Routes>
        <Route path='/create/:columnId' element={
          <Modal withCloseCross={true}>
            <CreateTicketWindow/>
          </Modal>
        }/>
        <Route path='/edit/:ticketId' element={
          <Modal withCloseCross={true}>
            <EditTicketWindow columns={columns}/>
          </Modal>
        }/>
      </Routes>
    </div>
  );
}