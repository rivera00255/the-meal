import axios from 'axios';
import React, { useState } from 'react';
import MealCard from 'src/components/MealCard';
import styled from 'styled-components';
import { MealType } from './Recipe';

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

function Home() {

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

    return ( 
        <Container>
            <Form onSubmit={onSubmit}>
                <Input type='text' placeholder='Search meal by name...' maxLength={40} value={word} onChange={onChange} />
                <ButtonWrapper>
                    <Button>Search</Button>
                </ButtonWrapper>
            </Form>
            <Wrapper>
                { result?.map((item: MealType) => <MealCard key={item.idMeal} meal={item} />) }
            </Wrapper>
        </Container>
     );
}

export default Home;
