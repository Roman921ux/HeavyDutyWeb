import styled from 'styled-components';
import { removeEventSetThunk, toglleModalAdd, toglleModalToggle } from '../../../feature/exercise/exercise-slice';
import { useDispatch, useSelector } from 'react-redux';

function SetForm({ onSubmit, forInput, event, approachesId }) {
  const dispatch = useDispatch();
  const { modalAdd, modalToggle } = useSelector(state => state.exercises)

  const redirect = () => {
    if (modalAdd) {
      dispatch(toglleModalAdd())
    } else if (modalToggle) {
      dispatch(toglleModalToggle())
    }

  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    forInput.setValuesInput(prevEvent => ({
      ...prevEvent,
      [name]: value
    }));
  }
  const removeEventSet = () => {
    dispatch(removeEventSetThunk({ event, approachesId }))
      .unwrap()
      .then(() => {
        // toast('')
        alert('Вы удалили подход')
        dispatch(toglleModalToggle())
      })
      .catch((error) => {
        // toast('Error')
        alert('Ошибка при удалении')
      })
  }
  return (
    <Container>
      <Title onClick={() => redirect()}>Назад</Title>
      <Title>{event.title}</Title>
      <Form onSubmit={onSubmit}>
        <Label>
          <Title>Кг:</Title>
          <Input type="number" name="kg"
            value={forInput.approach} onChange={handleInputChange} />
        </Label>
        <Label>
          <Title>Повт:</Title>
          <Input type="number" name="repeat"
            value={forInput.repeat} onChange={handleInputChange} />
        </Label>
        <button type="submit">Готово</button>
      </Form>
      {modalToggle && <Title onClick={() => removeEventSet()}>Удалить повторение</Title>}
    </Container>
  );
}

export default SetForm;

const Container = styled.div`
  border: 3px solid rgba(1,1,1, 0.3);
  border-radius: 15px;
  padding: 20px;
  height: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const Title = styled.label`
  font-size: 26px;
  font-weight: 600;
`;
const Text = styled.label`
  
`;
const Input = styled.input`
  background-color: rgba(1,1,1, 0.1);
  color: rgba(1,1,1, 0.8);
  width: 20%;
  height: 40px;
  border: none;
  border-radius: 5px;
`;