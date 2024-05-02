import styled from 'styled-components';
import { useForm } from "react-hook-form"
// rtk
import { useDispatch } from 'react-redux';
import { regidterThunk } from '../../feature/user/user-slice'
import { useNavigate } from 'react-router-dom';
import { From, Input, Submit } from './LoginPage';

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(regidterThunk(data))
      .unwrap()
      .then(() => {
        // toast('')
        alert('Вы зарегистрированы')
        navigate('/login')
      })
      .catch((error) => {
        // toast('Error')
        alert('Ошибка при регистрации')
      })
    console.log("Form data:", data)
  };

  return (
    <Container>
      <From onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
        {errors.email && <span>Введите корректный email</span>}

        <Input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" />
        {errors.password && <span>Пароль должен содержать не менее 6 символов</span>}

        <Input {...register("fullName", { required: true })} placeholder="Full Name" />
        {errors.fullName && <span>Поле обязательно для заполнения</span>}

        <Submit type="submit">Отправить</Submit>
      </From>
    </Container>
  );
}

export default RegisterPage;

const Container = styled.div`
  
`;