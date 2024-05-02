import styled from 'styled-components';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
// import { loginThunk } from '../feature/user/user-clise';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginThunk } from '../../feature/user/user-slice';


function LoginPage() {
  const { token } = useSelector(state => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(loginThunk(data))
      .unwrap()
      .then(() => {
        // toast('')
        alert('Вы авторизовались')
        navigate('/')
      })
      .catch((error) => {
        // toast('Error')
        alert('Ошибка при авторизации')
      })
    console.log("Form data:", data)
  };
  return (
    <Container>
      LoginPage
      <span>Token: {token ? 'true' : 'false'}</span>
      <From onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
        {errors.email && <span>Введите корректный email</span>}
        <Input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" />
        {errors.password && <span>Пароль должен содержать не менее 6 символов</span>}
        <Submit type="submit">Отправить</Submit>
      </From>
      <NavLink to='/register' style={{ color: 'inherit' }}><span>Еще не зарегистрированы?</span></NavLink>
    </Container>
  );
}

export default LoginPage;

const Container = styled.div``;

export const Input = styled.input`
  background-color: rgba(1,1,1, 0.05);
  padding: 5px 15px;
  width: 200px;
  color: rgba(1,1,1, 0.8);
  height: 20px;
  border: none;
  border-radius: 5px;
  &:active {
    background-color: rgba(1,1,1, 0.1);
  }
`;
export const Submit = styled.button`
  background-color: rgba(1,1,1, 0.1);
  border-radius: 5px;
  width: min-content;
  color: rgb(111, 112, 114);
  margin-top: 5px;
`;
export const From = styled.form`
  margin: 15px 0 10px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* align-items: center; */
  /* border: 1px solid red; */
`;