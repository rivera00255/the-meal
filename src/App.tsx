import Header from './components/Header';
import Lists from './pages/Lists';
import Home from './pages/Home';
import Meals from './pages/Meals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './style/global-style';
import Recipe from './pages/Recipe';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MyPage from './pages/MyPage';

function App() {
  return (
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
        <GlobalStyle />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/meals' element={<Meals />} />
                <Route path='/meals/:id' element={<Lists />} />
                <Route path='/meals/:id/:idMeal' element={<Recipe />} />
                <Route path='/recipe' element={<Recipe />} />
                <Route path='/mypage' element={<MyPage />} />
            </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
  );
}

export default App;
