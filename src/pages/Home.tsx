import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
    width: 1200px;
    margin: 0 auto;
`;

const Form = styled.form`
    width: 50%;
    margin: 80px auto;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid #444;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    margin: 10px 0;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    padding: 0.4rem 2rem;
    border: none;
    background: #222;
    box-shadow: 3px 3px 4px #bababa;
    color: #fff;
    font-weight: 700;
    border-radius: 20px;
    &:hover {
        background: #444;
        box-shadow: none;
    }
    &:active {
        background: #444;
        box-shadow: none;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const Cover = styled.div`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
`;

const Card = styled.div`
    width: 200px;
    height: 200px;
    box-shadow: 4px 4px 8px #afafaf;
    border-radius: 50%;
    background: #eee;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    color: #fff;
    text-shadow: 3px 3px 5px #222;
    margin: 20px;
    cursor: pointer;
    img {
        width: 100%;
        height: auto;
        border-radius: 50%;
    }
    p{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    &:hover {
        box-shadow: none;
    }
    &:hover ${Cover} {
        display: block;
    }
`;

function Home() {

    interface MealType {
        idMeal: number,
        strMeal: string,
        strMealThumb: string
    }

    const navigate = useNavigate();
    const location = useLocation();

    const [word, setWord] = useState('');
    const [result, setResult] = useState<MealType[]>([]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target : {value} } = e;
        setWord(value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(word);
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
        .then(res => {
            // console.log(res.data.meals);
            setResult(res.data.meals);
        }).catch(err => console.log(err));
        setWord('');
    }

    const onClick = (idMeal: number) => {
        navigate(`${location.pathname}/${idMeal}`);
    }

    return ( 
        <Container>
            <Form onSubmit={onSubmit}>
                <Input type='text' placeholder='Search meal by name...' maxLength={40} value={word} onChange={onChange} />
                <ButtonWrapper>
                    <Button>Search</Button>
                </ButtonWrapper>
            </Form>
            <Wrapper>
                {
                    result && 
                    result.map(item => (
                        <Card key={item.idMeal} onClick={() => onClick(item.idMeal)}>
                            <img src={`${item.strMealThumb}`} alt={`${item.strMeal}`} />
                            <Cover />
                            <p>{item.strMeal}</p>
                        </Card>
                    ))
                }
            </Wrapper>
        </Container>
     );
}

export default Home;
