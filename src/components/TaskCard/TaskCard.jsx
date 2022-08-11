import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setTicket} from '../../store/ticketSlice';
import styles from './TaskCard.module.css';
import Tag from '../Tag/Tag';
import classNames from 'classnames';

export default function TaskCard({id, title, tags, comments, description, ...props}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function openTicketPage(e) {
    e.stopPropagation();
    dispatch(setTicket({id, title, tags, comments, description}));
    navigate(`/full/:${id}`);
  }

  return (
    <div
      className={styles.card}
      {...props}
      onClick={() => {
        dispatch(setTicket({id, title, tags, comments, description}));
        navigate(`/edit/:${id}`);
      }}
    >
      <div className={styles.upRow}>
        <div className={styles.title}>{title}</div>
        <div className={styles.more} onClick={e => openTicketPage(e)}>
          <img src='/img/more.svg' alt=''/>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.tagContainer}>
          {
            tags.map((tag, index) => (
              <Tag
                size='small'
                color={tag}
                style={{
                  marginRight: 6,
                  marginTop: index > 3 ? 6 : 0
                }}
                key={tag}
              />
            ))
          }
        </div>
        <div className={styles.notesContainer}>
          {comments.length > 0 &&
            <img
              className={styles.noteImage}
              src='/img/taskCard/comment.svg'
              alt=''/>}
          {description !== '' &&
            <img
              className={classNames(styles.noteImage, styles.descriptionImage)}
              src='/img/taskCard/description.svg'
              alt=''
            />}
        </div>
      </div>
    </div>
  );
}