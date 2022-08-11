import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import TitledContainer from '../TitledContainer/TitledContainer';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default function AddCommentWindow({addHandler}) {

  const {control, handleSubmit} = useForm();
  const navigate = useNavigate();

  function submitHandler(data) {
    addHandler(data.name, data.text);
    navigate(-1);
  }

  return (
    <TitledContainer
      title='Добавить комментарий'
      style={{
        width: 340,
        margin: '0 84px 64px 84px'
      }}>
      <Controller
        name="name"
        control={control}
        defaultValue=''
        rules={{required: true}}
        render={({field}) =>
          <Input
            isMultiline={false}
            placeholder='Имя'
            style={{marginBottom: 8}}
            {...field}
          />}
      />
      <Controller
        name="text"
        control={control}
        defaultValue=''
        rules={{required: true}}
        render={({field}) =>
          <Input
            isMultiline={true}
            placeholder='Комментарий'
            {...field}
          />}
      />
      <Button onClick={handleSubmit(submitHandler)}>Сохранить</Button>
    </TitledContainer>
  );
}