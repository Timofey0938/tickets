import React from 'react';
import styles from './Checkbox.module.css';

export default function Checkbox({ text, checked, ...props }) {
    return (
        <div className={styles.checkbox} {...props}>
            {
              checked ? <img src='/img/checkBox/checkedBox.svg' alt=''/>
                : <img src='/img/checkBox/box.svg' alt=''/>
            }
            <div className={styles.text}>{text}</div>
        </div>
    );
}