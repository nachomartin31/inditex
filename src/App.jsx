import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Header from './components/Header';

function App() {
  return (
    <Fragment className="App">
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </BrowserRouter>
      </main>
    </Fragment>
  );
}

export default App;
