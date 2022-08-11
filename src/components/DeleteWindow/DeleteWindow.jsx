import React from 'react';
import styles from './DeleteWindow.module.css';

export default function DeleteWindow({ deleteTicket, close }) {
  return (
    <div className={styles.deleteWindow}>
      <div className={styles.title}>Удалить тикет?</div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={deleteTicket}
        >Да</button>
        <button
          className={styles.button}
          onClick={close}
        >Нет</button>
      </div>
    </div>
  );
}