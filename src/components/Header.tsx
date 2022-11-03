import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { logout } from 'src/store/slices/authSlice';
import styled from 'styled-components';
import LoginModal from './LoginModal';
import { googleLogout } from '@react-oauth/google';

const HeaderContainer = styled.header`
    width: 100%;
`;

const Nav = styled.nav`
    width: 1200px;
    margin: 0 auto;
    position: relative;
    ul {
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
`;

const Logo = styled.h1`
    text-align: center;
    margin: 10px 0;
    img {
        max-width: 80px;
        height: auto;
    }
`;

const LocalNav = styled.div`
    position: absolute;
    top: 10px;
    right: 6px;
`;

const Button = styled.button`
    font-size: 14px;
    color: #888;
    background: #fff;
    padding: 4px;
    border: none;
    cursor: pointer;
    margin: 0 4px;
`;

function Header() {

    const [open, setOpen] = useState(false);

    const auth = useSelector((state: RootState) => state.auth);
    const dispath = useDispatch();

    const navigate = useNavigate();

    return ( 
        <HeaderContainer>
            { open === true && <LoginModal open={open} setOpen={setOpen} /> }
            <Nav>
                <Logo>
                    <Link to='/'>
                        <img src='https://cdn-icons-png.flaticon.com/512/4252/4252423.png' alt='Good Meal' />
                    </Link>
                </Logo>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/meals'>Meals</Link></li>
                    <li><Link to='/recipe'>Recipe of the Day</Link></li>
                </ul>
                {
                    auth.credential === ''
                    ? <LocalNav>
                        <Button onClick={() => setOpen(true)}>Login</Button>
                    </LocalNav>
                    : <LocalNav>
                        <Button onClick={() => { 
                            dispath(logout()); 
                            googleLogout();
                            navigate('/');
                        }}>Logout</Button>
                        <Button onClick={() => navigate('/mypage')}>MyPage</Button>
                    </LocalNav>
                }
            </Nav>
        </HeaderContainer>
     );
}

export default Header;