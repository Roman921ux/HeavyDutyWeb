import { Link } from 'react-router-dom';
import styled from 'styled-components';

function EventAddItem() {
  return (
    <Link to='/exercises'>
      <Container>
        <Title>Add</Title>
      </Container>
    </Link>
  );
}

export default EventAddItem;

const Container = styled.div`
  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);

  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;
const Title = styled.div`
  font-size: 21px;
  font-weight: 600;
  color: rgb(111, 112, 114);
`;