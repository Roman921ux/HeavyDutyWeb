import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { setTime, upDateEventDate } from '../../feature/exercise/exercise-slice';
import timeGridPlugin from '@fullcalendar/timegrid';

function Calendar() {
  const { events, date } = useSelector(state => state.exercises);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: null,
    end: null
  });
  // const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (arg) => {
    // При клике на дату сохраняем выбранную дату
    dispatch(setTime(new Date(new Date(arg.date).getTime() - (new Date(arg.date).getTimezoneOffset() * 60000)).toISOString()))
    // setSelectedDate(new Date(arg.date));

    // console.log('selectedDate in Calendar', selectedDate.toISOString())
    setNewEvent({
      title: '',
      description: '',
      start: arg.date,
      end: arg.date
    });
    // setShowModal(true);
  };

  const eventContent = (arg) => {
    return (
      <Block>
        <Title>{arg.event.title}</Title>
      </Block>
    );
  };

  const handleEventDrop = (arg) => {
    // Обработчик события перемещения события
    console.log('Event dropped:', arg.event.title, 'New start date:', arg.event.start, 'id:', arg.event.id);
    dispatch(upDateEventDate({
      newStartDate: new Date(new Date(arg.event.start).getTime() - (new Date(arg.event.start).getTimezoneOffset() * 60000)).toISOString(),
      eventId: arg.event.id
    }))
    // dispatch(upDateEventDate({ eventId: arg.event.id, newStartDate: arg.event.start }))
    // Здесь вы можете добавить логику для обновления события в базе данных или хранилище состояния
  };


  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={eventContent}
        dateClick={handleDateClick} // Обработчик клика по дате
        editable={true} // Позволяет перемещать события мышью
        eventDrop={handleEventDrop} // Обработчик события перемещения события
        // contentHeight="600px" // Установка высоты контента в автоматический режим
        aspectRatio={1.5} // Установка соотношения сторон календаря
        dayMaxEventRows={true} // Разрешить многорядность событий в одном дне
        headerToolbar={{
          left: 'prev,next today', // кнопки "предыдущий", "следующий", "сегодня"
          center: 'title', // заголовок календаря
          right: 'dayGridMonth' // кнопки переключения видов: месяц, неделя, день
        }}
      // headerToolbar={{
      //   left: <SmallButton>{'prev'}</SmallButton>, // Пример кнопки с использованием SmallButton
      //   center: 'title',
      //   right: <SmallButton>{'next'}</SmallButton> // Пример кнопки с использованием SmallButton
      // }}
      />
    </Container>
  );
}

export default Calendar;




const Container = styled.div`
  width: 80%;
`;
const SmallButton = styled.button`
  font-size: 12px;
  padding: 4px 8px; /* Измените значения padding, чтобы уменьшить размер кнопки */
`;
const Block = styled.div`
/* border: 1px solid red; */
  width: 100%;
  padding: 2px 5px;
  overflow: hidden;
  background-color: #ecebff;
  border-radius: 5px;
`;
const Title = styled.div`
/* border: 1px solid red; */
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
  padding-left: 5px
`;
