import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';

export default function Input({isMultiline = false, placeholder = '', ...props}) {

  if (isMultiline) {
    return <textarea
      className={classNames(styles.input, styles.textArea)}
      placeholder={placeholder}
      {...props}
    />;
  } else {
    return <input
      className={classNames(styles.input, styles.regularInput)}
      placeholder={placeholder}
      {...props}
    />;
  }
}