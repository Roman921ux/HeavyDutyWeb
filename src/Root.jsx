import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom'
// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './feature/store.js'
import App from './App.jsx';

function Root() {
  return (
    <Container>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </Container>
  );
}

export default Root;

const Container = styled.div`
  
`;