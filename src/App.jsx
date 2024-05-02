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
import RequireAuth from './pages/auth/RequireAuth'

function App() {

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          } />
          <Route path="/exercises" element={
            <RequireAuth>
              <ExercisesPage />
            </RequireAuth>
          } />
          <Route path="/profile" element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
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
  /* border: 1px solid red; */
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`