import React from 'react';
import styles from './Comment.module.css';

export default function Comment({ id, userName, text, deletePossibility, deleteComment, ...props }) {
  return (
    <div {...props}>
        <div className={styles.userNameContainer}>
          <div className={styles.userName}>{userName}</div>
          {deletePossibility &&
            <img
              className={styles.deleteCross}
              src='/img/comment/closeCross.svg'
              alt=''
              onClick={() => deleteComment(id)}
            />}
        </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}