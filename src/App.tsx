import Header from 'components/Header';
import Lists from 'pages/Lists';
import Home from 'pages/Home';
import Meals from 'pages/Meals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './style/global-style';
import Detail from 'pages/Detail';

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
                <Route path='/meals/:id/:idMeal' element={<Detail />} />
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
