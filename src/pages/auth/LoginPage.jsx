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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
        {errors.email && <span>Введите корректный email</span>}
        <input {...register("password", { required: true, minLength: 6 })} type="password" placeholder="Password" />
        {errors.password && <span>Пароль должен содержать не менее 6 символов</span>}
        <input type="submit" />
      </form>
      <NavLink to='/register' style={{ color: 'inherit' }}><span>Еще не зарегистрированы?</span></NavLink>
    </Container>
  );
}

export default LoginPage;

const Container = styled.div`
  
`;