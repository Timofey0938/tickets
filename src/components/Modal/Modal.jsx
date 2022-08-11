import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ReactDOM from 'react-dom';
import classNames from "classnames";
import styles from './Modal.module.css';

export default function Modal({ children, withCloseCross }) {
  const containerElement = useMemo(
    () => document.getElementById('modal-container'),
    []
  );

  const navigate = useNavigate();

  function close() {
    navigate(-1);
  }

  return ReactDOM.createPortal(
      <div
        className={classNames(styles.modalBackground, styles.modalBackgroundActive)}
        onClick={close}
      >
        <div
          className={classNames(styles.modalWindow, styles.modalWindowActive)}
          onClick={e => e.stopPropagation()}
        >
          {withCloseCross && <div className={styles.closeContainer}>
            <img
              className={styles.closeCrossImage}
              src='/img/modal/closeCross.svg'
              alt=''
              onClick={close}
            />
          </div>}
          { children }
        </div>
      </div>,
    containerElement
  );
}