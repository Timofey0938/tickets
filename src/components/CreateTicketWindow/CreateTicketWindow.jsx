import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {addTicket} from '../../store/columnSlice';
import TitledContainer from '../TitledContainer/TitledContainer';
import Input from '../Input/Input';
import TagSelector from '../TagSelector/TagSelector';
import Button from '../Button/Button';

export default function CreateTicketWindow() {

  const {control, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const columnId = params.columnId.slice(1)

  const [tags, setTags] = useState([]);

  function submitHandler(data) {
    console.log(data);
    dispatch(addTicket({columnId, ticket: {...data, tags}}));
    navigate(-1);
  }

  return (
    <TitledContainer
      title='Создать тикет'
      style={{
        width: 340,
        margin: '0 84px 64px 84px'
      }}>
      <Controller
        name="title"
        control={control}
        defaultValue=''
        rules={{required: true}}
        render={({field}) =>
          <Input
            isMultiline={false}
            placeholder='Название'
            style={{marginBottom: 8}}
            {...field}
          />
        }
      />
      <Controller
        name="description"
        control={control}
        defaultValue=''
        render={({field}) =>
          <Input
            isMultiline={true}
            placeholder='Описание'
            style={{marginBottom: 14}}
            {...field}
          />
        }
      />
      <TagSelector
        style={{marginBottom: 14}}
        selectedTags={tags}
        setSelectedTags={setTags}
      />
      <Button onClick={handleSubmit(submitHandler)}>Сохранить</Button>
    </TitledContainer>
  );
}