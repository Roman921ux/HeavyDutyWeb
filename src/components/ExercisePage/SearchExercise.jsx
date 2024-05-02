import styled from 'styled-components';
// import ExercisesItemSearch from './ExercisesItemSearch';
import ExerciseItem from './SearchExercise/ExerciseItem'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { selectVisibleExercises, toggleCategory } from '../../feature/exercise/exercise-slice';

function SearchExercise() {
  const { date, categoryExercise, categotyBtn } = useSelector(state => state.exercises);
  const dispatch = useDispatch()
  const [value, setValue] = useState('')

  const filterExercises = useSelector(state => selectVisibleExercises(state.exercises, state.exercises.categoryExercise, value));


  return (
    <Container>
      <Title>Выбрано: {categoryExercise}</Title>
      <Search placeholder='Найди свое упражнение' value={value} onChange={(e) => setValue(e.target.value)} />
      <BlockBtn>
        {categotyBtn.map(item => <Btn key={item.category} onClick={() => { dispatch(toggleCategory(item.category)) }}>{item.title}</Btn>)}
      </BlockBtn>
      <AllExersise>
        {filterExercises.map(exercise => <ExerciseItem key={exercise._id} exercise={exercise} date={date} />)}
      </AllExersise>
    </Container>
  );
}

export default SearchExercise;

const Container = styled.div`
  width: 50%;
  max-height: 80vh;
  /* border: 1px solid red; */

  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Search = styled.input`
  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);
  color: rgb(111, 112, 114);
  width: 93%;
  padding: 10px 15px;
  border-radius: 5px;
`;
const AllExersise = styled.div`
  padding: 15px 15px 15px 30px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 370px;
  /* border-bottom: 2px solid var(--dim2-color);  */
`;

const BlockBtn = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  padding: 5px 10px;
  /* background-color: #e5e6e9; */
  /* border: 1px solid red; */
`
const Btn = styled.button`
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
`
const Title = styled.span`
  font-size: var(--middleText-size);
  font-weight: var(--middleText-weight);
`