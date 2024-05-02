import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMeThunk } from '../feature/user/user-slice';

function ProfilePage() {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMeThunk())
  }, [])

  return (
    <Container>
      {/* Profile */}
      <Title>Name: {user.fullName}</Title>
      <Title>Email: {user.email}</Title>
    </Container>
  );
}

export default ProfilePage;

const Container = styled.div`
  
`;
const Title = styled.div`
  font-size: var(--middleText-size);
  font-weight: var(--middleText-weight);
`;