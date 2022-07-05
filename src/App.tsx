import Header from 'components/Header';
import Lists from 'pages/Lists';
import Home from 'pages/Home';
import Meals from 'pages/Meals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './style/global-style';
import Recipe from 'pages/Recipe';

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
                <Route path='/meals/:id/:idMeal' element={<Recipe />} />
                <Route path='/recipe' element={<Recipe />} />
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
