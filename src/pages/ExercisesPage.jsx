import styled from 'styled-components';
// import SearchExercises from '../components/ExercisesPage/SearchExercises';
import SearchExercise from '../components/ExercisePage/SearchExercise'
import InfoExercise from '../components/ExercisePage/InfoExercise'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getExercisesThunk } from '../feature/exercise/exercise-slice';

function ExercisesPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExercisesThunk())
  }, [])
  return (
    <Container>
      <SearchExercise />
      <InfoExercise />
    </Container>
  );
}

export default ExercisesPage;

const Container = styled.div`
    display: flex;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
`;