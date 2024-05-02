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
            <button onClick={() => dispatch(resetToken())}>Выйти</button>
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

// const Container = styled.div`
//   display: flex;
//   gap: 15px;
// `;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  /* border: 2px solid rgba(145, 171, 219, 0.4); */
  border-radius: 5px;
  height: 50px;
  margin-bottom: 20px;
`;
const Logo = styled.span`
  font-family: "Bebas Neue", sans-serif;
  font-style: normal;
  font-size: var(--largeText-size);
  letter-spacing: 10px;
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
  gap: 15px;
`

