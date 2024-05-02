import styled from 'styled-components';
// import ExercisesItem from './ExercisesItem'
import EventItem from './EventList/EventItem';
// import ExercisesAddItem from './ExercisesAddItem'
import EventAddItem from './EventList/EventAddItem'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToggleApproaches, ToggleEvent, addEventSetThunk, setTime, toggleEventSetThunk, toglleModalAdd, toglleModalToggle } from '../../feature/exercise/exercise-slice';
// import FormApproach from './Exercises/FormApproach';
import SetForm from './EventList/SetForm';

function Exercises() {
  const { events, date, modalToggle, modalAdd, approachesId } = useSelector(state => state.exercises);
  const dispatch = useDispatch()
  // const [modal, setModal] = useState(false)
  const [valuesInput, setValuesInput] = useState({
    kg: 0,
    repeat: 0
  })
  // нужен чтобы достаь id 
  const [event, setEvent] = useState({})

  // Получаем текущую дату
  useEffect(() => {
    dispatch(setTime(new Date().toISOString()))
  }, [])
  const currentDateString = date.slice(0, 10);
  const eventsToday = events.filter(event => event.start.slice(0, 10) === currentDateString);

  const toggleModal = (event, modal) => {
    if (modal === 'add') {
      dispatch(toglleModalAdd())
      setEvent(event)
    } else if (modal === 'toggle') {
      setEvent(event)
    }
    // setModal(prev => !prev)

  }

  const addApproachEvent = (e) => {
    if (!valuesInput.repeat || !valuesInput.repeat) {
      e.preventDefault();
      alert('Заполните строки!')
      return
    }
    e.preventDefault();
    if (modalAdd) {
      dispatch(addEventSetThunk({ event, valuesInput }))
      setValuesInput({
        kg: 0,
        repeat: 0
      })
      dispatch(toglleModalAdd())
    } else if (modalToggle) {
      // console.log('Event', event, 'ValueInput', valuesInput)
      dispatch(toggleEventSetThunk({ event, valuesInput, approachesId }))
      setValuesInput({
        kg: 0,
        repeat: 0
      })
      dispatch(toglleModalToggle())
    }
  }

  return (
    <Container>
      {modalAdd || modalToggle ? (<SetForm onSubmit={addApproachEvent} forInput={{ setValuesInput, valuesInput }} event={event} approachesId={approachesId} />)
        :
        (<>
          <Title>Date: {date.substring(0, 10)}</Title>
          {eventsToday.map(event => <EventItem key={event._id} event={event} setModal={toggleModal} />)}
          <EventAddItem />
        </>)
      }
    </Container>
  );
}

export default Exercises;

const Container = styled.div`
  /* border: 1px solid red; */
  width: 49%;
  /* overflow-y: scroll; */
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* padding-right: 1%; */
`;


const Title = styled.div`
  font-size: var(--largeText-size);
  font-weight: var(--smallText-weight);
  /* color: var(--dim1-color) */
`;