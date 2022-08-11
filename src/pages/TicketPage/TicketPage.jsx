import React, {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {useNavigate, Route, Routes} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {selectTicket} from '../../store/selectors';
import {editTicket, removeTicket} from '../../store/columnSlice';
import TitledContainer from '../../components/TitledContainer/TitledContainer';
import Input from '../../components/Input/Input';
import Comment from '../../components/Comment/Comment';
import Button from '../../components/Button/Button';
import TagContainer from '../../components/TagContainer/TagContainer';
import Modal from '../../components/Modal/Modal';
import DeleteWindow from '../../components/DeleteWindow/DeleteWindow';
import AddCommentWindow from '../../components/AddCommentWindow/AddCommentWindow';
import styles from './TicketPage.module.css';
import {setTicket} from "../../store/ticketSlice";
import TagSelector from "../../components/TagSelector/TagSelector";

export default function TicketPage() {
  const ticketData = useSelector(selectTicket)
  const [ticket, setCurrentTicket] = useState(ticketData)

  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm();

  const navigate = useNavigate();

  const [deleteWindowOpen, setDeleteWindowOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [tags, setTags] = useState(ticket.tags);

  function deleteTag(tagToDelete) {
    setTags(tags.filter(tag => tag !== tagToDelete));
  }

  const [comments, setComments] = useState(ticket.comments);

  function addComment(name, text) {
    setComments([...comments, {id: uuid(), userName: name, text}])
  }

  function deleteComment(id) {
    console.log(comments);
    console.log(id)
    setComments(comments.filter(comment => comment.id !== id));
  }

  function deleteTicket() {
    setDeleteWindowOpen(false);
    dispatch(removeTicket({id: ticket.id}));
    navigate('/');
  }

  function submitHandler(data) {
    setEditing(false);
    const newTicket = {id: ticket.id, ...data, tags, comments};
    console.log(newTicket);
    dispatch(editTicket(newTicket));
    dispatch(setTicket(newTicket));
    setCurrentTicket(newTicket);
  }

  return (
    <div className={styles.ticketPage}>
      <div className={styles.returnButton} onClick={() => navigate(-1)}>
        <img
          className={styles.returnArrowImage}
          src='/img/ticketPage/returnArrow.svg' alt=''
        />
        <p>Вернуться к задачам</p>
      </div>

      <TitledContainer
        title='Todo'
        withOptions={true}
        options={[
          {name: 'Удалить', action: () => setDeleteWindowOpen(true)},
          {name: 'Редактировать', action: () => setEditing(true)}
        ]}
        style={{
          width: 469,
          marginTop: 64
        }}
      >
        <Controller
          name="title"
          control={control}
          defaultValue={ticket.title}
          rules={{required: true}}
          render={({field}) =>
            <Input
              isMultiline={false}
              placeholder='Название'
              style={{marginBottom: 8}}
              disabled={!editing}
              {...field}
            />}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={ticket.description}
          render={({field}) =>
            <Input
              isMultiline={true}
              placeholder='Описание'
              style={{marginBottom: 14}}
              disabled={!editing}
              {...field}
            />}
        />
        <div className={styles.bottomContainer}>
          <TagContainer
            tags={tags}
            deletePossibility={editing}
            deleteTag={deleteTag}
            style={{marginBottom: 14}}
          />
          {editing &&
            <TagSelector
              selectedTags={tags}
              setSelectedTags={setTags}
              style={{marginBottom: 14}}
            />
          }
          <div className={styles.commentContainer}>
            {
              comments.map((comment, index) => (
                <Comment
                  id={comment.id}
                  userName={comment.userName}
                  text={comment.text}
                  deletePossibility={editing}
                  deleteComment={deleteComment}
                  style={{
                    marginBottom: index < ticket.comments.length - 1 ? 14 : 0
                  }}
                  key={comment.id}
                />
              ))
            }
          </div>

          {editing &&
            <div className={styles.addCommentButton}>
              <img
                className={styles.plusImage}
                src='/img/ticketPage/plus.svg' alt=''
              />
              <p
                className={styles.addCommentButtonText}
                onClick={() => navigate(`/full/:${ticket.id}/comment/create`)}
              >Добавить комментарий</p>
            </div>
          }
        </div>
        {editing &&
          <div className={styles.buttonContainer}>
            <Button
              style={{
                width: 152,
                marginBottom: '11px'
              }}
              onClick={handleSubmit(submitHandler)}
            >Сохранить</Button>
          </div>
        }
      </TitledContainer>

      {deleteWindowOpen &&
        <Modal>
          <DeleteWindow
            deleteTicket={deleteTicket}
            close={() => setDeleteWindowOpen(false)}
          />
        </Modal>
      }
      <Routes>
        <Route path='/comment/create' element={
          <Modal withCloseCross={true}>
            <AddCommentWindow addHandler={addComment}/>
          </Modal>
        }/>
      </Routes>
    </div>
  );
}