import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  return (
    <Container>
      Main
      <Outlet />
    </Container>
  );
}

export default Main;

const Container = styled.div`
  
`;