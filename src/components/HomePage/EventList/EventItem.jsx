import styled from 'styled-components';
import { useState } from 'react';
// import ApproachesItem from './Exercises/ApproachesItem';
import SetItem from './SetItem';
import { useDispatch } from 'react-redux';
import { getEventsThunk, removeEventThunk } from '../../../feature/exercise/exercise-slice';

function EventItem({ event, setModal }) {
  const dispatch = useDispatch()

  const removeEvent = () => {
    const userConfirmed = window.confirm("Точно удаляем?");

    if (userConfirmed) {
      // Пользователь согласился
      dispatch(removeEventThunk(event._id))
        .unwrap()
        .then(() => {
          dispatch(getEventsThunk())
        })
        .catch((error) => {
          // toast('Error')
          alert('Не получилось удалить')
        })
    } else {
      // Пользователь отменил действие
      // alert("Действие отменено.");
    }

  }

  return (
    <Container>
      <TopBlock>
        <Block>
          {/* <Img /> */}
          <Title fs={15}>{event.title}</Title>
        </Block>
        <Block>
          {/* <PlusCircleOutlined style={{ fontSize: '20px' }} onClick={() => setModal(event)} /> */}
          <Title onClick={() => setModal(event, 'add')}>🎲</Title>
          <Title onClick={() => removeEvent()}>Удалить</Title>
        </Block>
      </TopBlock>

      {event.approaches && (
        <BlockApproach>
          {event.approaches.map(item => <SetItem key={item._id} item={item} event={event} setModal={setModal} />)}
        </BlockApproach>
      )}
    </Container>
  );
}

export default EventItem;

const Container = styled.div`
  border: 1.5px solid rgba(117, 125, 197, 0.3);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;
const TopBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BottomBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const Img = styled.div`
  border: 2px solid rgba(1,1,1, 0.4);
  border-radius: 15px;  
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const Title = styled.div`
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
  cursor: pointer;
`;
const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BlockApproach = styled.div`
  width: 100%;
  margin-top: 15px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  gap: 5px;
`;