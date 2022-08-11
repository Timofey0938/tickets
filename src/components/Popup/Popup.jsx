import React from 'react';
import styles from './Popup.module.css';

export default function Popup({ options, close }) {

  return (
    <div className={styles.popup}>
      <ul>
        {options.map(option => (
          <li onClick={e => {
              option.action();
              close();
            }}
            key={option.name}>
            <p>{option.name}</p>
          </li>
        ))}
      </ul>
      <img
        className={styles.popupCloseCross}
        src='/img/popup/popupCloseCross.svg'
        alt=''
        onClick={close}
      />
    </div>
  )
}