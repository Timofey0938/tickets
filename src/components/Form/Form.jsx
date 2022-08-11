// import React from 'react';
// import {useForm, Controller} from 'react-hook-form';
// import Input from "../Input/Input";
//
// export default function Form({ticket}) {
//
//   const {control, handleSubmit} = useForm();
//
//   return (
//     <>
//       <Controller
//         name="title"
//         control={control}
//         defaultValue={ticket.title}
//         rules={{required: true}}
//         render={({field}) =>
//           <Input
//             isMultiline={false}
//             placeholder='Название'
//             style={{marginBottom: 8}}
//             {...field}
//           />}
//       />
//       <Controller
//         name="description"
//         control={control}
//         defaultValue={ticket.description}
//         render={({field}) =>
//           <Input
//             isMultiline={true}
//             placeholder='Описание'
//             style={{marginBottom: 14}}
//             {...field}
//           />}
//       />
//     </>
//   );
// }