import { useSelector } from 'react-redux';
import styled from 'styled-components';


function InfoExercise() {
  const { exerciseInfo, date } = useSelector(state => state.exercises);
  // style="aspect-ratio: 1.76991 / 1; width: 100%; height: 100%;"
  return (
    <Container>
      <Title>{exerciseInfo.title}</Title>
      <Text>{exerciseInfo.description}</Text>
      {/* <iframe
        width="560" height="315" src={exerciseInfo.urlVideo}
        title="YouTube video player"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
    </Container>
  );
}

export default InfoExercise;

const Container = styled.div`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Text = styled.span`
  font-size: var(--middleText-size);
  font-weight: var(--middleText-weight);
`
export const Title = styled.span`
  font-size: var(--largeText-size);;
  font-weight: var(--largeText-weight);;
`
