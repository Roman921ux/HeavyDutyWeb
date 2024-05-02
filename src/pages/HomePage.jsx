import styled from 'styled-components';
import Calendar from '../components/HomePage/Calendar';
import EventList from '../components/HomePage/EventList';
// redux
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEventsThunk } from '../feature/exercise/exercise-slice'

function HomePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEventsThunk())
  }, [])
  return (
    <Container>
      <Calendar />
      <EventList />
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;