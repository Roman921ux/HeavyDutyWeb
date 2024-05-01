import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
// pages
import HomePage from './pages/HomePage'
import ExercisesPage from './pages/ExercisesPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={
            <HomePage />
          } />
          <Route path="/exercises" element={
            <ExercisesPage />
          } />
          <Route path="/profile" element={
            <ProfilePage />
          } />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App

const Container = styled.div`
`