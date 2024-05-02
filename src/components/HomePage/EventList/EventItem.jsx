import styled from 'styled-components';
import { useState } from 'react';
import SetItem from './SetItem';
// icons
import { DeleteOutlined, PlusSquareOutlined, RadarChartOutlined, FireOutlined } from '@ant-design/icons';
// redux
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
          <BottomBlock>
            <Title onClick={() => setModal(event, 'add')}><FireOutlined style={{ "color": "rgb(111, 112, 114)" }} /></Title>
          </BottomBlock>
          <BottomBlock>
            <Title onClick={() => removeEvent()}><DeleteOutlined style={{ "color": "rgb(111, 112, 114)" }} /></Title>
          </BottomBlock>
          {/* <BottomBlock>
            <Title onClick={() => setModal(event, 'add')}><RadarChartOutlined style={{ "color": "rgb(111, 112, 114)" }} /></Title>
          </BottomBlock> */}

          {/* <Title onClick={() => setModal(event, 'add')}><Button>+</Button></Title>
          <Title onClick={() => removeEvent()}><Button>удалть</Button></Title> */}
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
  border: var(--border-color);
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  /* transition: all 300ms ease-in-out; */
  /* &:hover {
    transform: scale(1.01);
  } */
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
  gap: 10px;
  padding: 1px 8px;
  border-radius: 5px;
  border: 1px solid rgb(111, 112, 114, 0.2);
`;
const Img = styled.div`
  border: 2px solid rgba(1,1,1, 0.4);
  border-radius: 15px;  
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const Title = styled.div`
  font-size: var(--middleText-size);
  font-weight: var(--middleText-weight);
  cursor: pointer;
`;
const Button = styled.button`
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
  cursor: pointer;
  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);
  color: rgb(111, 112, 114);
`;
const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BlockApproach = styled.div`
  width: 100%;
  margin-top: 15px;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  gap: 5px;
`;