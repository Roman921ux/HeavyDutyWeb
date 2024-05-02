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
  width: 100%;
`;
const Title = styled.button`
  width: 100%;
  font-size: var(--middleText-size);
  font-weight: var(--middleText-weight);
  font-weight: 600;
  color: rgb(111, 112, 114);
  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);

  border-radius: 5px;
  padding: 15px;
`;