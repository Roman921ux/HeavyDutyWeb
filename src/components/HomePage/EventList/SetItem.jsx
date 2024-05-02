import styled from 'styled-components';
import { ToggleApproaches, ToggleEvent, toglleModalToggle } from '../../../feature/exercise/exercise-slice';
import { useDispatch, useSelector } from 'react-redux';
import SetForm from './SetForm';
import { useState } from 'react';


function SetItem({ item, event, setModal }) {
  const { modalToggle } = useSelector(state => state.exercises);
  const [valuesInput, setValuesInput] = useState({
    kg: 0,
    repeat: 0
  })
  const dispatch = useDispatch()
  const ToggleApproachesF = () => {
    dispatch(toglleModalToggle(item._id))
    setModal(event, 'toggle')
  }
  const addApproachEvent = (e) => {
    if (!valuesInput.repeat || !valuesInput.repeat) {
      e.preventDefault();
      alert('Заполните строки!')
      return
    }
    e.preventDefault();
    setModal(prev => !prev)
    console.log('event', event)
    dispatch(ToggleApproaches({ event, valuesInput }))
    setValuesInput({
      kg: 0,
      repeat: 0
    })
  }
  return (
    <Container onClick={ToggleApproachesF}>
      <Title>Кг: <Text>{item.kg}</Text></Title>
      <Title>Повт: <Text>{item.repeat}</Text></Title>
    </Container>
  );
}

export default SetItem;

const Container = styled.div`
  border: 1.5px solid rgb(117, 125, 197, 0.3);
  padding: 5px;
  border-radius: 5px;
  //
  /* display: flex;
  align-items: center; */
`;
const Title = styled.div`
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
  display: flex;
  align-items: flex-end;
  gap: 5px;
`
const Text = styled.div`
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
  display: flex;
  align-items: flex-end;
  gap: 5px;
`