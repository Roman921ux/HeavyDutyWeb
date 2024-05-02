import { useDispatch, useSelector } from 'react-redux';
import { resetToken } from '../feature/user/user-slice'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  const { token } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Container>
      <NavLink to='/' style={{ color: 'inherit' }}><Logo>Heavy Duty</Logo></NavLink>
      <div>
        {token ?
          (<NavBlock>
            <NavLink to='/profile' style={{ color: 'inherit' }}><Nav>Профиль</Nav></NavLink>
            <NavLink to='/exercises' style={{ color: 'inherit' }}><Nav>Упражнения</Nav></NavLink>
            <Button onClick={() => dispatch(resetToken())}>Выйти</Button>
          </NavBlock>)
          :
          (<NavBlock>
            <NavLink to='/login' style={{ color: 'inherit' }}><Nav>login</Nav></NavLink>
            <NavLink to='/register' style={{ color: 'inherit' }}><Nav>Register</Nav></NavLink>
          </NavBlock>)
        }
      </div>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;
  border-radius: 10px;
  //
  box-shadow: var(--box-shadow);
  border: var(--border-color);
  border-radius: 5px;
  margin-bottom: 20px;
  // gradient
  background: rgb(67,151,241);
  background: radial-gradient(circle, rgba(67,151,241,0.2644870448179272) 0%, rgba(188,139,231,0.16644782913165268) 53%);
`;
const Logo = styled.span`
  font-family: "Bebas Neue", sans-serif;
  font-style: normal;
  font-size: var(--largeText-size);
  font-weight: var(--largeText-weight);
  letter-spacing: 5px;
  cursor: pointer;
`
const Nav = styled.span`
  font-size: var(--middleText-size);
  font-weight: var(--middleText-weight);
  cursor: pointer;
`
const NavBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const Button = styled.button`
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
`

