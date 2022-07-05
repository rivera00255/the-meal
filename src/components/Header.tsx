import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    width: 100%;
`;

const Nav = styled.nav`
    width: 1200px;
    margin: 0 auto;
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

function Header() {
    return ( 
        <HeaderContainer>
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
            </Nav>
        </HeaderContainer>
     );
}

export default Header;