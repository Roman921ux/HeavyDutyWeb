import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { resetTest } from './feature/user/user-slice'

function App() {
  const { test } = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <Container>
      Hi for Project
      <h1>{test}</h1>
      <button onClick={() => dispatch(resetTest())}>ResetTest</button>
    </Container>
  )
}

export default App

const Container = styled.div`
`