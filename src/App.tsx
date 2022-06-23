import Header from 'components/Header';
import Lists from 'pages/Lists';
import Home from 'pages/Home';
import Meals from 'pages/Meals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './style/global-style';

function App() {
  return (
      <>
        <GlobalStyle />
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/meals' element={<Meals />} />
                <Route path='/meals/:id' element={<Lists />} />
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
