import React, {useState} from 'react';
import styles from './TitledContainer.module.css';
import Popup from "../Popup/Popup";

export default function TitledContainer({ title, withOptions, options, children, ...props }) {

  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div {...props} className={styles.titledContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{title}</div>
        {withOptions && popupOpen &&
        <Popup
          options={options}
          close={() => setPopupOpen(false)}
        />}
        {withOptions && !popupOpen &&
        <img
          className={styles.optionsImage}
          src='/img/more.svg'
          onClick={() => setPopupOpen(true)}
          alt=''
        />}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          { children === undefined ? 'пусто' : children }
        </div>
      </div>
    </div>
  );
}