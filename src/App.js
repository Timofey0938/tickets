import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TicketPage from './pages/TicketPage/TicketPage';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path='/*' element={<MainPage/>}/>
        <Route path='/full/:ticketId/*' element={<TicketPage/>}/>
        <Route path='*' element={<MainPage/>}/>
      </Routes>
    </div>
  );
}