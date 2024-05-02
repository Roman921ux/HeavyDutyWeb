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
      <div style={{ "display": 'flex', "gap": '5px' }}>
        <Button onClick={() => redirect()}>Назад</Button>
        {modalToggle && <Button onClick={() => removeEventSet()}>Удалить</Button>}
      </div>
      <Title>{event.title}</Title>
      <Form onSubmit={onSubmit}>
        <Label>
          <Text>Кг:</Text>
          <Input type="number" name="kg"
            value={forInput.approach} onChange={handleInputChange} />
        </Label>
        <Label>
          <Text>Пвт:</Text>
          <Input type="number" name="repeat"
            value={forInput.repeat} onChange={handleInputChange} />
        </Label>
        <Submit type="submit">Готово</Submit>
      </Form>

    </Container>
  );
}

export default SetForm;

const Container = styled.div`
  border: var(--border-color);
  box-shadow: var(--box-shadow);
  border-radius: 15px;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* gap: 15px; */
  margin-left: 15px;
  width: 40%;
  /* border: 1px solid red; */
`;
const Title = styled.span`
  font-size: var(--largeText-size);
  font-weight: var(--largeText-weight);
`;
const Text = styled.span`
  font-size: var(--middleText-size);
  font-weight: var(--middleText-weight);
`;
const Button = styled.button`
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
  width: min-content;
  cursor: pointer;
  margin-bottom: 15px;
  background: #fff;
  color: #000;
  border: var(--border-color);
`;
const Submit = styled.button`
  margin-top: 20px;
  font-size: var(--smallText-size);
  font-weight: var(--smallText-weight);
  /* width: min-content; */
`;
const Input = styled.input`
  background-color: rgba(1,1,1, 0.1);
  color: rgba(1,1,1, 0.8);
  width: 100px;
  height: 20px;
  border: none;
  border-radius: 5px;
`;