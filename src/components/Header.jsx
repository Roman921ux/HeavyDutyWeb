import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <Container>
      Header
      <NavLink to='/exercises'>exercises</NavLink>
      <NavLink to='/profile'>profile</NavLink>
      <NavLink to='/login'>login</NavLink>
      <NavLink to='/register'>register</NavLink>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  gap: 15px;
`;