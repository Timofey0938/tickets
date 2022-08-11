import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {selectTicket} from '../../store/selectors';
import {editTicket} from '../../store/columnSlice';
import TitledContainer from '../TitledContainer/TitledContainer';
import Input from '../Input/Input';
import TagSelector from '../TagSelector/TagSelector';
import Button from '../Button/Button';
import TagContainer from "../TagContainer/TagContainer";

export default function EditTicketWindow() {

  const {control, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let ticket = useSelector(selectTicket);

  const [tags, setTags] = useState(ticket.tags);

  function deleteTag(tagToDelete) {
    setTags(tags.filter(tag => tag !== tagToDelete));
  }

  function submitHandler(data) {
    dispatch(editTicket({id: ticket.id, ...data, tags, comments: ticket.comments}));
    navigate(-1);
  }

  return (
    <TitledContainer
      title='Редактировать'
      style={{
        width: 340,
        margin: '0 84px 64px 84px'
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
            {...field}
          />}
      />
      <TagContainer
        tags={tags}
        deletePossibility={true}
        deleteTag={deleteTag}
        style={{marginBottom: 14}}
      />
      <TagSelector
        selectedTags={tags}
        setSelectedTags={setTags}
        style={{marginBottom: 14}}
      />
      <Button onClick={handleSubmit(submitHandler)}>Сохранить</Button>
    </TitledContainer>
  );
}